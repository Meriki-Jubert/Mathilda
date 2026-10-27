import { FiLock, FiCheck, FiPlay, FiAward, FiZap, FiBookOpen } from 'react-icons/fi';
import { Unit } from '../data/curriculum';
import { jungleFruits, jungleZoneLogs } from '../data/jungleLore';

interface LearningTreeProps {
  units: Unit[];
  completedSkills: string[];
  getSkillMastery: (skillId: string) => number;
  isSkillUnlocked: (skillIndex: number, allSkillIds: string[]) => boolean;
  onSelectSkill: (unitId: string, skillId: string) => void;
  totalXP: number;
  streakDays?: number;
  onOpenBackpack: () => void;
}

export default function LearningTree({
  units,
  completedSkills,
  getSkillMastery,
  isSkillUnlocked,
  onSelectSkill,
  totalXP,
  streakDays = 0,
  onOpenBackpack,
}: LearningTreeProps) {
  const allSkillIds = units.flatMap(u => u.skills.map(s => s.id));

  // Determine harvested fruits
  const collectedUnitIds = new Set<string>();
  completedSkills.forEach(skillId => {
    const match = skillId.match(/skill-(\d+)\./);
    if (match) {
      collectedUnitIds.add(`unit-${match[1]}`);
    }
  });

  const totalFruitsCount = Object.keys(jungleFruits).length;
  const harvestedCount = Object.values(jungleFruits).filter(fruit => collectedUnitIds.has(fruit.zoneId)).length;
  const totalStamina = Object.values(jungleFruits)
    .filter(fruit => collectedUnitIds.has(fruit.zoneId))
    .reduce((sum, f) => sum + f.staminaBoost, 100);

  const getOverallProgress = () => {
    const totalSkills = allSkillIds.length;
    const completed = completedSkills.length;
    return Math.round((completed / totalSkills) * 100);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24">
      {/* Expedition Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-slate-100 border-b border-amber-900/40 sticky top-12 z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-600/40 px-2 py-0.5 rounded">
                  Cameroon HND Expedition Map
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>🌴</span> Mathilda: The Jungle of Equations
              </h1>
              <p className="text-xs text-stone-300 mt-0.5">Explore 12 mathematical jungle zones, harvest Knowledge Fruits, and master Cameroon HND exams</p>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Backpack Button */}
              <button
                onClick={onOpenBackpack}
                className="bg-amber-900/60 hover:bg-amber-900 border border-amber-500/50 text-amber-200 px-3 py-1.5 rounded flex items-center gap-2 transition-all shadow-xs"
              >
                <span className="text-lg">🎒</span>
                <div className="text-left font-mono leading-tight">
                  <p className="text-[10px] uppercase font-bold text-amber-300">Backpack</p>
                  <p className="text-xs font-bold text-white">{harvestedCount}/{totalFruitsCount} Fruits</p>
                </div>
              </button>

              {/* Stamina Meter */}
              <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-right font-mono">
                <p className="text-[10px] uppercase font-bold text-stone-400 flex items-center justify-end gap-1">
                  <FiZap className="text-amber-400" size={12} /> Stamina
                </p>
                <p className="text-xs font-bold text-amber-400">{totalStamina} PTS</p>
              </div>

              {/* XP Meter */}
              <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-right font-mono">
                <p className="text-[10px] uppercase font-bold text-stone-400 flex items-center justify-end gap-1">
                  <FiAward className="text-emerald-400" size={12} /> Mastery XP
                </p>
                <p className="text-xs font-bold text-emerald-400">{totalXP} XP</p>
              </div>
            </div>
          </div>

          {/* Overall Progress Trail Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-800 rounded overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${getOverallProgress()}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{getOverallProgress()}% Jungle Explored</span>
          </div>
        </div>
      </div>

      {/* Jungle Zones List */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {units.map((unit, unitIndex) => {
          const unitSkillIds = unit.skills.map(s => s.id);
          const unitCompleted = unitSkillIds.filter(id => completedSkills.includes(id)).length;
          const unitTotal = unitSkillIds.length;
          const unitProgress = Math.round((unitCompleted / unitTotal) * 100);

          const zoneFruit = jungleFruits[unit.id];
          const zoneLog = jungleZoneLogs[unit.id];
          const isFruitHarvested = collectedUnitIds.has(unit.id);

          return (
            <div key={unit.id} className="bg-white rounded border border-stone-300 shadow-xs p-5 relative overflow-hidden">
              {/* Zone Header Banner */}
              <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono font-bold uppercase text-stone-800 bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                      {zoneLog?.zoneTitle || `Zone ${unit.number}`}
                    </span>
                    {unitProgress === 100 && (
                      <span className="text-[11px] font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        ✓ Zone Mastered
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-bold text-stone-900 tracking-tight">{unit.title}</h2>
                  <p className="text-xs text-stone-600 mt-0.5">{unit.goal}</p>
                </div>

                {/* Fruit Indicator */}
                {zoneFruit && (
                  <div
                    onClick={onOpenBackpack}
                    className={`px-3 py-1.5 rounded border cursor-pointer transition-all shrink-0 font-mono text-xs flex items-center gap-2 ${
                      isFruitHarvested
                        ? 'bg-amber-50 border-amber-300 text-amber-950 font-bold shadow-xs'
                        : 'bg-stone-100 border-stone-200 text-stone-400 opacity-60'
                    }`}
                    title={isFruitHarvested ? `Harvested: ${zoneFruit.name}` : `Locked: ${zoneFruit.name}`}
                  >
                    <span className="text-lg">{zoneFruit.icon}</span>
                    <div className="text-left hidden sm:block">
                      <p className="text-[10px] uppercase font-bold text-amber-900">
                        {isFruitHarvested ? 'Fruit Harvested' : 'Unexplored Fruit'}
                      </p>
                      <p className="text-[11px] truncate max-w-[120px]">{zoneFruit.name}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Explorer Log Quote */}
              {zoneLog && (
                <div className="bg-stone-50 border-l-2 border-amber-800 p-2.5 rounded-r text-xs text-stone-700 italic font-serif mb-4">
                  {zoneLog.loreQuote}
                </div>
              )}

              {/* Module Trails */}
              <div className="space-y-2.5">
                {unit.skills.map((skill) => {
                  const globalSkillIndex = allSkillIds.indexOf(skill.id);
                  const unlocked = isSkillUnlocked(globalSkillIndex, allSkillIds);
                  const completed = completedSkills.includes(skill.id);
                  const mastery = getSkillMastery(skill.id);

                  return (
                    <div
                      key={skill.id}
                      onClick={() => unlocked && onSelectSkill(unit.id, skill.id)}
                      className={`p-3.5 rounded border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                        completed
                          ? 'bg-emerald-50/60 border-emerald-300 hover:bg-emerald-100/60'
                          : unlocked
                          ? 'bg-white border-stone-300 hover:border-emerald-600 hover:shadow-xs'
                          : 'bg-stone-50 border-stone-200 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded border flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          completed
                            ? 'bg-emerald-700 border-emerald-800 text-white'
                            : unlocked
                            ? 'bg-slate-900 border-slate-900 text-white'
                            : 'bg-stone-200 border-stone-300 text-stone-500'
                        }`}>
                          {completed ? (
                            <FiCheck size={16} />
                          ) : unlocked ? (
                            <FiPlay size={14} className="ml-0.5" />
                          ) : (
                            <FiLock size={14} />
                          )}
                        </div>
                        <div>
                          <h3 className={`font-semibold text-sm ${completed ? 'text-emerald-950' : unlocked ? 'text-stone-900' : 'text-stone-400'}`}>
                            {skill.title}
                          </h3>
                          <p className={`text-xs ${completed ? 'text-emerald-800' : unlocked ? 'text-stone-600' : 'text-stone-400'}`}>
                            {skill.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {unlocked && !completed && mastery > 0 && (
                          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {mastery}% Mastery
                          </span>
                        )}
                        <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded border ${
                          completed
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : unlocked
                            ? 'bg-stone-100 text-stone-800 border-stone-300'
                            : 'bg-stone-100 text-stone-400 border-stone-200'
                        }`}>
                          {completed ? 'Trail Completed ✓' : unlocked ? 'Enter Trail →' : 'Locked'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
