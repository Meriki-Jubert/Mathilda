import React from 'react';
import { FiMap, FiCheckSquare, FiBriefcase, FiSettings } from 'react-icons/fi';

export type MobileTab = 'map' | 'practice' | 'vault' | 'sync';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  stamina: number;
  totalXP: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  stamina,
  totalXP,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t border-slate-800 text-slate-200 px-2 py-1.5 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => onSelectTab('map')}
          className={`flex flex-col items-center py-1 px-3 rounded transition-all ${
            activeTab === 'map'
              ? 'text-emerald-400 font-bold bg-slate-900 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FiMap size={18} />
          <span className="text-[10px] font-mono mt-0.5">Syllabus</span>
        </button>

        <button
          onClick={() => onSelectTab('practice')}
          className={`flex flex-col items-center py-1 px-3 rounded transition-all relative ${
            activeTab === 'practice'
              ? 'text-emerald-400 font-bold bg-slate-900 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <FiCheckSquare size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] font-mono mt-0.5">AI Practice</span>
        </button>

        <button
          onClick={() => onSelectTab('vault')}
          className={`flex flex-col items-center py-1 px-3 rounded transition-all ${
            activeTab === 'vault'
              ? 'text-emerald-400 font-bold bg-slate-900 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FiBriefcase size={18} />
          <span className="text-[10px] font-mono mt-0.5">Backpack</span>
        </button>

        <button
          onClick={() => onSelectTab('sync')}
          className={`flex flex-col items-center py-1 px-3 rounded transition-all ${
            activeTab === 'sync'
              ? 'text-emerald-400 font-bold bg-slate-900 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FiSettings size={18} />
          <span className="text-[10px] font-mono mt-0.5">Sync & AI</span>
        </button>
      </div>

      {/* Mobile Top Status Indicator Sub-bar */}
      <div className="max-w-md mx-auto pt-1 flex items-center justify-between px-3 text-[10px] font-mono border-t border-slate-900/60 text-slate-400">
        <span className="text-amber-400 font-bold flex items-center gap-1">
          ⚡ Stamina: {stamina}%
        </span>
        <span className="text-emerald-400 font-bold">
          🏆 {totalXP} XP
        </span>
      </div>
    </div>
  );
};
