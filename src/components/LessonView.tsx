import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck, FiBookOpen, FiStar, FiTarget } from 'react-icons/fi';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft /> Back
          </button>
          <h2 className="text-lg font-bold text-gray-800">{lesson.title}</h2>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                ✓ Completed
              </span>
            )}
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Step 1: Explanation */}
        {currentStep === 0 && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiBookOpen className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Step 1 of 4</p>
                <h3 className="text-xl font-bold text-gray-800">Understanding the Concept</h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-gray-700 text-lg leading-relaxed">{lesson.explanation}</p>
            </div>
          </div>
        )}

        {/* Step 2: Everyday Example */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FiStar className="text-amber-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-amber-600 font-medium">Step 2 of 4</p>
                <h3 className="text-xl font-bold text-gray-800">Real-Life Connection</h3>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-sm border border-amber-100">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💡</span>
                <p className="text-gray-700 text-lg leading-relaxed">{lesson.everydayExample}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Key Concept */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiTarget className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Step 3 of 4</p>
                <h3 className="text-xl font-bold text-gray-800">Key Takeaway</h3>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border border-green-100">
              <p className="text-gray-800 text-lg font-medium leading-relaxed mb-4">
                {lesson.keyConcept}
              </p>
              {lesson.formula && (
                <div className="bg-white rounded-xl p-4 border border-green-200 mt-4">
                  <p className="text-sm text-green-600 font-medium mb-1">Formula:</p>
                  <p className="text-xl font-mono text-gray-800">{lesson.formula}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Worked Example */}
        {currentStep === 3 && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Step 4 of 4</p>
                <h3 className="text-xl font-bold text-gray-800">Worked Example</h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="bg-purple-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-purple-600 font-medium mb-1">Problem:</p>
                <p className="text-lg font-medium text-gray-800">{lesson.workedExample.problem}</p>
              </div>

              <button
                onClick={() => setShowWorkedExample(!showWorkedExample)}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-indigo-600 transition-all mb-4"
              >
                {showWorkedExample ? 'Hide Solution' : 'Show Step-by-Step Solution'}
              </button>

              {showWorkedExample && (
                <div className="space-y-3 animate-fadeIn">
                  {lesson.workedExample.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                      <span className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-gray-700 pt-0.5">{step}</p>
                    </div>
                  ))}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                    <p className="text-sm text-green-600 font-medium mb-1">✅ Answer:</p>
                    <p className="text-lg font-bold text-gray-800">{lesson.workedExample.answer}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <FiArrowLeft /> Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentStep
                    ? 'bg-purple-600 scale-125'
                    : i < currentStep
                    ? 'bg-purple-300'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <FiCheck /> Complete Lesson
              </>
            ) : (
              <>
                Next <FiArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
