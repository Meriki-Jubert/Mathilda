import React from 'react';
import { FiCloud, FiCheckCircle, FiRefreshCw, FiLogOut, FiUser, FiSmartphone, FiX, FiShield } from 'react-icons/fi';
import { User } from 'firebase/auth';

interface AccountSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  isSyncing: boolean;
  syncError: string | null;
  onLoginWithGoogle: () => Promise<void>;
  onLogout: () => Promise<void>;
  totalXP: number;
  completedSkillsCount: number;
}

export const AccountSyncModal: React.FC<AccountSyncModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  isSyncing,
  syncError,
  onLoginWithGoogle,
  onLogout,
  totalXP,
  completedSkillsCount,
}) => {
  if (!isOpen) return null;

  const isAnonymous = currentUser?.isAnonymous ?? true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="bg-stone-900 border border-slate-700 rounded-lg shadow-2xl max-w-lg w-full overflow-hidden text-slate-100">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-950/80 text-emerald-400 rounded border border-emerald-800/60">
              <FiCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-100">Jungle Expedition Cloud Sync</h3>
              <p className="text-xs text-slate-400 font-mono">Cross-Device Progress & Vault Preservation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Connection Status Banner */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FiSmartphone className="w-5 h-5 text-amber-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Database Status</div>
                <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Real-time Firestore Active</span>
                </div>
              </div>
            </div>

            {isSyncing ? (
              <div className="flex items-center gap-1.5 font-mono text-xs text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60">
                <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Syncing...</span>
              </div>
            ) : (
              <div className="font-mono text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/60">
                Synced
              </div>
            )}
          </div>

          {/* Sync Errors if any */}
          {syncError && (
            <div className="bg-red-950/80 border border-red-800 text-red-200 p-3 rounded text-xs font-mono">
              ⚠️ {syncError}
            </div>
          )}

          {/* Account Details */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Explorer Account</label>
            <div className="bg-stone-950 border border-slate-800 rounded-md p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-bold">
                  {currentUser?.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <FiUser className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-100">
                    {currentUser?.displayName || (isAnonymous ? 'Guest Scholar (Device ID Saved)' : 'Cameroon HND Candidate')}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {currentUser?.email || (currentUser?.uid ? `ID: ${currentUser.uid.slice(0, 14)}...` : 'Not linked')}
                  </div>
                </div>
              </div>

              {isAnonymous ? (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60">
                  Guest Session
                </span>
              ) : (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  Cloud Linked
                </span>
              )}
            </div>
          </div>

          {/* Stats & AI Config Preview */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded">
              <span className="text-slate-400 block mb-0.5">Expedition XP</span>
              <span className="text-amber-400 text-lg font-bold">{totalXP} XP</span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded">
              <span className="text-slate-400 block mb-0.5">Mastered Topics</span>
              <span className="text-emerald-400 text-lg font-bold">{completedSkillsCount} Skills</span>
            </div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded p-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-300">
              <FiCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AI API Keys & Models: Synced to Firestore</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/50">
              Mobile App Ready
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            {isAnonymous ? (
              <div className="space-y-2">
                <button
                  onClick={onLoginWithGoogle}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <FiShield className="w-4 h-4 text-emerald-200" />
                  <span>Link with Google to Sync Anywhere</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center font-mono">
                  Linking with Google ensures you never lose your Knowledge Fruits or Past Paper Vault access across phone, tablet, and laptop.
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <FiShield className="text-emerald-400" />
                  <span>Your study progress is permanently preserved in Firestore.</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs rounded border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <FiLogOut className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSyncModal;
