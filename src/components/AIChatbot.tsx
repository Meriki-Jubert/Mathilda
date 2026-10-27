import { useState, useRef, useEffect } from 'react';
import { FiX, FiSend, FiSettings, FiCamera, FiImage, FiAlertCircle, FiZap, FiBarChart2 } from 'react-icons/fi';
import { AIConfig, PROVIDER_INFO } from '../services/aiModels';
import { callAI, createImageMessage } from '../services/aiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageData?: string;
  timestamp: Date;
  isLoading?: boolean;
  error?: string;
  extractedAnswer?: string;
}

interface AIChatbotProps {
  currentTopic: string;
  currentUnit: string;
  currentSkillId?: string;
  currentQuestion?: string;
  config: AIConfig;
  isAIEnabled: boolean;
  aiContext: string;
  onOpenSettings: () => void;
  onOpenReport: () => void;
  onImageAnswerExtracted?: (answer: string) => void;
  onChatLogged?: (message: string, hadImage: boolean) => void;
  isInPracticeMode: boolean;
}

const MOCK_RESPONSES: Record<string, string[]> = {
  'negative-numbers': [
    "Think of negative numbers like debt. If you owe $5, that's -5. When you square a debt, two negatives cancel out. So (-5)² = 25.",
    "Parentheses are like a box. (-3)² means everything in the box gets squared. -3² means only 3 gets squared, then negated.",
  ],
  'fractions': [
    "Fractions are just division in disguise! When adding fractions, you need the same 'denomination' (common denominator).",
    "The LCD is like finding the smallest pizza size that lets you cut both fractions into equal slices.",
  ],
  'functions': [
    "Think of f(x) as a recipe. f(x) = 2x + 1 means 'take your number, double it, add 1.' f(3) = 7!",
    "Domain is like a bouncer at a club — some numbers aren't allowed in!",
  ],
  'limits': [
    "A limit is like watching a car approach a stop sign. We care about where it's HEADING.",
    "When you get 0/0, don't panic! Factor, cancel, then try again.",
  ],
  'probability': [
    "Probability is just counting! Good outcomes / total outcomes.",
    "AND = multiply. OR = add (subtract overlap).",
  ],
  'statistics': [
    "Mean = fair share. Median = middle person. Mode = most popular.",
    "Standard deviation measures consistency.",
  ],
  'calculus': [
    "Power rule: bring the exponent down, reduce by 1. x⁵ → 5x⁴.",
    "Integration is UNDOING differentiation. Add 1 to power, divide by new power.",
  ],
  'vectors': [
    "Vectors are arrows with length and direction. Dot product = how aligned they are.",
    "Magnitude: Pythagoras in 3D! |v| = √(x² + y² + z²).",
  ],
  'laplace': [
    "Laplace transforms translate hard DEs into easy algebra!",
    "Memorize: L{1} = 1/s, L{t} = 1/s², L{eᵃᵗ} = 1/(s-a).",
  ],
  'default': [
    "I'm here to help! Connect a real AI in Settings for personalized responses. 📚",
    "💡 Connect an AI model in Settings (⚙️) for smart help with your specific questions!",
  ],
};

function getMockResponse(message: string, currentTopic: string): string {
  const lowerMsg = message.toLowerCase();
  let topicKey = 'default';
  if (lowerMsg.includes('negative') || lowerMsg.includes('(-')) topicKey = 'negative-numbers';
  else if (lowerMsg.includes('fraction') || lowerMsg.includes('denominator')) topicKey = 'fractions';
  else if (lowerMsg.includes('function') || lowerMsg.includes('domain')) topicKey = 'functions';
  else if (lowerMsg.includes('limit') || lowerMsg.includes('approach')) topicKey = 'limits';
  else if (lowerMsg.includes('probability') || lowerMsg.includes('chance')) topicKey = 'probability';
  else if (lowerMsg.includes('mean') || lowerMsg.includes('median')) topicKey = 'statistics';
  else if (lowerMsg.includes('derivative') || lowerMsg.includes('integral')) topicKey = 'calculus';
  else if (lowerMsg.includes('vector') || lowerMsg.includes('dot product')) topicKey = 'vectors';
  else if (lowerMsg.includes('laplace') || lowerMsg.includes('transform')) topicKey = 'laplace';

  if (topicKey === 'default' && currentTopic) {
    if (currentTopic.includes('Negative')) topicKey = 'negative-numbers';
    else if (currentTopic.includes('Fraction')) topicKey = 'fractions';
    else if (currentTopic.includes('Function') || currentTopic.includes('Domain')) topicKey = 'functions';
    else if (currentTopic.includes('Limit') || currentTopic.includes('Continuity')) topicKey = 'limits';
    else if (currentTopic.includes('Probability') || currentTopic.includes('Chance')) topicKey = 'probability';
    else if (currentTopic.includes('Data') || currentTopic.includes('Statistics')) topicKey = 'statistics';
    else if (currentTopic.includes('Calculus') || currentTopic.includes('Derivative')) topicKey = 'calculus';
    else if (currentTopic.includes('Vector') || currentTopic.includes('Engineering')) topicKey = 'vectors';
    else if (currentTopic.includes('Laplace')) topicKey = 'laplace';
  }
  const responses = MOCK_RESPONSES[topicKey] || MOCK_RESPONSES['default'];
  return responses[Math.floor(Math.random() * responses.length)];
}

export default function AIChatbot({
  currentTopic,
  currentUnit,
  currentQuestion,
  config,
  isAIEnabled,
  aiContext,
  onOpenSettings,
  onOpenReport,
  onImageAnswerExtracted,
  onChatLogged,
  isInPracticeMode,
}: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: isAIEnabled
        ? `Hi! 👋 I'm your Math Buddy AI, powered by ${PROVIDER_INFO[config.provider].name}. I can read photos of your handwritten work and step-check your solutions! What do you need help with?`
        : `Hi! 👋 I'm your Math Buddy. Connect a real AI in Settings (⚙️) for smart step assistance & vision reading! What topic are you working on?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('Image size exceeds 4MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const extractAnswerFromResponse = (response: string): string | null => {
    const match = response.match(/\[ANSWER:\s*(.*?)\]/i);
    return match ? match[1].trim() : null;
  };

  const handleSend = async () => {
    if (!input.trim() && !attachedImage) return;
    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input || '(attached photo)',
      imageData: attachedImage || undefined,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    const currentImage = attachedImage;
    setInput('');
    setAttachedImage(null);
    setIsLoading(true);

    onChatLogged?.(currentInput || '(image)', !!currentImage);

    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: loadingId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    }]);

    if (isAIEnabled) {
      try {
        let content: string | ReturnType<typeof createImageMessage>;
        
        if (currentImage) {
          let promptText = '';
          
          if (isInPracticeMode && currentQuestion) {
            promptText = `The student is working on this question: "${currentQuestion}"

They sent an image of their handwritten work/answer. Please:
1. Carefully read what is written in the image
2. Extract the final answer they arrived at
3. Check if their work and answer are correct
4. If correct, respond with: [ANSWER: the_extracted_answer] followed by encouragement
5. If incorrect, explain what went wrong and provide the correct answer as: [ANSWER: correct_answer]

Be specific about what you read in the image. Format math clearly.`;
          } else {
            promptText = `The student sent an image of their math work. Please:
- Read what's written in the image carefully
- Check if the work is correct
- Point out any errors with clear explanations
- Use everyday examples to explain concepts
- Be encouraging and patient`;
            if (currentInput) {
              promptText += `\n\nThe student also says: "${currentInput}"`;
            }
          }
          content = createImageMessage(promptText, currentImage);
        } else {
          content = currentInput;
        }

        const history = messages
          .filter(m => !m.isLoading && !m.error)
          .slice(-10)
          .map(m => ({
            role: m.role as 'user' | 'assistant',
            content: m.role === 'assistant' && m.extractedAnswer
              ? m.content + `\n\n[Extracted answer for student: ${m.extractedAnswer}]`
              : m.content,
          }));

        const contextMessage = {
          role: 'user' as const,
          content: `[System: Context about student]${aiContext}`,
        };

        const response = await callAI(config, [
          contextMessage,
          ...history,
          { role: 'user' as const, content },
        ]);

        const extractedAnswer = extractAnswerFromResponse(response.content);
        const displayContent = response.content.replace(/\[ANSWER:\s*.*?\]/i, '').trim();

        setMessages(prev => prev.map(m =>
          m.id === loadingId
            ? {
                ...m,
                content: displayContent || response.content,
                isLoading: false,
                error: response.error,
                extractedAnswer: extractedAnswer || undefined,
              }
            : m
        ));

        if (extractedAnswer && isInPracticeMode && onImageAnswerExtracted) {
          onImageAnswerExtracted(extractedAnswer);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Failed to retrieve response';
        setMessages(prev => prev.map(m =>
          m.id === loadingId
            ? { ...m, content: '', isLoading: false, error: errorMsg }
            : m
        ));
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 600));
      const response = getMockResponse(currentInput, currentTopic);
      setMessages(prev => prev.map(m =>
        m.id === loadingId
          ? { ...m, content: response, isLoading: false }
          : m
      ));
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-slate-800 text-white p-3.5 rounded border border-slate-700 shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center font-mono text-xs font-bold"
        title="Open AI Math Assistant"
      >
        {isOpen ? <FiX size={20} /> : (
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <span className="hidden sm:inline">AI Tutor</span>
            {isInPracticeMode && (
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            )}
          </div>
        )}
      </button>

      {/* Floating Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-6rem)] bg-white rounded border border-slate-300 shadow-2xl flex flex-col overflow-hidden font-sans text-slate-900">
          {/* Header */}
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-base shrink-0">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-white">Math Buddy AI Tutor</h3>
                <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                  {isAIEnabled ? (
                    <>
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                      {PROVIDER_INFO[config.provider].name}
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block" />
                      Offline Mode
                    </>
                  )}
                  {isInPracticeMode && (
                    <span className="ml-1 bg-slate-800 text-emerald-400 border border-slate-700 px-1 py-0.2 rounded text-[9px] uppercase">Practice Active</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onOpenReport}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="Weekly Progress Analytics"
              >
                <FiBarChart2 size={16} />
              </button>
              <button
                onClick={onOpenSettings}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="AI Settings"
              >
                <FiSettings size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="Close chat"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>

          {/* Current Topic Sub-bar */}
          {(currentTopic || currentUnit) && (
            <div className="px-3.5 py-1.5 bg-slate-100 border-b border-slate-200 text-[11px] font-mono text-slate-700 shrink-0">
              <span className="font-bold text-slate-900">Context:</span>{' '}
              {currentUnit && <span>{currentUnit} / </span>}
              {currentTopic && <span className="font-semibold text-emerald-800">{currentTopic}</span>}
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded p-3 border font-sans text-xs ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white border-slate-800'
                      : 'bg-white text-slate-900 border-slate-200 shadow-xs'
                  }`}
                >
                  {msg.imageData && (
                    <div className="mb-2">
                      <img
                        src={msg.imageData}
                        alt="Attached work"
                        className="max-h-36 rounded border border-slate-300 object-contain bg-slate-100"
                      />
                    </div>
                  )}
                  <div>
                    {msg.isLoading ? (
                      <div className="flex items-center gap-2 font-mono text-slate-500">
                        <span className="animate-pulse font-bold text-emerald-700">Evaluating work...</span>
                      </div>
                    ) : msg.error ? (
                      <div className="flex items-start gap-2">
                        <FiAlertCircle className="text-red-600 shrink-0 mt-0.5" size={14} />
                        <div>
                          <p className="text-red-950 font-bold">API Connection Failure</p>
                          <p className="text-red-800 text-[11px] font-mono mt-0.5">{msg.error}</p>
                          <button onClick={onOpenSettings} className="text-[11px] text-emerald-800 font-mono font-bold underline mt-1 block">
                            Configure API key in settings →
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        {msg.extractedAnswer && isInPracticeMode && (
                          <div className="mt-2 bg-emerald-50 border border-emerald-300 rounded p-2 text-[11px] font-mono text-emerald-950">
                            ✓ Extracted Answer: <strong>{msg.extractedAnswer}</strong>
                            <br />
                            <span className="text-emerald-800">Auto-filled in input field!</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Image Attachment Preview */}
          {attachedImage && (
            <div className="px-3.5 py-2 bg-white border-t border-slate-200 shrink-0">
              <div className="relative inline-block">
                <img src={attachedImage} alt="Attachment" className="h-16 rounded border border-slate-300 object-contain" />
                <button
                  onClick={() => setAttachedImage(null)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white rounded flex items-center justify-center text-[10px] font-bold"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Input Controls */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0 space-y-2">
            {!isAIEnabled && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 rounded px-2.5 py-1.5 text-[11px]">
                <FiZap className="text-amber-700 shrink-0" size={12} />
                <p className="text-amber-950 font-mono">
                  Offline mode active. <button onClick={onOpenSettings} className="underline font-bold text-emerald-800">Add API key</button> to read photos & full tutoring.
                </p>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <div className="flex gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                  title="Capture photo of work"
                >
                  <FiCamera size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                  title="Attach photo"
                >
                  <FiImage size={16} />
                </button>
              </div>
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleImageAttach} className="hidden" />
              <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageAttach} className="hidden" />

              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={isInPracticeMode ? "Ask or snap your answer..." : "Ask math questions..."}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-slate-900 text-slate-900"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && !attachedImage)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
