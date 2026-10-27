import { useState } from 'react';
import { hndExamQuestions, ExamQuestion } from '../data/hndExamBank';

interface HndExamBankViewProps {
  onBack: () => void;
}

export default function HndExamBankView({ onBack }: HndExamBankViewProps) {
  const [selectedModule, setSelectedModule] = useState<string>('All');
  const [activeQuestion, setActiveQuestion] = useState<ExamQuestion | null>(hndExamQuestions[0]);
  const [revealedParts, setRevealedParts] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const modules = ['All', 'Laplace Transforms', 'Complex Numbers', 'Matrices', 'Numerical Methods'];

  const filteredQuestions = selectedModule === 'All'
    ? hndExamQuestions
    : hndExamQuestions.filter(q => q.module === selectedModule);

  const toggleReveal = (partKey: string) => {
    setRevealedParts(prev => ({ ...prev, [partKey]: !prev[partKey] }));
  };

  const toggleHint = (partKey: string) => {
    setRevealedHints(prev => ({ ...prev, [partKey]: !prev[partKey] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <button
            onClick={onBack}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-2"
          >
            ← Back to Learning Path
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <span>🇨🇲</span> Cameroon HND Math Past Exam Bank
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real multi-part 10-mark exam questions with step-by-step marking schemes
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Filter Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <span>📚</span> Select Exam Module
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {modules.map(mod => (
                <button
                  key={mod}
                  onClick={() => setSelectedModule(mod)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedModule === mod
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {mod}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredQuestions.map(q => (
                <div
                  key={q.id}
                  onClick={() => {
                    setActiveQuestion(q);
                    setRevealedParts({});
                    setRevealedHints({});
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    activeQuestion?.id === q.id
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      {q.module}
                    </span>
                    <span>{q.totalMarks} Marks</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm line-clamp-2">
                    {q.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{q.paperYear}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Question Detail View */}
        <div className="lg:col-span-8">
          {activeQuestion ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {activeQuestion.module}
                  </span>
                  <p className="text-xs text-slate-400 mt-2">{activeQuestion.paperYear}</p>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">{activeQuestion.title}</h2>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-600">{activeQuestion.totalMarks}</span>
                  <span className="text-xs font-medium text-slate-400 block">Total Marks</span>
                </div>
              </div>

              {/* Problem Scenario */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Problem Scenario</h4>
                <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line font-mono">
                  {activeQuestion.scenario}
                </p>
              </div>

              {/* Question Parts */}
              <div className="space-y-6">
                {activeQuestion.parts.map((part, index) => {
                  const partKey = `${activeQuestion.id}-${index}`;
                  const isRevealed = !!revealedParts[partKey];
                  const hintShown = !!revealedHints[partKey];

                  return (
                    <div key={index} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-slate-300 transition-all">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-base font-bold text-slate-900">
                          <span className="text-emerald-600 mr-2">{part.partLabel}</span>
                          {part.questionText}
                        </h4>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
                          {part.marks} {part.marks === 1 ? 'Mark' : 'Marks'}
                        </span>
                      </div>

                      {/* Hint Button */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => toggleHint(partKey)}
                          className="text-xs font-medium text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 transition-all"
                        >
                          {hintShown ? 'Hide Exam Hint 💡' : 'Need a Hint? 💡'}
                        </button>

                        <button
                          onClick={() => toggleReveal(partKey)}
                          className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${
                            isRevealed
                              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          }`}
                        >
                          {isRevealed ? 'Hide Solution' : 'Reveal Step-by-Step Solution'}
                        </button>
                      </div>

                      {/* Hint Box */}
                      {hintShown && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                          <strong>Exam Tip:</strong> {part.hint}
                        </div>
                      )}

                      {/* Solution Scheme */}
                      {isRevealed && (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
                          <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                            Official Step-by-Step Marking Scheme
                          </h5>
                          <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-700 font-mono bg-slate-900 text-slate-100 p-4 rounded-xl">
                            {part.solutionSteps.map((step, sIdx) => (
                              <li key={sIdx} className="leading-relaxed">
                                {step}
                              </li>
                            ))}
                          </ol>
                          <div className="mt-3 bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-800">Final Answer:</span>
                            <span className="text-sm font-extrabold text-emerald-900 font-mono">{part.finalAnswer}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border text-center text-slate-400">
              Select a question from the left sidebar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
