# Implementation Plan: Firebase Database & Real-Time Cross-Device Sync

Enable persistent cloud storage and real-time cross-device synchronization for **Mathilda: The Jungle of Equations** using **Firebase Firestore** and **Firebase Authentication**.

---

## 1. Firebase Provisioning & Integration Setup

1. **Trigger Firebase Provisioning**:
   - Call `set_up_firebase` with `platform: "web"`, `requestedProducts: ["firestore"]`, and `userConfirmedTermsAcceptedInUI: false` to initiate the Firebase approval prompt in the UI.
   - Upon user acceptance, call `set_up_firebase` with `userConfirmedTermsAcceptedInUI: true`.
2. **Schema & Security Rules**:
   - Create `firebase-blueprint.json` defines schemas for `users/{userId}`:
     - `completedSkills`: string[] (completed module IDs)
     - `skillProgress`: map of skill ID to `{ lessonsCompleted: string[], practiceCompleted: string[] }`
     - `harvestedFruits`: string[] (collected Knowledge Fruit IDs)
     - `stamina`: number (current Expedition Stamina points)
     - `totalXP`: number (accumulated mastery XP)
     - `streakDays`: number
     - `updatedAt`: timestamp
   - Create `firestore.rules` enforcing that users can only read and write their own document (`request.auth.uid == userId`).

---

## 2. Authentication & Account Sync Modal

- **Anonymous Guest Sign-In**: Automatically sign in users as guest explorers on first launch so they can start immediately without friction.
- **Account Sync Modal (`src/components/AccountSyncModal.tsx`)**:
  - Accessible via a new **Cloud Sync ☁️** button in the header bar.
  - Allows guest users to link an Email/Password or Google account to preserve their Knowledge Fruits, Stamina, and progress across multiple phones, laptops, and tablets.
  - Displays connection status (Offline Local vs. Cloud Synced).

---

## 3. Real-Time Synchronization Hook (`useFirebaseSync`)

- Create `src/hooks/useFirebaseSync.ts`:
  - Uses Firestore `onSnapshot` to listen for real-time progress updates across devices.
  - Merges local `localStorage` offline progress seamlessly when signing in.
  - Updates harvested Knowledge Fruits, Stamina, completed lessons, and practice scores immediately in Firestore.

---

## 4. Verification Plan

1. Initiate `set_up_firebase` tool call and prompt user for UI confirmation.
2. After provisioning, test Firebase initialization and Firestore security rules validation.
3. Test guest login, data persistence, and cross-device sync updates.
4. Verify with `compile_applet` to confirm zero build errors.
