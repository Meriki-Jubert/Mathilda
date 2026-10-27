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
  currentSkillId,
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
        ? `Hi! 👋 I'm your Math Buddy AI, powered by ${PROVIDER_INFO[config.provider].name}. I can read images of your work and help fill in answers! What do you need?`
        : `Hi! 👋 I'm your Math Buddy. Connect a real AI in Settings (⚙️) for smart help & image reading! What topic are you working on?`,
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
        alert('Image too large! Please use an image under 4MB.');
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

  // Extract answer from AI response (looks for [ANSWER:...] pattern)
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
      content: input || '(sent an image)',
      imageData: attachedImage || undefined,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    const currentImage = attachedImage;
    setInput('');
    setAttachedImage(null);
    setIsLoading(true);

    // Log the chat
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
            // Practice mode: extract answer from image
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

        // Build conversation history with context
        const history = messages
          .filter(m => !m.isLoading && !m.error)
          .slice(-10)
          .map(m => ({
            role: m.role as 'user' | 'assistant',
            content: m.role === 'assistant' && m.extractedAnswer
              ? m.content + `\n\n[Extracted answer for student: ${m.extractedAnswer}]`
              : m.content,
          }));

        // Prepend AI context about the student
        const contextMessage = {
          role: 'user' as const,
          content: `[System: This is context about the student - do NOT respond to this, just use it for future responses]${aiContext}`,
        };

        const response = await callAI(config, [
          contextMessage,
          ...history,
          { role: 'user' as const, content },
        ]);

        // Check if response contains an extracted answer
        const extractedAnswer = extractAnswerFromResponse(response.content);
        // Clean the displayed content (remove the [ANSWER:...] tag)
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

        // If we extracted an answer and we're in practice mode, fill the answer box
        if (extractedAnswer && isInPracticeMode && onImageAnswerExtracted) {
          onImageAnswerExtracted(extractedAnswer);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Failed to get response';
        setMessages(prev => prev.map(m =>
          m.id === loadingId
            ? { ...m, content: '', isLoading: false, error: errorMsg }
            : m
        ));
      }
    } else {
      // Mock AI
      await new Promise(resolve => setTimeout(resolve, 800));
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
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <FiX size={24} /> : (
          <div className="relative">
            <span className="text-2xl">🤖</span>
            {isInPracticeMode && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-purple-600" />
            )}
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold">Math Buddy AI</h3>
                <p className="text-xs text-purple-200 flex items-center gap-1">
                  {isAIEnabled ? (
                    <>
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                      {PROVIDER_INFO[config.provider].name}
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block" />
                      Mock mode
                    </>
                  )}
                  {isInPracticeMode && (
                    <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-[10px]">Practice</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenReport}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Weekly Report"
              >
                <FiBarChart2 size={16} />
              </button>
              <button
                onClick={onOpenSettings}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="AI Settings"
              >
                <FiSettings size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Close chat"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Context Banner */}
          {(currentTopic || currentUnit) && (
            <div className="px-4 py-2 bg-purple-50 border-b border-purple-100 text-xs text-purple-700">
              <span className="font-medium">📍 Current context:</span>{' '}
              {currentUnit && <span>{currentUnit} → </span>}
              {currentTopic && <span className="font-medium">{currentTopic}</span>}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl overflow-hidden ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  {msg.imageData && (
                    <div className="p-2">
                      <img
                        src={msg.imageData}
                        alt="Attached"
                        className="max-h-40 rounded-xl object-contain bg-white"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    {msg.isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-xs text-gray-500">Thinking...</span>
                      </div>
                    ) : msg.error ? (
                      <div className="flex items-start gap-2">
                        <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
                        <div>
                          <p className="text-red-600 text-sm font-medium">Error</p>
                          <p className="text-red-500 text-xs">{msg.error}</p>
                          <button onClick={onOpenSettings} className="text-xs text-purple-600 underline mt-1">
                            Check settings
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        {msg.extractedAnswer && isInPracticeMode && (
                          <div className="mt-2 bg-green-100 border border-green-300 rounded-lg p-2 text-xs text-green-800">
                            ✅ Answer extracted: <strong>{msg.extractedAnswer}</strong>
                            <br />
                            <span className="text-green-600">→ Filled in the answer box above!</span>
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

          {/* Image Preview */}
          {attachedImage && (
            <div className="px-3 pb-2">
              <div className="relative inline-block">
                <img src={attachedImage} alt="To send" className="h-20 rounded-lg border-2 border-purple-300 object-contain" />
                <button
                  onClick={() => setAttachedImage(null)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
              {isInPracticeMode && (
                <p className="text-xs text-purple-600 mt-1">📸 AI will read this and fill your answer box!</p>
              )}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200">
            {!isAIEnabled && (
              <div className="mb-2 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <FiZap className="text-amber-500 flex-shrink-0" size={14} />
                <p className="text-xs text-amber-700">
                  Connect a real AI for smart responses & image reading.
                  <button onClick={onOpenSettings} className="underline font-medium ml-1">Set up</button>
                </p>
              </div>
            )}
            <div className="flex gap-2 items-end">
              <div className="flex gap-1">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Take photo"
                >
                  <FiCamera size={18} />
                </button>
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Upload image"
                >
                  <FiImage size={18} />
                </button>
              </div>
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleImageAttach} className="hidden" />
              <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageAttach} className="hidden" />

              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={isInPracticeMode ? "Ask or snap your answer..." : "Ask anything..."}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && !attachedImage)}
                className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
