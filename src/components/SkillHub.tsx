import { motion } from 'framer-motion';
import { FiArrowLeft, FiBookOpen, FiEdit3, FiCheck, FiLock, FiZap } from 'react-icons/fi';
import { Skill } from '../data/curriculum';
import { jungleFruits, jungleZoneLogs } from '../data/jungleLore';

interface SkillHubProps {
  skill: Skill;
  unitTitle: string;
  unitId?: string;
  lessonsCompleted: string[];
  practiceCompleted: string[];
  masteryLevel: number;
  onSelectLesson: (lessonId: string) => void;
  onStartPractice: () => void;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function SkillHub({
  skill,
  unitTitle,
  unitId = 'unit-1',
  lessonsCompleted,
  practiceCompleted,
  masteryLevel,
  onSelectLesson,
  onStartPractice,
  onBack,
}: SkillHubProps) {
  const allLessonsCompleted = skill.lessons.every(l => lessonsCompleted.includes(l.id));
  const allPracticeCompleted = skill.practice.every(p => practiceCompleted.includes(p.id));

  // Determine fruit for current zone
  const currentFruit = jungleFruits[unitId];
  const currentLog = jungleZoneLogs[unitId];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-16">
      {/* Expedition Trailhead Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-slate-100 border-b border-amber-900/40 sticky top-12 z-20 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-amber-300 hover:text-white transition-colors mb-2"
          >
            <FiArrowLeft size={14} /> Back to Expedition Map
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-600/40 px-2 py-0.5 rounded">
              {unitTitle}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">{skill.title}</h1>
          <p className="text-slate-300 text-xs mt-1 max-w-2xl">{skill.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Lore Field Log */}
        {currentLog && (
          <div className="bg-stone-100 border border-stone-300 p-4 rounded text-xs text-stone-800 font-serif italic flex items-start gap-3">
            <span className="text-2xl shrink-0">📜</span>
            <div>
              <p className="font-bold text-stone-900 not-italic font-sans mb-0.5">Explorer's Field Journal</p>
              <p>{currentLog.journalEntry}</p>
            </div>
          </div>
        )}

        {/* Module Mastery & Fruit Reward Banner */}
        <div className="bg-white rounded border border-stone-300 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600">Trail Mastery</h3>
              <p className="text-xs text-stone-500 mt-0.5">Complete lessons and problem sets to harvest Knowledge Fruits</p>
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-800">{masteryLevel}%</span>
          </div>
          <div className="h-2 bg-stone-100 rounded overflow-hidden border border-stone-200">
            <div
              className="h-full bg-emerald-600 transition-all duration-500"
              style={{ width: `${masteryLevel}%` }}
            />
          </div>

          {currentFruit && (
            <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between bg-amber-50/60 p-3 rounded border border-amber-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentFruit.icon}</span>
                <div>
                  <p className="font-bold text-amber-950 font-mono">{currentFruit.name}</p>
                  <p className="text-[11px] text-stone-600">{currentFruit.description}</p>
                </div>
              </div>
              <span className="font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-1 rounded shrink-0 flex items-center gap-1">
                <FiZap size={12} /> +{currentFruit.staminaBoost} Stamina
              </span>
            </div>
          )}
        </div>

        {/* Lessons Section with Framer Motion Staggered Trail Markers */}
        <div className="bg-white rounded border border-stone-300 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-stone-100 rounded border border-stone-300 flex items-center justify-center text-slate-800">
                <FiBookOpen size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-stone-900">Trail Lessons</h2>
                <p className="text-xs text-stone-500">Step-by-step conceptual walkthroughs</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-stone-200">
              {lessonsCompleted.length} of {skill.lessons.length} Completed
            </span>
          </div>

          <motion.div
            className="space-y-2.5"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {skill.lessons.map((lesson, index) => {
              const completed = lessonsCompleted.includes(lesson.id);
              const prevCompleted = index === 0 || lessonsCompleted.includes(skill.lessons[index - 1].id);
              const isAccessible = prevCompleted;

              return (
                <motion.button
                  key={lesson.id}
                  variants={itemVariants}
                  onClick={() => isAccessible && onSelectLesson(lesson.id)}
                  disabled={!isAccessible}
                  className={`w-full text-left p-3.5 rounded border text-sm transition-all flex items-center justify-between ${
                    completed
                      ? 'border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/60'
                      : isAccessible
                      ? 'border-stone-300 bg-white hover:border-emerald-600 hover:shadow-xs'
                      : 'border-stone-200 bg-stone-50 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded border flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      completed
                        ? 'bg-emerald-700 border-emerald-800 text-white'
                        : isAccessible
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-stone-200 border-stone-300 text-stone-500'
                    }`}>
                      {completed ? (
                        <FiCheck size={16} />
                      ) : isAccessible ? (
                        <span>{index + 1}</span>
                      ) : (
                        <FiLock size={14} />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${completed ? 'text-emerald-950' : isAccessible ? 'text-stone-900' : 'text-stone-400'}`}>
                        {lesson.title}
                      </h3>
                      <p className={`text-xs ${completed ? 'text-emerald-800' : isAccessible ? 'text-stone-600' : 'text-stone-400'}`}>
                        {lesson.keyConcept || lesson.explanation.slice(0, 75) + '...'}
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded border shrink-0 ${
                    completed
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : isAccessible
                      ? 'bg-stone-100 text-stone-800 border-stone-300'
                      : 'bg-stone-100 text-stone-400 border-stone-200'
                  }`}>
                    {completed ? 'Completed ✓' : isAccessible ? 'Study Lesson →' : 'Locked'}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Practice Exercises Section */}
        <div className="bg-white rounded border border-stone-300 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-stone-100 rounded border border-stone-300 flex items-center justify-center text-slate-800">
                <FiEdit3 size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-stone-900">Jungle Practice Trial</h2>
                <p className="text-xs text-stone-500">Test understanding and harvest regional Knowledge Fruits</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-stone-200">
              {skill.practice.length} Questions
            </span>
          </div>

          <button
            onClick={onStartPractice}
            disabled={!allLessonsCompleted}
            className={`w-full p-4 rounded border text-left transition-all ${
              allLessonsCompleted
                ? 'border-emerald-600 bg-emerald-50/80 hover:bg-emerald-100/80 cursor-pointer shadow-xs'
                : 'border-stone-200 bg-stone-50 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded border flex items-center justify-center ${
                  allLessonsCompleted
                    ? 'bg-emerald-700 border-emerald-800 text-white'
                    : 'bg-stone-200 border-stone-300 text-stone-500'
                }`}>
                  {allPracticeCompleted ? (
                    <FiCheck size={18} />
                  ) : allLessonsCompleted ? (
                    <FiEdit3 size={18} />
                  ) : (
                    <FiLock size={16} />
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${allLessonsCompleted ? 'text-emerald-950' : 'text-stone-400'}`}>
                    {allPracticeCompleted
                      ? 'Practice Trial Complete'
                      : allLessonsCompleted
                      ? 'Launch Practice Trial'
                      : 'Complete Lessons Above First'}
                  </h3>
                  <p className={`text-xs ${allLessonsCompleted ? 'text-emerald-800' : 'text-stone-400'}`}>
                    {allPracticeCompleted
                      ? `All ${skill.practice.length} practice problems completed.`
                      : allLessonsCompleted
                      ? `${skill.practice.length} questions available to harvest Knowledge Fruit.`
                      : 'Finish chapter lessons above to unlock practice trial.'}
                  </p>
                </div>
              </div>

              <span className={`text-xs font-mono font-semibold px-3 py-1.5 rounded border ${
                allLessonsCompleted
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                  : 'bg-stone-200 text-stone-500 border-stone-300'
              }`}>
                {allPracticeCompleted ? 'Review Trial' : allLessonsCompleted ? 'Start →' : 'Locked'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
