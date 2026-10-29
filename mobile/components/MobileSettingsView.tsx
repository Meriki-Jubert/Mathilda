import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { FiCloud, FiCheckCircle, FiRefreshCw, FiUser, FiLogOut, FiKey, FiSave } from 'react-icons/fi';
import { PWAInstallButton } from '../../src/components/PWAInstallButton';

interface MobileSettingsViewProps {
  currentUser: User | null;
  isSyncing: boolean;
  syncError: string | null;
  onLoginWithGoogle: () => Promise<void>;
  onLogout: () => Promise<void>;
  onSaveAIKey: (apiKey: string) => void;
  currentAIKey?: string;
}

export const MobileSettingsView: React.FC<MobileSettingsViewProps> = ({
  currentUser,
  isSyncing,
  syncError,
  onLoginWithGoogle,
  onLogout,
  onSaveAIKey,
  currentAIKey = '',
}) => {
  const [apiKey, setApiKey] = useState(currentAIKey);
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveKey = () => {
    onSaveAIKey(apiKey);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2500);
  };

  const isAnonymous = currentUser?.isAnonymous ?? true;

  return (
    <div className="space-y-4 pb-28 pt-2 font-sans text-stone-900">
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
            ⚙️ Mobile Settings
          </span>
          <h2 className="text-base font-bold">Cloud Sync & AI Key Config</h2>
        </div>
        <FiCloud className="text-emerald-400 text-xl" />
      </div>

      {/* PWA Direct Installation Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-4 rounded-xl shadow-sm border border-emerald-700/60 space-y-2">
        <h3 className="font-bold text-sm flex items-center gap-2">
          📱 Native App Installation
        </h3>
        <p className="text-xs text-emerald-100/90 leading-relaxed">
          Install Mathilda directly to your Android or iOS device home screen for fullscreen native feel and offline access.
        </p>
        <div className="pt-1">
          <PWAInstallButton variant="full" />
        </div>
      </div>

      {/* Database connection banner */}
      <div className="bg-white border border-stone-200 rounded-xl p-3.5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiCloud className="text-amber-800" size={18} />
            <span className="text-xs font-bold font-mono text-stone-900 uppercase">Firestore Database</span>
          </div>
          {isSyncing ? (
            <span className="text-[10px] font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
              <FiRefreshCw className="animate-spin" size={10} /> Syncing...
            </span>
          ) : (
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1 font-bold">
              <FiCheckCircle size={10} /> Connected
            </span>
          )}
        </div>

        {syncError && (
          <div className="text-[11px] font-mono text-red-700 bg-red-50 p-2 rounded border border-red-200">
            ⚠️ {syncError}
          </div>
        )}

        <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
              <FiUser size={14} />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">
                {currentUser?.displayName || (isAnonymous ? 'Mobile Guest Session' : 'Math Scholar')}
              </div>
              <div className="text-[10px] font-mono text-stone-500">
                {currentUser?.email || (currentUser?.uid ? `ID: ${currentUser.uid.slice(0, 10)}...` : 'Device local')}
              </div>
            </div>
          </div>

          {isAnonymous ? (
            <button
              onClick={onLoginWithGoogle}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] rounded font-bold transition-colors"
            >
              Google Link
            </button>
          ) : (
            <button
              onClick={onLogout}
              className="px-2 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 font-mono text-[11px] rounded flex items-center gap-1"
            >
              <FiLogOut size={12} /> Sign Out
            </button>
          )}
        </div>
      </div>

      {/* AI Key Entry */}
      <div className="bg-white border border-stone-200 rounded-xl p-3.5 space-y-3 shadow-xs font-mono text-xs">
        <div className="flex items-center gap-2 pb-2 border-b">
          <FiKey className="text-amber-800" size={16} />
          <span className="font-bold uppercase text-stone-900">Mobile AI Tutor Key</span>
        </div>

        <p className="text-[11px] text-stone-600 font-sans leading-relaxed">
          Saves your HuggingFace or Gemini API key directly to your Firestore profile for mobile vision solving.
        </p>

        <div className="space-y-2">
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="Paste your API key here..."
            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-slate-900"
          />
          <button
            onClick={handleSaveKey}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold uppercase text-[11px] flex items-center justify-center gap-1.5"
          >
            <FiSave size={14} /> Save to Firestore Profile
          </button>
          {keySaved && (
            <div className="text-[10px] text-emerald-800 font-bold text-center">
              ✓ API Key synced to Firestore!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

