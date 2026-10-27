import { FiArrowLeft, FiBookOpen, FiEdit3, FiCheck, FiLock } from 'react-icons/fi';
import { Skill } from '../data/curriculum';

interface SkillHubProps {
  skill: Skill;
  unitTitle: string;
  lessonsCompleted: string[];
  practiceCompleted: string[];
  masteryLevel: number;
  onSelectLesson: (lessonId: string) => void;
  onStartPractice: () => void;
  onBack: () => void;
}

export default function SkillHub({
  skill,
  unitTitle,
  lessonsCompleted,
  practiceCompleted,
  masteryLevel,
  onSelectLesson,
  onStartPractice,
  onBack,
}: SkillHubProps) {
  const allLessonsCompleted = skill.lessons.every(l => lessonsCompleted.includes(l.id));
  const allPracticeCompleted = skill.practice.every(p => practiceCompleted.includes(p.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-2"
          >
            <FiArrowLeft /> Back to Tree
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
              {unitTitle}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-1">{skill.title}</h1>
          <p className="text-gray-500 text-sm mt-1">{skill.description}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Mastery Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Mastery Level</h3>
            <span className="text-2xl font-bold text-purple-600">{masteryLevel}%</span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${masteryLevel}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>Lessons: {lessonsCompleted.length}/{skill.lessons.length}</span>
            <span>Practice: {practiceCompleted.length}/{skill.practice.length}</span>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FiBookOpen className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Lessons</h2>
              <p className="text-sm text-gray-500">Learn the concepts step by step</p>
            </div>
          </div>

          <div className="space-y-3">
            {skill.lessons.map((lesson, index) => {
              const completed = lessonsCompleted.includes(lesson.id);
              const prevCompleted = index === 0 || lessonsCompleted.includes(skill.lessons[index - 1].id);
              const isAccessible = prevCompleted;

              return (
                <button
                  key={lesson.id}
                  onClick={() => isAccessible && onSelectLesson(lesson.id)}
                  disabled={!isAccessible}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    completed
                      ? 'border-green-300 bg-green-50 hover:bg-green-100'
                      : isAccessible
                      ? 'border-blue-200 bg-white hover:border-blue-400 hover:shadow-md'
                      : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      completed
                        ? 'bg-green-500'
                        : isAccessible
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                    }`}>
                      {completed ? (
                        <FiCheck className="text-white" size={18} />
                      ) : isAccessible ? (
                        <FiBookOpen className="text-white" size={18} />
                      ) : (
                        <FiLock className="text-white" size={16} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${completed ? 'text-green-700' : isAccessible ? 'text-gray-800' : 'text-gray-400'}`}>
                        {lesson.title}
                      </h3>
                      <p className={`text-sm ${completed ? 'text-green-600' : isAccessible ? 'text-gray-500' : 'text-gray-400'}`}>
                        {completed ? '✓ Completed' : isAccessible ? 'Ready to learn' : 'Complete previous lesson first'}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Practice Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <FiEdit3 className="text-green-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Practice</h2>
              <p className="text-sm text-gray-500">Test your understanding</p>
            </div>
          </div>

          <button
            onClick={onStartPractice}
            disabled={!allLessonsCompleted}
            className={`w-full p-6 rounded-2xl border-2 transition-all ${
              allLessonsCompleted
                ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-lg hover:border-green-400 cursor-pointer'
                : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                allLessonsCompleted
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                  : 'bg-gray-300'
              }`}>
                {allPracticeCompleted ? (
                  <FiCheck className="text-white" size={24} />
                ) : allLessonsCompleted ? (
                  <FiEdit3 className="text-white" size={24} />
                ) : (
                  <FiLock className="text-white" size={20} />
                )}
              </div>
              <div className="text-left">
                <h3 className={`font-bold text-lg ${allLessonsCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                  {allPracticeCompleted
                    ? 'Practice Complete! ✨'
                    : allLessonsCompleted
                    ? 'Start Practice'
                    : 'Complete All Lessons First'}
                </h3>
                <p className={`text-sm ${allLessonsCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  {allPracticeCompleted
                    ? `All ${skill.practice.length} questions answered correctly`
                    : allLessonsCompleted
                    ? `${skill.practice.length} questions to test your knowledge`
                    : 'Finish the lessons above to unlock practice'}
                </p>
              </div>
            </div>
            {allLessonsCompleted && !allPracticeCompleted && (
              <div className="mt-4 h-2 bg-green-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  style={{ width: `${(practiceCompleted.length / skill.practice.length) * 100}%` }}
                />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
