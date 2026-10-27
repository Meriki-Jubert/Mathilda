import { FiX, FiTrendingUp, FiTrendingDown, FiTarget, FiClock, FiAward, FiAlertTriangle, FiBookOpen } from 'react-icons/fi';
import { WeeklyReport } from '../services/analytics';

interface WeeklyReportViewProps {
  isOpen: boolean;
  onClose: () => void;
  report: WeeklyReport;
}

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function WeeklyReportView({ isOpen, onClose, report }: WeeklyReportViewProps) {
  if (!isOpen) return null;

  const accuracyColor = report.overallAccuracy >= 80
    ? 'text-green-600'
    : report.overallAccuracy >= 60
    ? 'text-amber-600'
    : 'text-red-600';

  const accuracyBg = report.overallAccuracy >= 80
    ? 'bg-green-50 border-green-200'
    : report.overallAccuracy >= 60
    ? 'bg-amber-50 border-amber-200'
    : 'bg-red-50 border-red-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              📊 Weekly Progress Report
            </h2>
            <p className="text-sm text-purple-200">
              {formatDate(report.weekStart)} — {formatDate(report.weekEnd)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <FiTarget className="mx-auto text-purple-600 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">{report.totalQuestions}</p>
              <p className="text-xs text-gray-500">Questions</p>
            </div>
            <div className={`rounded-xl p-4 text-center border ${accuracyBg}`}>
              <FiAward className={`mx-auto mb-2 ${accuracyColor}`} size={24} />
              <p className={`text-2xl font-bold ${accuracyColor}`}>{report.overallAccuracy}%</p>
              <p className="text-xs text-gray-500">Accuracy</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <FiClock className="mx-auto text-blue-600 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">{formatTime(report.totalTimeSpentMs)}</p>
              <p className="text-xs text-gray-500">Study Time</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <FiBookOpen className="mx-auto text-green-600 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">{report.lessonsCompleted}</p>
              <p className="text-xs text-gray-500">Lessons</p>
            </div>
          </div>

          {/* Excels & Struggles */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Excelling */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-bold text-green-800 flex items-center gap-2 mb-3">
                <FiTrendingUp size={18} /> Excelling At
              </h3>
              {report.excellingSkills.length > 0 ? (
                <div className="space-y-2">
                  {report.excellingSkills.slice(0, 4).map(skill => (
                    <div key={skill.skillId} className="flex items-center justify-between bg-white rounded-lg p-2">
                      <span className="text-sm text-gray-700">{skill.skillTitle}</span>
                      <span className="text-sm font-bold text-green-600">{skill.accuracy}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-green-600 italic">
                  {report.totalQuestions === 0
                    ? 'Complete some practice to see your strengths!'
                    : 'Keep practicing to identify your strengths!'}
                </p>
              )}
            </div>

            {/* Struggling */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="font-bold text-red-800 flex items-center gap-2 mb-3">
                <FiTrendingDown size={18} /> Needs Attention
              </h3>
              {report.strugglingSkills.length > 0 ? (
                <div className="space-y-2">
                  {report.strugglingSkills.slice(0, 4).map(skill => (
                    <div key={skill.skillId} className="flex items-center justify-between bg-white rounded-lg p-2">
                      <span className="text-sm text-gray-700">{skill.skillTitle}</span>
                      <span className="text-sm font-bold text-red-600">{skill.accuracy}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-red-600 italic">
                  {report.totalQuestions === 0
                    ? 'No data yet — start practicing!'
                    : 'No major struggles detected. Great job! 🎉'}
                </p>
              )}
            </div>
          </div>

          {/* Patterns */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-3">
              <FiAlertTriangle size={18} /> Patterns Detected
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>⏰ Most active study time: <strong>{report.patterns.mostActiveTime}</strong></p>
              {report.patterns.commonMistakeTypes.length > 0 && (
                <p>❌ Common mistake type: <strong>{report.patterns.commonMistakeTypes.join(', ')}</strong></p>
              )}
              {report.patterns.improvementAreas.length > 0 && (
                <p>📈 Focus areas: <strong>{report.patterns.improvementAreas.join(', ')}</strong></p>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <h3 className="font-bold text-purple-800 mb-3">💡 Recommendations</h3>
            <ul className="space-y-2">
              {report.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-purple-700">
                  <span className="text-purple-500 mt-0.5">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Wrong Answers Review */}
          {report.topSkills.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-3">📝 Skill Breakdown</h3>
              <div className="space-y-2">
                {report.topSkills.slice(0, 5).map(skill => (
                  <div key={skill.skillId} className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.skillTitle}</span>
                      <span className={`text-sm font-bold ${
                        skill.accuracy >= 80 ? 'text-green-600' :
                        skill.accuracy >= 60 ? 'text-amber-600' : 'text-red-600'
                      }`}>{skill.accuracy}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          skill.accuracy >= 80 ? 'bg-green-500' :
                          skill.accuracy >= 60 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${skill.accuracy}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {skill.correctAttempts}/{skill.totalAttempts} correct • Avg time: {formatTime(skill.avgTimeMs)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.totalQuestions === 0 && (
            <div className="text-center py-8">
              <span className="text-5xl mb-4 block">📚</span>
              <p className="text-gray-500">No activity this week yet.</p>
              <p className="text-gray-400 text-sm">Start practicing to see your progress report!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
