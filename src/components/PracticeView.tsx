import { useState, useRef } from 'react';
import { FiArrowLeft, FiCheck, FiX, FiCamera, FiHelpCircle, FiArrowRight } from 'react-icons/fi';
import { PracticeQuestion } from '../data/curriculum';

interface PracticeViewProps {
  questions: PracticeQuestion[];
  skillId: string;
  onComplete: (questionId: string) => void;
  onBack: () => void;
  completedQuestions: string[];
}

export default function PracticeView({ questions, onComplete, onBack, completedQuestions }: PracticeViewProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const question = questions[currentQ];
  const isAlreadyCompleted = completedQuestions.includes(question.id);

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

    if (correct) {
      onComplete(question.id);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowResult(false);
      setShowHint(false);
      setShowExplanation(false);
      setCapturedImage(null);
    } else {
      onBack();
    }
  };

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setCapturedImage(imageData);
        // Simulate OCR processing - in production, this would use a real OCR API
        // The AI bot will analyze the image and extract the answer
        setUserAnswer('');
        
        // Simulate AI processing delay then provide feedback
        setTimeout(() => {
          setCapturedImage(null);
          // Show a message that the image was processed
          alert('📸 Image captured! In a full version, our AI would read your handwritten answer here. For now, please type your answer below.');
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft /> Back
          </button>
          <h2 className="text-lg font-bold text-gray-800">Practice Time</h2>
          <span className="text-sm text-gray-500">
            {currentQ + 1}/{questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
              Question {currentQ + 1}
            </span>
            {isAlreadyCompleted && (
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                ✓ Previously correct
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h3>

          {/* Multiple Choice */}
          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => !showResult && setSelectedOption(option)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedOption === option
                      ? showResult
                        ? option === question.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-purple-500 bg-purple-50'
                      : showResult && option === question.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedOption === option
                        ? showResult
                          ? option === question.correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-gray-700 font-medium">{option}</span>
                    {showResult && option === question.correctAnswer && (
                      <FiCheck className="ml-auto text-green-600" size={20} />
                    )}
                    {showResult && selectedOption === option && option !== question.correctAnswer && (
                      <FiX className="ml-auto text-red-600" size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Text Input */}
          {question.type === 'text' && (
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && userAnswer.trim() && !showResult && checkAnswer()}
                disabled={showResult}
                placeholder="Type your answer here..."
                className={`w-full p-4 rounded-xl border-2 text-lg focus:outline-none transition-all ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-purple-400'
                }`}
              />

              {/* Image Input Options */}
              <div className="flex gap-3">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors text-sm"
                >
                  <FiCamera size={16} /> Snap Answer
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors text-sm"
                >
                  📎 Upload Image
                </button>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageCapture}
                  className="hidden"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageCapture}
                  className="hidden"
                />
              </div>

              {/* Captured Image Preview */}
              {capturedImage && (
                <div className="relative rounded-xl overflow-hidden border-2 border-purple-300">
                  <img src={capturedImage} alt="Captured answer" className="w-full max-h-48 object-contain bg-gray-50" />
                  <div className="absolute inset-0 bg-purple-600/10 flex items-center justify-center">
                    <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                      🤖 AI Processing...
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hint Button */}
        {!showResult && !showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4 transition-colors"
          >
            <FiHelpCircle size={18} /> Need a hint?
          </button>
        )}

        {/* Hint */}
        {showHint && !showResult && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 animate-fadeIn">
            <p className="text-amber-800 text-sm">
              💡 <strong>Hint:</strong> {question.hint}
            </p>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className={`rounded-xl p-4 mb-4 animate-fadeIn ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <FiCheck className="text-green-600" size={20} />
                  <span className="font-bold text-green-700">Correct! 🎉</span>
                </>
              ) : (
                <>
                  <FiX className="text-red-600" size={20} />
                  <span className="font-bold text-red-700">Not quite right</span>
                </>
              )}
            </div>
            {!isCorrect && (
              <p className="text-gray-700 text-sm mb-2">
                The correct answer is: <strong>{question.correctAnswer}</strong>
              </p>
            )}
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 animate-fadeIn">
            <p className="text-blue-800 text-sm">
              📖 <strong>Explanation:</strong> {question.explanation}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={question.type === 'multiple-choice' ? !selectedOption : !userAnswer.trim()}
              className="ml-auto flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <FiCheck /> Check Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="ml-auto flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
            >
              {currentQ < questions.length - 1 ? (
                <>Next Question <FiArrowRight /></>
              ) : (
                <>Finish Practice <FiCheck /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
