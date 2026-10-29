import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';

export const PWAInstallButton: React.FC<{ variant?: 'compact' | 'full' }> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  if (isInstalled) {
    return variant === 'full' ? (
      <div className="flex items-center gap-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 px-3 py-1.5 text-xs font-semibold">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        App Installed & Ready
      </div>
    ) : null;
  }

  return (
    <>
      <button
        onClick={() => {
          if (isInstallable) {
            install();
          } else {
            setShowModal(true);
          }
        }}
        className={`flex items-center gap-2 rounded-xl font-semibold shadow-sm transition-all transform active:scale-95 ${
          variant === 'full'
            ? 'w-full justify-center bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-4 py-3 text-sm'
            : 'bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 text-xs border border-emerald-600'
        }`}
      >
        <Download className="w-4 h-4 animate-bounce" />
        <span>Install Mathilda App</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Install App on Your Device</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm text-slate-700 dark:text-slate-300">
              {isIOS ? (
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white">To install on iPhone or iPad:</p>
                  <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed">
                    <li>Tap the <span className="font-bold text-emerald-700 dark:text-emerald-400">Share</span> icon at the bottom or top of Safari.</li>
                    <li>Scroll down the menu and select <span className="font-bold text-emerald-700 dark:text-emerald-400">"Add to Home Screen"</span>.</li>
                    <li>Confirm by tapping <span className="font-bold text-emerald-700 dark:text-emerald-400">"Add"</span>.</li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white">To install on Android or Chrome/Edge:</p>
                  <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed">
                    <li>Tap your browser menu <span className="font-bold text-emerald-700 dark:text-emerald-400">(⋮ or Share)</span>.</li>
                    <li>Select <span className="font-bold text-emerald-700 dark:text-emerald-400">"Add to Home screen"</span> or <span className="font-bold text-emerald-700 dark:text-emerald-400">"Install App"</span>.</li>
                    <li>Enjoy offline access, full-screen view, and home screen icon!</li>
                  </ol>
                </div>
              )}

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                ✨ <strong>Standalone Native Mode</strong>: Works offline, keeps your progress synced, and launches instantly from your home screen!
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-2 w-full rounded-xl bg-slate-900 dark:bg-slate-100 py-2.5 text-sm font-semibold text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
