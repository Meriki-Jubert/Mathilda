import React from 'react';
import { jungleFruits } from '../../src/data/jungleLore';
import { FiBriefcase, FiZap, FiAward, FiFileText } from 'react-icons/fi';

interface MobileBackpackViewProps {
  completedSkills: string[];
  totalXP: number;
  stamina: number;
}

export const MobileBackpackView: React.FC<MobileBackpackViewProps> = ({
  completedSkills,
  totalXP,
  stamina,
}) => {
  const collectedUnitIds = new Set<string>();
  completedSkills.forEach(s => {
    const m = s.match(/skill-(\d+)\./);
    if (m) collectedUnitIds.add(`unit-${m[1]}`);
  });

  const fruits = Object.values(jungleFruits);
  const harvestedCount = fruits.filter(f => collectedUnitIds.has(f.zoneId)).length;

  return (
    <div className="space-y-4 pb-28 pt-2 font-sans">
      <div className="bg-gradient-to-r from-amber-950 to-slate-900 text-stone-100 p-4 rounded-xl border border-amber-800/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-amber-300 font-bold uppercase block">
            🎒 Mobile Backpack
          </span>
          <h2 className="text-base font-bold text-amber-200">Knowledge Fruits Vault</h2>
        </div>
        <span className="text-2xl">🥭</span>
      </div>

      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
        <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-xs">
          <span className="text-stone-500 text-[10px] block">Stamina Level</span>
          <span className="text-amber-700 font-bold text-base flex items-center gap-1">
            <FiZap size={14} /> {stamina} PTS
          </span>
        </div>
        <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-xs">
          <span className="text-stone-500 text-[10px] block">Harvested Fruits</span>
          <span className="text-emerald-700 font-bold text-base flex items-center gap-1">
            <FiAward size={14} /> {harvestedCount} / {fruits.length}
          </span>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-3.5 space-y-3">
        <h3 className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider flex items-center justify-between border-b pb-1.5">
          <span>Cameroon Jungle Fruit Collection</span>
        </h3>

        <div className="space-y-2">
          {fruits.map(fruit => {
            const isHarvested = collectedUnitIds.has(fruit.zoneId);

            return (
              <div
                key={fruit.id}
                className={`p-3 rounded-lg border transition-all flex items-start gap-3 ${
                  isHarvested
                    ? 'bg-amber-50/90 border-amber-300 text-stone-900'
                    : 'bg-stone-50 border-stone-200 opacity-50 grayscale'
                }`}
              >
                <span className="text-2xl shrink-0">{fruit.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{fruit.name}</span>
                    {isHarvested && (
                      <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-300">
                        +{fruit.staminaBoost} Stamina
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">{fruit.zoneName}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
