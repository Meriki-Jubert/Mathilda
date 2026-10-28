import { useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleMobileFirestoreError, OperationType } from '../services/firebase';

export interface MobileSyncedState {
  completedSkills: string[];
  skillProgress: Record<string, any>;
  currentUnit: string;
  currentSkill: string;
  totalXP: number;
  harvestedFruits: string[];
  stamina: number;
  streakDays: number;
  displayName?: string;
  email?: string;
  aiConfig?: {
    provider: string;
    apiKey: string;
    modelId: string;
    enabled: boolean;
  };
}

const DEFAULT_MOBILE_STATE: MobileSyncedState = {
  completedSkills: [],
  skillProgress: {},
  currentUnit: 'unit-1',
  currentSkill: 'skill-1.1',
  totalXP: 0,
  harvestedFruits: ['cameroon_citrus'],
  stamina: 80,
  streakDays: 1,
};

export function useMobileSync() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [syncedState, setSyncedState] = useState<MobileSyncedState>(DEFAULT_MOBILE_STATE);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Auto sign-in anonymously on mobile launch if not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!user) {
        try {
          await signInAnonymously(auth);
        } catch (err) {
          console.warn('Mobile anonymous auth deferred:', err);
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to live Firestore user document snapshot
  useEffect(() => {
    if (!currentUser) return;

    const userDocRef = doc(db, 'users', currentUser.uid);
    setIsSyncing(true);

    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot) => {
        setIsSyncing(false);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setSyncedState({
            completedSkills: data.completedSkills || [],
            skillProgress: data.skillProgress || {},
            currentUnit: data.currentUnit || 'unit-1',
            currentSkill: data.currentSkill || 'skill-1.1',
            totalXP: data.totalXP || 0,
            harvestedFruits: data.harvestedFruits || ['cameroon_citrus'],
            stamina: typeof data.stamina === 'number' ? data.stamina : 80,
            streakDays: data.streakDays || 1,
            displayName: data.displayName || currentUser.displayName || 'Mobile Explorer',
            email: data.email || currentUser.email || undefined,
            aiConfig: data.aiConfig || undefined,
          });
        }
      },
      (error) => {
        setIsSyncing(false);
        setSyncError('Mobile snapshot error');
        handleMobileFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const saveMobileProgressToCloud = useCallback(
    async (payload: Partial<MobileSyncedState>) => {
      if (!currentUser) return;
      const userDocRef = doc(db, 'users', currentUser.uid);
      try {
        await setDoc(
          userDocRef,
          {
            ...payload,
            userId: currentUser.uid,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        setSyncError(null);
      } catch (err) {
        setSyncError('Mobile sync failed');
        handleMobileFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
      }
    },
    [currentUser]
  );

  const loginWithGoogle = async () => {
    try {
      setSyncError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setSyncError('Google login cancelled or failed.');
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      await signInAnonymously(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return {
    currentUser,
    authLoading,
    syncedState,
    isSyncing,
    syncError,
    saveMobileProgressToCloud,
    loginWithGoogle,
    logout,
  };
}
