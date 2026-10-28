import React, { useState, useRef } from 'react';
import { curriculum } from '../../src/data/curriculum';
import { FiCamera, FiCheck, FiX, FiHelpCircle, FiArrowRight, FiZap, FiZapOff } from 'react-icons/fi';

interface MobilePracticeViewProps {
  selectedUnitId: string;
  selectedSkillId: string;
  onCompleteQuestion: (skillId: string, questionId: string) => void;
  onBackToMap: () => void;
}

export const MobilePracticeView: React.FC<MobilePracticeViewProps> = ({
  selectedUnitId,
  selectedSkillId,
  onCompleteQuestion,
  onBackToMap,
}) => {
  const unit = curriculum.find(u => u.id === selectedUnitId) || curriculum[0];
  const skill = unit.skills.find(s => s.id === selectedSkillId) || unit.skills[0];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  const cameraRef = useRef<HTMLInputElement>(null);
  const question = skill.practice[currentQIndex];

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImage(event.target?.result as string);
        // Simulate AI photo extraction
        if (question.correctAnswer) {
          setUserAnswer(question.correctAnswer);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheck = () => {
    const normUser = userAnswer.trim().toLowerCase().replace(/\s+/g, '');
    const normCorrect = question.correctAnswer.trim().toLowerCase().replace(/\s+/g, '');

    const correct = normUser === normCorrect || normUser.includes(normCorrect);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      onCompleteQuestion(skill.id, question.id);
    }
  };

  const handleNext = () => {
    if (currentQIndex < skill.practice.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setUserAnswer('');
      setShowResult(false);
      setShowHint(false);
      setAttachedImage(null);
    } else {
      onBackToMap();
    }
  };

  return (
    <div className="space-y-4 pb-28 pt-2">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
            Mobile Practice Trial #{currentQIndex + 1}
          </span>
          <h2 className="text-sm font-bold">{skill.title}</h2>
        </div>
        <button
          onClick={onBackToMap}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded text-xs font-mono border border-amber-500/30"
        >
          Map View
        </button>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-4 shadow-xs font-mono text-xs">
        <div className="text-stone-900 font-bold leading-relaxed">
          {question.question}
        </div>

        {/* Input & Camera Button */}
        <div className="space-y-2">
          <label className="text-[10px] text-stone-500 font-bold uppercase block">Your Answer</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="Type answer or tap camera..."
              disabled={showResult}
              className="flex-1 px-3 py-2.5 border border-stone-300 rounded-lg text-xs bg-stone-50 text-stone-900 focus:outline-none focus:border-slate-900"
            />
            <button
              onClick={() => cameraRef.current?.click()}
              type="button"
              className="p-2.5 bg-amber-900 hover:bg-amber-800 text-amber-200 rounded-lg border border-amber-700 transition-colors shrink-0"
              title="Snap photo of work with mobile camera"
            >
              <FiCamera size={18} />
            </button>
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCameraCapture}
              className="hidden"
            />
          </div>

          {attachedImage && (
            <div className="bg-amber-50 border border-amber-300 rounded p-2 flex items-center gap-2">
              <img src={attachedImage} alt="Captured work" className="h-10 w-10 object-cover rounded border" />
              <span className="text-[10px] text-amber-950 font-bold">🤖 AI Extracted Answer from Photo</span>
            </div>
          )}
        </div>

        {/* Hint button */}
        {!showHint && !showResult && (
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-900 hover:underline"
          >
            <FiHelpCircle size={14} /> Request Explorer Hint
          </button>
        )}

        {showHint && (
          <div className="bg-amber-50 border border-amber-200 rounded p-3 text-[11px] text-amber-950 font-mono">
            <strong>Hint:</strong> {question.hint}
          </div>
        )}

        {/* Results Banner */}
        {showResult && (
          <div className={`p-3 rounded-lg border text-xs font-mono space-y-1 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-red-50 border-red-400 text-red-950'
          }`}>
            <div className="flex items-center justify-between font-bold">
              <div className="flex items-center gap-1">
                {isCorrect ? <FiCheck size={16} /> : <FiX size={16} />}
                <span>{isCorrect ? 'Correct Answer!' : 'Incorrect Solution'}</span>
              </div>
              {isCorrect && <span className="text-amber-800">+15 XP / +20 Stamina</span>}
            </div>
            {!isCorrect && (
              <div>Correct answer: <strong>{question.correctAnswer}</strong></div>
            )}
            <p className="text-[11px] text-stone-700 mt-1">{question.explanation}</p>
          </div>
        )}

        {/* Controls */}
        <div className="pt-2 flex justify-end">
          {!showResult ? (
            <button
              onClick={handleCheck}
              disabled={!userAnswer.trim()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs uppercase disabled:opacity-40"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs uppercase flex items-center gap-1"
            >
              <span>{currentQIndex < skill.practice.length - 1 ? 'Next Question' : 'Finish Practice'}</span>
              <FiArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
