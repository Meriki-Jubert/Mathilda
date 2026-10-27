import { useState } from 'react';
import { FiArrowLeft, FiFileText, FiHelpCircle, FiCheckCircle, FiUnlock } from 'react-icons/fi';
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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans p-4 md:p-8">
      {/* Vault Header */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-stone-100 p-6 rounded border border-amber-900/40 shadow-xs">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-mono font-medium text-amber-300 hover:text-white flex items-center gap-1 mb-2"
          >
            <FiArrowLeft size={14} /> Back to Expedition Map
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded flex items-center gap-1">
              <FiUnlock size={12} /> Secret Vault Unlocked
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FiFileText className="text-amber-400" size={22} />
            Secret HND Past Paper Temple Vault
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Official 10-mark examination solutions unlocked through Knowledge Fruit harvesting
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Filter Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white p-5 rounded border border-stone-300 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-3">
              Filter Vault Papers
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-4 font-mono text-xs">
              {modules.map(mod => (
                <button
                  key={mod}
                  onClick={() => setSelectedModule(mod)}
                  className={`px-3 py-1 rounded transition-all ${
                    selectedModule === mod
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                  }`}
                >
                  {mod}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              {filteredQuestions.map(q => (
                <div
                  key={q.id}
                  onClick={() => {
                    setActiveQuestion(q);
                    setRevealedParts({});
                    setRevealedHints({});
                  }}
                  className={`p-3.5 rounded border cursor-pointer transition-all ${
                    activeQuestion?.id === q.id
                      ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                      : 'bg-white border-stone-300 hover:border-amber-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1">
                    <span className="font-bold text-amber-950 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      {q.module}
                    </span>
                    <span>{q.totalMarks} Marks</span>
                  </div>
                  <h4 className="font-semibold text-stone-900 text-xs leading-snug line-clamp-2 mt-1">
                    {q.title}
                  </h4>
                  <p className="text-[11px] font-mono text-stone-500 mt-1">{q.paperYear}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Question Detail View */}
        <div className="lg:col-span-8">
          {activeQuestion ? (
            <div className="bg-white rounded border border-stone-300 shadow-xs p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-300">
                    {activeQuestion.module}
                  </span>
                  <p className="text-xs font-mono text-stone-500 mt-2">{activeQuestion.paperYear}</p>
                  <h2 className="text-lg font-bold text-stone-900 tracking-tight mt-1">{activeQuestion.title}</h2>
                </div>
                <div className="text-right font-mono">
                  <span className="text-2xl font-bold text-emerald-800">{activeQuestion.totalMarks}</span>
                  <span className="text-xs font-semibold text-stone-500 block">Total Marks</span>
                </div>
              </div>

              {/* Problem Scenario */}
              <div className="bg-stone-50 border border-stone-300 rounded p-4 font-mono text-xs">
                <h4 className="font-bold text-stone-600 uppercase tracking-wider mb-1">Vault Problem Statement</h4>
                <p className="text-stone-900 leading-relaxed whitespace-pre-line">
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
                    <div key={index} className="border border-stone-300 rounded p-5 bg-white hover:border-stone-400 transition-all space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-sm font-bold text-stone-900 leading-snug">
                          <span className="text-emerald-800 font-mono mr-2">{part.partLabel}</span>
                          {part.questionText}
                        </h4>
                        <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded border border-stone-200 shrink-0">
                          {part.marks} {part.marks === 1 ? 'Mark' : 'Marks'}
                        </span>
                      </div>

                      {/* Control Buttons */}
                      <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                        <button
                          onClick={() => toggleHint(partKey)}
                          className="flex items-center gap-1 font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded border border-amber-300 transition-colors"
                        >
                          <FiHelpCircle size={13} />
                          {hintShown ? 'Hide Vault Hint' : 'View Vault Hint'}
                        </button>

                        <button
                          onClick={() => toggleReveal(partKey)}
                          className={`flex items-center gap-1 font-bold px-3.5 py-1.5 rounded transition-colors ${
                            isRevealed
                              ? 'bg-stone-200 text-stone-800 hover:bg-stone-300 border border-stone-300'
                              : 'bg-amber-700 hover:bg-amber-800 text-white shadow-xs'
                          }`}
                        >
                          <FiCheckCircle size={13} />
                          {isRevealed ? 'Hide Solution Scheme' : 'Reveal Official Scheme'}
                        </button>
                      </div>

                      {/* Hint Box */}
                      {hintShown && (
                        <div className="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-950 font-mono">
                          <strong>Official Exam Tip:</strong> {part.hint}
                        </div>
                      )}

                      {/* Solution Scheme */}
                      {isRevealed && (
                        <div className="pt-3 border-t border-stone-200 animate-fadeIn space-y-3">
                          <h5 className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                            Official Marking Scheme Steps
                          </h5>
                          <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-900 font-mono bg-slate-900 text-slate-100 p-4 rounded border border-slate-800">
                            {part.solutionSteps.map((step, sIdx) => (
                              <li key={sIdx} className="leading-relaxed">
                                {step}
                              </li>
                            ))}
                          </ol>
                          <div className="bg-emerald-50 border border-emerald-300 p-3 rounded flex items-center justify-between font-mono text-xs">
                            <span className="font-bold text-emerald-900">Final Evaluated Answer:</span>
                            <span className="font-bold text-emerald-950">{part.finalAnswer}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded border text-center text-stone-400 font-mono text-xs">
              Select a paper from the vault sidebar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
