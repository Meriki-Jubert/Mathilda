import { FiX, FiTrendingUp, FiTrendingDown, FiTarget, FiClock, FiAward, FiBookOpen } from 'react-icons/fi';
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
    ? 'text-emerald-700 font-extrabold font-mono'
    : report.overallAccuracy >= 60
    ? 'text-amber-700 font-extrabold font-mono'
    : 'text-red-700 font-extrabold font-mono';

  const accuracyBg = report.overallAccuracy >= 80
    ? 'bg-emerald-50 border-emerald-300'
    : report.overallAccuracy >= 60
    ? 'bg-amber-50 border-amber-300'
    : 'bg-red-50 border-red-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans text-slate-900">
      <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white border-b border-slate-800 p-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              <span>📊</span> Weekly Analytics & Performance Report
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Window: {formatDate(report.weekStart)} — {formatDate(report.weekEnd)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1 bg-slate-50">
          {/* Overview Metric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded border border-slate-200 p-3.5 text-center shadow-xs">
              <FiTarget className="mx-auto text-slate-700 mb-1" size={20} />
              <p className="text-xl font-bold font-mono text-slate-900">{report.totalQuestions}</p>
              <p className="text-[11px] font-mono text-slate-500 uppercase">Questions Solved</p>
            </div>
            <div className={`rounded border p-3.5 text-center shadow-xs ${accuracyBg}`}>
              <FiAward className="mx-auto mb-1 text-slate-800" size={20} />
              <p className={`text-xl ${accuracyColor}`}>{report.overallAccuracy}%</p>
              <p className="text-[11px] font-mono text-slate-700 uppercase">Overall Accuracy</p>
            </div>
            <div className="bg-white rounded border border-slate-200 p-3.5 text-center shadow-xs">
              <FiClock className="mx-auto text-slate-700 mb-1" size={20} />
              <p className="text-xl font-bold font-mono text-slate-900">{formatTime(report.totalTimeSpentMs)}</p>
              <p className="text-[11px] font-mono text-slate-500 uppercase">Study Duration</p>
            </div>
            <div className="bg-white rounded border border-slate-200 p-3.5 text-center shadow-xs">
              <FiBookOpen className="mx-auto text-slate-700 mb-1" size={20} />
              <p className="text-xl font-bold font-mono text-slate-900">{report.lessonsCompleted}</p>
              <p className="text-[11px] font-mono text-slate-500 uppercase">Lessons Completed</p>
            </div>
          </div>

          {/* Excels & Focus Areas */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Excelling Skills */}
            <div className="bg-emerald-50/70 border border-emerald-300 rounded p-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 mb-2.5">
                <FiTrendingUp size={16} /> Strongest Modules (High Retention)
              </h3>
              {report.excellingSkills.length > 0 ? (
                <div className="space-y-1.5 font-mono text-xs">
                  {report.excellingSkills.slice(0, 4).map(skill => (
                    <div key={skill.skillId} className="flex items-center justify-between bg-white rounded border border-emerald-200 p-2 text-slate-900">
                      <span>{skill.skillTitle}</span>
                      <span className="font-bold text-emerald-800">{skill.accuracy}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-800 italic">
                  {report.totalQuestions === 0
                    ? 'Complete practice modules to populate strength metrics.'
                    : 'Keep practicing to reveal top skill areas!'}
                </p>
              )}
            </div>

            {/* Struggling Skills */}
            <div className="bg-amber-50/70 border border-amber-300 rounded p-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-amber-950 flex items-center gap-1.5 mb-2.5">
                <FiTrendingDown size={16} /> Recommended Focus Modules
              </h3>
              {report.strugglingSkills.length > 0 ? (
                <div className="space-y-1.5 font-mono text-xs">
                  {report.strugglingSkills.slice(0, 4).map(skill => (
                    <div key={skill.skillId} className="flex items-center justify-between bg-white rounded border border-amber-200 p-2 text-slate-900">
                      <span>{skill.skillTitle}</span>
                      <span className="font-bold text-amber-800">{skill.accuracy}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-amber-900 italic">
                  {report.totalQuestions === 0
                    ? 'No questions attempted yet.'
                    : 'No critical weakness areas detected. Outstanding effort!'}
                </p>
              )}
            </div>
          </div>

          {/* Recommendations List */}
          <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">💡 Strategic Study Recommendations</h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {report.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 border-t border-slate-200 p-3.5 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold font-mono transition-colors shadow-xs"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
