import { useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../services/firebase';
import { UserProgress } from './useProgress';
import { AIConfig } from '../services/aiModels';

export interface SyncedState extends UserProgress {
  harvestedFruits: string[];
  stamina: number;
  streakDays: number;
  displayName?: string;
  email?: string;
  aiConfig?: AIConfig;
}

const DEFAULT_SYNC_STATE: SyncedState = {
  completedSkills: [],
  skillProgress: {},
  currentUnit: 'unit-1',
  currentSkill: 'skill-1.1',
  totalXP: 0,
  harvestedFruits: ['cameroon_citrus'],
  stamina: 80,
  streakDays: 1,
};

export function useFirebaseSync() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [syncedState, setSyncedState] = useState<SyncedState>(DEFAULT_SYNC_STATE);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Auto sign-in anonymously if no user is present so syncing works out of the box
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!user) {
        try {
          await signInAnonymously(auth);
        } catch (err) {
          console.warn('Anonymous sign-in deferred:', err);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to Firestore document updates when authenticated
  useEffect(() => {
    if (!currentUser) return;

    const userDocRef = doc(db, 'users', currentUser.uid);
    setIsSyncing(true);

    const unsubscribe = onSnapshot(
      userDocRef,
      async (snapshot) => {
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
            displayName: data.displayName || currentUser.displayName || 'Expedition Math Scholar',
            email: data.email || currentUser.email || undefined,
            aiConfig: data.aiConfig || undefined,
          });
        } else {
          // Initialize document if it doesn't exist
          try {
            const initialDoc = {
              userId: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || (currentUser.isAnonymous ? 'Guest Explorer' : 'Math Scholar'),
              completedSkills: [],
              skillProgress: {},
              currentUnit: 'unit-1',
              currentSkill: 'skill-1.1',
              totalXP: 0,
              harvestedFruits: ['cameroon_citrus'],
              stamina: 80,
              streakDays: 1,
              updatedAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, initialDoc);
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}`);
          }
        }
      },
      (error) => {
        setIsSyncing(false);
        setSyncError('Sync snapshot error');
        handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Save progress changes to Firestore
  const saveProgressToCloud = useCallback(
    async (newState: Partial<SyncedState>) => {
      if (!currentUser) return;
      const userDocRef = doc(db, 'users', currentUser.uid);
      try {
        const payload: Record<string, any> = {
          userId: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || (currentUser.isAnonymous ? 'Guest Explorer' : 'Math Scholar'),
          completedSkills: newState.completedSkills ?? syncedState.completedSkills,
          skillProgress: newState.skillProgress ?? syncedState.skillProgress,
          currentUnit: newState.currentUnit ?? syncedState.currentUnit,
          currentSkill: newState.currentSkill ?? syncedState.currentSkill,
          totalXP: newState.totalXP ?? syncedState.totalXP,
          harvestedFruits: newState.harvestedFruits ?? syncedState.harvestedFruits,
          stamina: newState.stamina ?? syncedState.stamina,
          streakDays: newState.streakDays ?? syncedState.streakDays,
          updatedAt: new Date().toISOString(),
        };

        if (newState.aiConfig) {
          payload.aiConfig = newState.aiConfig;
        }

        await setDoc(userDocRef, payload, { merge: true });
        setSyncError(null);
      } catch (err) {
        setSyncError('Failed to save to cloud');
        handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
      }
    },
    [currentUser, syncedState]
  );

  // Dedicated save method for AI API Configuration
  const saveAIConfigToCloud = useCallback(
    async (aiConfig: AIConfig) => {
      if (!currentUser) return;
      const userDocRef = doc(db, 'users', currentUser.uid);
      try {
        await setDoc(
          userDocRef,
          {
            userId: currentUser.uid,
            aiConfig: {
              provider: aiConfig.provider,
              apiKey: aiConfig.apiKey,
              modelId: aiConfig.modelId,
              enabled: aiConfig.enabled,
            },
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        setSyncError(null);
      } catch (err) {
        setSyncError('Failed to save AI config to cloud');
        handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
      }
    },
    [currentUser]
  );

  const loginWithGoogle = async () => {
    try {
      setSyncError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google Sign-In failed:', err);
      setSyncError('Google Sign-In was cancelled or failed.');
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
    saveProgressToCloud,
    saveAIConfigToCloud,
    loginWithGoogle,
    logout,
  };
}
