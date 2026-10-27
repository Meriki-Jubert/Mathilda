import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck, FiBookOpen, FiCompass, FiTarget } from 'react-icons/fi';
import { Lesson } from '../data/curriculum';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
  isCompleted: boolean;
}

export default function LessonView({ lesson, onComplete, onBack, isCompleted }: LessonViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showWorkedExample, setShowWorkedExample] = useState(false);

  const totalSteps = 4; // explanation, everyday, concept, worked example

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-16">
      {/* Field Journal Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-slate-100 border-b border-amber-900/40 sticky top-12 z-20 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-amber-300 hover:text-white transition-colors"
          >
            <FiArrowLeft size={14} /> Back to Trailhead
          </button>
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase font-bold text-amber-300 block">Explorer's Field Journal</span>
            <h2 className="text-sm font-bold tracking-tight text-white">{lesson.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <span className="bg-emerald-900 text-emerald-300 border border-emerald-700 text-[11px] font-mono px-2 py-0.5 rounded">
                ✓ Lesson Mastered
              </span>
            )}
          </div>
        </div>
        {/* Step Progress Line */}
        <div className="h-1 bg-slate-800">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Journal Workspace */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Step 1: Conceptual Breakdown */}
        {currentStep === 0 && (
          <div className="animate-fadeIn space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-stone-100 border border-stone-300 rounded flex items-center justify-center text-stone-800">
                <FiBookOpen size={18} />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-amber-900 uppercase">Field Note 1 of 4 • Conceptual Rule</p>
                <h3 className="text-lg font-bold text-stone-900">Understanding the Principle</h3>
              </div>
            </div>
            <div className="bg-white rounded border border-stone-300 p-6 shadow-xs">
              <p className="text-stone-800 text-base leading-relaxed font-serif">{lesson.explanation}</p>
            </div>
          </div>
        )}

        {/* Step 2: Practical Analogy */}
        {currentStep === 1 && (
          <div className="animate-fadeIn space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-100/80 border border-amber-300 rounded flex items-center justify-center text-amber-900">
                <FiCompass size={18} />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-amber-900 uppercase">Field Note 2 of 4 • Practical Analogy</p>
                <h3 className="text-lg font-bold text-stone-900">Real-World Connection</h3>
              </div>
            </div>
            <div className="bg-amber-50/60 border border-amber-200 rounded p-6 shadow-xs font-serif text-stone-800 text-base leading-relaxed">
              <p>{lesson.everydayExample}</p>
            </div>
          </div>
        )}

        {/* Step 3: Key Formula Tablet */}
        {currentStep === 2 && (
          <div className="animate-fadeIn space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-stone-100 border border-stone-300 rounded flex items-center justify-center text-stone-800">
                <FiTarget size={18} />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-amber-900 uppercase">Field Note 3 of 4 • Carved Formula Tablet</p>
                <h3 className="text-lg font-bold text-stone-900">Core Mathematical Formula</h3>
              </div>
            </div>
            <div className="bg-white rounded border border-stone-300 p-6 shadow-xs space-y-4">
              <p className="text-stone-900 text-base font-serif leading-relaxed">
                {lesson.keyConcept}
              </p>
              {lesson.formula && (
                <div className="bg-slate-900 text-emerald-400 p-4 rounded border border-slate-800 font-mono text-center shadow-xs">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Inscription Formula:</p>
                  <p className="text-lg font-extrabold tracking-wide">{lesson.formula}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Step Solution Breakdown */}
        {currentStep === 3 && (
          <div className="animate-fadeIn space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-stone-100 border border-stone-300 rounded flex items-center justify-center text-stone-800">
                <span className="text-lg">📜</span>
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-amber-900 uppercase">Field Note 4 of 4 • Worked Example</p>
                <h3 className="text-lg font-bold text-stone-900">Step-by-Step Problem Solution</h3>
              </div>
            </div>

            <div className="bg-white rounded border border-stone-300 p-6 shadow-xs space-y-4">
              <div className="bg-stone-100 border border-stone-300 p-4 rounded font-mono text-xs">
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Problem Statement:</p>
                <p className="text-stone-900 font-semibold">{lesson.workedExample.problem}</p>
              </div>

              <button
                onClick={() => setShowWorkedExample(!showWorkedExample)}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded font-mono font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                {showWorkedExample ? 'Hide Journal Solution' : 'Reveal Worked Solution Steps'}
              </button>

              {showWorkedExample && (
                <div className="space-y-2.5 pt-2 animate-fadeIn font-mono text-xs">
                  {lesson.workedExample.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 bg-stone-50 border border-stone-200 rounded p-3 text-stone-800">
                      <span className="w-6 h-6 bg-slate-900 text-white rounded flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <p className="pt-0.5 leading-relaxed">{step}</p>
                    </div>
                  ))}
                  <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded flex items-center justify-between">
                    <span className="font-bold text-emerald-900">Evaluated Result:</span>
                    <span className="font-extrabold text-emerald-950">{lesson.workedExample.answer}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-stone-300 font-mono text-xs">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded border border-stone-300 text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiArrowLeft size={14} /> Previous Note
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-xs transition-all ${
                  i === currentStep
                    ? 'bg-amber-600'
                    : i < currentStep
                    ? 'bg-amber-300'
                    : 'bg-stone-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-amber-700 hover:bg-amber-800 text-white font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <FiCheck size={14} /> Complete Field Note
              </>
            ) : (
              <>
                Next Note <FiArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
