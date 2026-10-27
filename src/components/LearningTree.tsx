import { FiLock, FiCheck, FiPlay } from 'react-icons/fi';
import { Unit } from '../data/curriculum';

interface LearningTreeProps {
  units: Unit[];
  completedSkills: string[];
  getSkillMastery: (skillId: string) => number;
  isSkillUnlocked: (skillIndex: number, allSkillIds: string[]) => boolean;
  onSelectSkill: (unitId: string, skillId: string) => void;
  totalXP: number;
  streakDays?: number;
}

export default function LearningTree({
  units,
  completedSkills,
  getSkillMastery,
  isSkillUnlocked,
  onSelectSkill,
  totalXP,
  streakDays = 0,
}: LearningTreeProps) {
  const allSkillIds = units.flatMap(u => u.skills.map(s => s.id));

  const getOverallProgress = () => {
    const totalSkills = allSkillIds.length;
    const completed = completedSkills.length;
    return Math.round((completed / totalSkills) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">🌳 Math Mastery Tree</h1>
              <p className="text-sm text-gray-500">HND Discrete Mathematics</p>
            </div>
            <div className="flex items-center gap-4">
              {streakDays > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Streak</p>
                  <p className="text-xl font-bold text-orange-500">🔥 {streakDays}</p>
                </div>
              )}
              <div className="text-right">
                <p className="text-sm text-gray-500">Total XP</p>
                <p className="text-xl font-bold text-purple-600">{totalXP} ⭐</p>
              </div>
            </div>
          </div>
          {/* Overall progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${getOverallProgress()}%` }}
              />
            </div>
            <span className="text-sm font-bold text-gray-600">{getOverallProgress()}%</span>
          </div>
        </div>
      </div>

      {/* Units */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {units.map((unit, unitIndex) => {
          const unitSkillIds = unit.skills.map(s => s.id);
          const unitCompleted = unitSkillIds.filter(id => completedSkills.includes(id)).length;
          const unitTotal = unitSkillIds.length;
          const unitProgress = Math.round((unitCompleted / unitTotal) * 100);

          return (
            <div key={unit.id} className="mb-10">
              {/* Unit Header */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center text-3xl">
                    {unit.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                        Unit {unit.number}
                      </span>
                      {unitProgress === 100 && (
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                          ✓ Complete
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 mt-1">{unit.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{unit.goal}</p>
                  </div>
                </div>
                {/* Unit progress bar */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${unitProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {unitCompleted}/{unitTotal} skills
                  </span>
                </div>
              </div>

              {/* Skills Path */}
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
                
                {unit.skills.map((skill, skillIndex) => {
                  const globalSkillIndex = allSkillIds.indexOf(skill.id);
                  const unlocked = isSkillUnlocked(globalSkillIndex, allSkillIds);
                  const completed = completedSkills.includes(skill.id);
                  const mastery = getSkillMastery(skill.id);

                  return (
                    <div key={skill.id} className="relative flex items-start gap-6 mb-6 last:mb-0">
                      {/* Node */}
                      <div className="relative z-10">
                        <button
                          onClick={() => unlocked && onSelectSkill(unit.id, skill.id)}
                          disabled={!unlocked}
                          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                            completed
                              ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-200'
                              : unlocked
                              ? 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-200 hover:scale-110 cursor-pointer'
                              : 'bg-gray-200 cursor-not-allowed'
                          }`}
                        >
                          {completed ? (
                            <FiCheck className="text-white" size={24} />
                          ) : unlocked ? (
                            <FiPlay className="text-white" size={20} />
                          ) : (
                            <FiLock className="text-gray-400" size={20} />
                          )}
                        </button>
                        {/* Mastery ring */}
                        {unlocked && !completed && mastery > 0 && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-purple-300">
                            <span className="text-[10px] font-bold text-purple-600">{mastery}%</span>
                          </div>
                        )}
                      </div>

                      {/* Skill Info Card */}
                      <div
                        className={`flex-1 rounded-xl p-4 transition-all ${
                          completed
                            ? 'bg-green-50 border border-green-200'
                            : unlocked
                            ? 'bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer'
                            : 'bg-gray-50 border border-gray-100 opacity-60'
                        }`}
                        onClick={() => unlocked && onSelectSkill(unit.id, skill.id)}
                      >
                        <h3 className={`font-bold ${completed ? 'text-green-700' : unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                          {skill.title}
                        </h3>
                        <p className={`text-sm mt-1 ${completed ? 'text-green-600' : unlocked ? 'text-gray-500' : 'text-gray-400'}`}>
                          {skill.description}
                        </p>
                        {unlocked && !completed && mastery > 0 && (
                          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full"
                              style={{ width: `${mastery}%` }}
                            />
                          </div>
                        )}
                        {completed && (
                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-xs text-green-600 font-medium">Mastered ✨</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Unit separator */}
              {unitIndex < units.length - 1 && (
                <div className="flex justify-center my-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-xs">•••</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
