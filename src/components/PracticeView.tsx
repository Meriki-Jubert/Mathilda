import { useState, useEffect } from 'react';
import { FiArrowLeft, FiCheck, FiX, FiHelpCircle, FiArrowRight, FiMessageCircle, FiZap } from 'react-icons/fi';
import { PracticeQuestion } from '../data/curriculum';

interface PracticeViewProps {
  questions: PracticeQuestion[];
  skillId: string;
  onComplete: (questionId: string, isCorrect: boolean, userAnswer: string, hintUsed: boolean) => void;
  onBack: () => void;
  completedQuestions: string[];
  injectedAnswer?: string | null;
  onAnswerConsumed?: () => void;
}

export default function PracticeView({
  questions,
  onComplete,
  onBack,
  completedQuestions,
  injectedAnswer,
  onAnswerConsumed,
}: PracticeViewProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAnswerFlash, setShowAnswerFlash] = useState(false);

  const question = questions[currentQ];
  const isAlreadyCompleted = completedQuestions.includes(question.id);

  // Handle AI-injected answer
  useEffect(() => {
    if (injectedAnswer && question.type === 'text' && !showResult) {
      setUserAnswer(injectedAnswer);
      setShowAnswerFlash(true);
      setTimeout(() => setShowAnswerFlash(false), 2000);
      onAnswerConsumed?.();
    }
  }, [injectedAnswer]);

  const normalizeAnswer = (answer: string) => {
    return answer
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/\*/g, '')
      .replace(/\^/g, '')
      .replace(/×/g, '')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/⁰/g, '0')
      .replace(/¹/g, '1')
      .replace(/²/g, '2')
      .replace(/³/g, '3')
      .replace(/⁴/g, '4')
      .replace(/⁵/g, '5')
      .replace(/⁶/g, '6')
      .replace(/⁷/g, '7')
      .replace(/⁸/g, '8')
      .replace(/⁹/g, '9')
      .replace(/ᵗ/g, 't')
      .replace(/\(/g, '')
      .replace(/\)/g, '');
  };

  const checkAnswer = () => {
    let answer = '';
    if (question.type === 'multiple-choice') {
      answer = selectedOption || '';
    } else {
      answer = userAnswer;
    }

    const correct = normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer) ||
      answer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    
    setIsCorrect(correct);
    setShowResult(true);
    setShowExplanation(true);

    onComplete(question.id, correct, answer, showHint);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowResult(false);
      setShowHint(false);
      setShowExplanation(false);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-slate-100 border-b border-amber-900/40 sticky top-12 z-20 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-amber-300 hover:text-white transition-colors"
          >
            <FiArrowLeft size={14} /> Back to Trailhead
          </button>
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase font-bold text-amber-300 block">Jungle Practice Trial</span>
            <h2 className="text-sm font-bold tracking-tight text-white">Knowledge Discovery Trial</h2>
          </div>
          <span className="text-xs font-mono font-bold bg-amber-950 border border-amber-600/40 text-amber-300 px-2.5 py-1 rounded">
            Trial {currentQ + 1} / {questions.length}
          </span>
        </div>
        <div className="h-1 bg-slate-800">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Trial Workspace */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {/* Question Container Card */}
        <div className={`bg-white rounded border p-6 shadow-xs transition-all duration-300 ${
          showAnswerFlash ? 'border-amber-500 ring-2 ring-amber-200' : 'border-stone-300'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
            <span className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider bg-stone-100 border border-stone-300 px-2.5 py-0.5 rounded">
              Trial Challenge #{currentQ + 1}
            </span>
            {isAlreadyCompleted && (
              <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded">
                ✓ Previously Solved
              </span>
            )}
            {showAnswerFlash && (
              <span className="text-xs font-mono font-bold text-amber-950 bg-amber-200 border border-amber-400 px-2.5 py-0.5 rounded animate-pulse">
                🤖 AI Auto-Filled Answer
              </span>
            )}
          </div>

          <h3 className="text-base font-bold font-mono text-stone-900 leading-relaxed mb-6">
            {question.question}
          </h3>

          {/* Multiple Choice Options */}
          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-2.5 font-mono text-xs">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => !showResult && setSelectedOption(option)}
                  disabled={showResult}
                  className={`w-full text-left p-3.5 rounded border transition-all flex items-center justify-between ${
                    selectedOption === option
                      ? showResult
                        ? option === question.correctAnswer
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-red-600 bg-red-50 text-red-950 font-bold'
                        : 'border-slate-900 bg-slate-100 text-slate-900 font-bold'
                      : showResult && option === question.correctAnswer
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-stone-300 bg-white text-stone-800 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded border flex items-center justify-center text-xs font-bold shrink-0 ${
                      selectedOption === option
                        ? showResult
                          ? option === question.correctAnswer
                            ? 'bg-emerald-700 border-emerald-800 text-white'
                            : 'bg-red-700 border-red-800 text-white'
                          : 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-stone-100 border-stone-300 text-stone-700'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {showResult && option === question.correctAnswer && (
                    <FiCheck className="text-emerald-800" size={18} />
                  )}
                  {showResult && selectedOption === option && option !== question.correctAnswer && (
                    <FiX className="text-red-700" size={18} />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Text Input */}
          {question.type === 'text' && (
            <div className="space-y-3 font-mono">
              <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && userAnswer.trim() && !showResult && checkAnswer()}
                disabled={showResult}
                placeholder="Enter numerical answer or algebraic expression..."
                className={`w-full p-3.5 rounded border text-xs focus:outline-none transition-all ${
                  showAnswerFlash
                    ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200 text-stone-900 font-bold'
                    : showResult
                    ? isCorrect
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-red-600 bg-red-50 text-red-950 font-bold'
                    : 'border-stone-300 bg-white text-stone-900 focus:border-slate-900'
                }`}
              />
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <p>💡 Snap photo of handwritten work → send to AI (🤖) → auto-fills answer!</p>
                <div className="flex items-center gap-1 font-bold text-emerald-800">
                  <FiMessageCircle size={12} />
                  <span>AI Assistant Ready</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hint Request */}
        {!showResult && !showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-900 bg-amber-50 border border-amber-300 px-3 py-1.5 rounded transition-colors"
          >
            <FiHelpCircle size={14} /> Request Explorer Hint
          </button>
        )}

        {/* Hint Box */}
        {showHint && !showResult && (
          <div className="bg-amber-50 border border-amber-300 rounded p-4 text-xs text-amber-950 font-mono animate-fadeIn">
            <strong>Explorer Hint:</strong> {question.hint}
          </div>
        )}

        {/* Result Banner with Stamina & Fruit Reward */}
        {showResult && (
          <div className={`rounded border p-4 animate-fadeIn font-mono text-xs ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-red-50 border-red-400 text-red-950'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <FiCheck className="text-emerald-800" size={18} />
                    <span className="font-extrabold text-sm text-emerald-950">Trial Challenge Solved! ✓</span>
                  </>
                ) : (
                  <>
                    <FiX className="text-red-700" size={18} />
                    <span className="font-extrabold text-sm text-red-950">Incorrect Solution</span>
                  </>
                )}
              </div>
              {isCorrect && (
                <span className="bg-amber-200 border border-amber-400 text-amber-950 font-bold px-2.5 py-0.5 rounded flex items-center gap-1">
                  <FiZap size={12} /> +20 Stamina
                </span>
              )}
            </div>
            {!isCorrect && (
              <p className="mt-1">
                Expected Answer: <strong className="text-stone-900">{question.correctAnswer}</strong>
              </p>
            )}
          </div>
        )}

        {/* Step Explanation Card */}
        {showExplanation && (
          <div className="bg-stone-100 border border-stone-300 rounded p-4 text-xs text-stone-800 space-y-1.5 animate-fadeIn font-mono">
            <div><strong>Solution Explanation:</strong></div>
            <p className="leading-relaxed">{question.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-300 font-mono text-xs">
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={question.type === 'multiple-choice' ? !selectedOption : !userAnswer.trim()}
              className="ml-auto flex items-center gap-1.5 px-5 py-2.5 rounded bg-amber-700 hover:bg-amber-800 text-white font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
            >
              <FiCheck size={14} /> Submit Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="ml-auto flex items-center gap-1.5 px-5 py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              {currentQ < questions.length - 1 ? (
                <>Next Trial Challenge <FiArrowRight size={14} /></>
              ) : (
                <>Finish Trial & Harvest Fruit <FiCheck size={14} /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
