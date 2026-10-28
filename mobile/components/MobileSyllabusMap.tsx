import React from 'react';
import { curriculum } from '../../src/data/curriculum';
import { FiBookOpen, FiLock, FiCheckCircle } from 'react-icons/fi';

interface MobileSyllabusMapProps {
  completedSkills: string[];
  onSelectSkill: (unitId: string, skillId: string) => void;
}

export const MobileSyllabusMap: React.FC<MobileSyllabusMapProps> = ({
  completedSkills,
  onSelectSkill,
}) => {
  return (
    <div className="space-y-4 pb-28 pt-2">
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-4 rounded-xl border border-emerald-900/60 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-amber-300 uppercase font-bold tracking-wider block">
              🌴 Cameroon HND Expedition
            </span>
            <h2 className="text-base font-bold text-stone-100">Jungle Syllabus Trailhead</h2>
          </div>
          <span className="text-2xl">🧭</span>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          Select a skill zone to begin lesson walkthroughs or solve practice trials.
        </p>
      </div>

      <div className="space-y-3">
        {curriculum.map((unit) => {
          return (
            <div
              key={unit.id}
              className="bg-white border border-stone-200 rounded-xl p-3.5 shadow-xs font-sans"
            >
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-stone-100">
                <span className="text-xl shrink-0">{unit.icon}</span>
                <div>
                  <h3 className="text-xs font-mono font-bold text-stone-900 uppercase">
                    {unit.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-mono">{unit.skills.length} Skill Modules Available</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {unit.skills.map((skill, index) => {
                  const isCompleted = completedSkills.includes(skill.id);
                  const isUnlocked = index === 0 || completedSkills.includes(unit.skills[index - 1]?.id);

                  return (
                    <button
                      key={skill.id}
                      onClick={() => isUnlocked && onSelectSkill(unit.id, skill.id)}
                      disabled={!isUnlocked}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                        isCompleted
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                          : isUnlocked
                          ? 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800 font-medium'
                          : 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isUnlocked
                            ? 'bg-slate-800 text-amber-300'
                            : 'bg-stone-300 text-stone-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-xs font-bold">{skill.title}</div>
                          <div className="text-[10px] font-mono text-stone-500">
                            {skill.lessons.length} Lessons • {skill.practice.length} Practice Questions
                          </div>
                        </div>
                      </div>

                      {isCompleted ? (
                        <FiCheckCircle className="text-emerald-700 shrink-0" size={16} />
                      ) : isUnlocked ? (
                        <FiBookOpen className="text-slate-700 shrink-0" size={16} />
                      ) : (
                        <FiLock className="text-stone-400 shrink-0" size={16} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
