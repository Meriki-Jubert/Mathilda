# Implementation Plan - Dedicated Mobile Codebase (/mobile) with Shared Firestore Database

Build a completely separate mobile application inside `/mobile` with a native mobile UI layout (bottom navigation tabs, touch cards, mobile camera integration) while preserving the web app in `/src`. Both applications connect to the exact same live Firestore database (`ai-studio-mathilda-70865838-0d04-4e91-897c-ed47eb9890c1`), ensuring seamless real-time state and AI API configuration synchronization across web and mobile devices.

---

## Architecture & Requirements

### 1. Dedicated Mobile Codebase Directory (`/mobile`)
- Create a standalone mobile application structure inside `/mobile` with its own entry point, components, navigation, and hooks.
- **Mobile-Tailored UI**: Built from the ground up for mobile screens with:
  - **Bottom Navigation Bar**: 4 core tabs (🌴 Syllabus Map, 📝 Practice & AI Snap, 🎒 Backpack & Vault, ⚙️ Cloud Sync & AI Config).
  - **Mobile Touch Cards**: Stacked viewports, native-feeling gestures, and camera button for snapping handwritten math problems.
  - **Compact Mobile Modals**: Drawer-style sheets and full-width mobile popups.

### 2. Shared Firestore & Auth Data Layer
- Re-use the existing Firebase project configuration (`firebase-applet-config.json` and Firestore database `ai-studio-mathilda-70865838-0d04-4e91-897c-ed47eb9890c1`).
- Connect the `/mobile` application directly to Firestore so progress, XP, completed skills, stamina, harvested fruits, and AI API keys sync automatically between the web app and the mobile app.

### 3. Web App Mobile Preview & Switcher
- Keep the web app in `/src` completely unchanged and separate.
- Add an interactive **Mobile App Studio Switcher** toggle/modal in the web header allowing the user to view, test, and interact with the `/mobile` app codebase in an emulator frame or switch directly to mobile code view.

---

## User Review & Verification

### Proposed File Structure
```
/app
├── /src                    <-- Existing Web Codebase (Unchanged)
├── /mobile                 <-- Separate Standalone Mobile App Codebase
│   ├── App.tsx             <-- Mobile Root with Bottom Navigation
│   ├── index.css           <-- Mobile Styling & Touch Layouts
│   ├── /components         <-- Mobile Views (MobileMap, MobilePractice, MobileBackpack, MobileSync)
│   ├── /hooks              <-- Mobile Hooks (useMobileSync, useMobileProgress)
│   └── /services           <-- Mobile Shared Firebase Config
├── firebase-applet-config.json
├── firestore.rules
└── package.json
```

### Verification Plan
1. Compile the applet with `compile_applet` to ensure both web and mobile components compile cleanly.
2. Verify type safety with `npm run typecheck`.
3. Test two-way real-time data sync in the preview to confirm changes made in the mobile app reflect instantly in the web app and Firestore.
