import { FiX, FiAward, FiZap, FiFileText, FiCompass } from 'react-icons/fi';
import { jungleFruits } from '../data/jungleLore';

interface BackpackModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedSkills: string[];
  totalXP: number;
  onNavigateToExams: () => void;
}

export default function BackpackModal({
  isOpen,
  onClose,
  completedSkills,
  totalXP,
  onNavigateToExams,
}: BackpackModalProps) {
  if (!isOpen) return null;

  // Determine collected fruits based on completed skills
  // Unit ID mapping: unit-1, unit-2 ... unit-12
  const collectedUnitIds = new Set<string>();
  completedSkills.forEach(skillId => {
    // skill ID format e.g. skill-1.1, skill-8.2
    const match = skillId.match(/skill-(\d+)\./);
    if (match) {
      collectedUnitIds.add(`unit-${match[1]}`);
    }
  });

  const totalFruitsCount = Object.keys(jungleFruits).length;
  const harvestedFruits = Object.values(jungleFruits).filter(fruit => collectedUnitIds.has(fruit.zoneId));

  const totalStamina = harvestedFruits.reduce((sum, f) => sum + f.staminaBoost, 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs font-sans text-stone-900">
      <div className="bg-[#FAF9F6] border-2 border-amber-900/30 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-stone-100 p-4 border-b border-amber-900/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-900/40 border border-amber-500/40 rounded flex items-center justify-center text-xl shrink-0">
              🎒
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-amber-200 uppercase font-mono flex items-center gap-2">
                Explorer's Expedition Backpack
              </h2>
              <p className="text-xs text-stone-300 font-mono">
                Harvested Knowledge Fruits & Stamina Reserves
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1 bg-[#FAF9F6]">
          {/* Stamina & Mastery Gauge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-stone-300 rounded p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-amber-800 font-mono text-xs font-bold uppercase mb-1">
                <FiZap size={14} /> Jungle Stamina
              </div>
              <div className="text-xl font-bold font-mono text-stone-900">{totalStamina} PTS</div>
              <div className="text-[10px] font-mono text-stone-500 mt-0.5">+15-40 PTS per harvested fruit</div>
            </div>

            <div className="bg-white border border-stone-300 rounded p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-emerald-800 font-mono text-xs font-bold uppercase mb-1">
                <FiAward size={14} /> Knowledge Fruits
              </div>
              <div className="text-xl font-bold font-mono text-stone-900">
                {harvestedFruits.length} / {totalFruitsCount}
              </div>
              <div className="text-[10px] font-mono text-stone-500 mt-0.5">Found in 12 jungle biomes</div>
            </div>

            <div className="bg-white border border-stone-300 rounded p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-indigo-800 font-mono text-xs font-bold uppercase mb-1">
                <FiCompass size={14} /> Exploration XP
              </div>
              <div className="text-xl font-bold font-mono text-stone-900">{totalXP} XP</div>
              <div className="text-[10px] font-mono text-stone-500 mt-0.5">Cameroon HND Syllabus</div>
            </div>
          </div>

          {/* Harvested Fruits Grid */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-950 mb-3 flex items-center justify-between border-b border-stone-200 pb-1.5">
              <span>Harvested Knowledge Fruits Collection</span>
              <span className="text-[11px] text-stone-500 font-normal">
                {harvestedFruits.length} collected
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.values(jungleFruits).map(fruit => {
                const isHarvested = collectedUnitIds.has(fruit.zoneId);

                return (
                  <div
                    key={fruit.id}
                    className={`p-3 rounded border transition-all flex items-start gap-3 ${
                      isHarvested
                        ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                        : 'bg-stone-100 border-stone-200 opacity-50 grayscale'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{fruit.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className={`font-bold text-xs ${isHarvested ? 'text-amber-950' : 'text-stone-500'}`}>
                          {fruit.name}
                        </h4>
                        {isHarvested && (
                          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded shrink-0">
                            +{fruit.staminaBoost} Stamina
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-stone-600 mt-0.5 line-clamp-1">
                        {fruit.zoneName}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">
                        {isHarvested ? fruit.description : '🔒 Complete lessons in this zone to harvest.'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secret Past Paper Vault Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-stone-100 p-4 rounded border border-emerald-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
                <FiFileText size={14} /> Secret HND Past Paper Vault
              </div>
              <p className="text-xs text-stone-300 mt-1">
                Your harvested Knowledge Fruits grant clearance to Cameroon HND 10-mark past exam solutions.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onNavigateToExams();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase rounded border border-emerald-500 transition-colors shrink-0 shadow-xs"
            >
              Enter Past Paper Vault →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-200 border-t border-stone-300 p-3 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-mono font-semibold transition-colors"
          >
            Close Backpack
          </button>
        </div>
      </div>
    </div>
  );
}
