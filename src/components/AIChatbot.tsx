import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiSettings, FiCamera, FiImage, FiAlertCircle, FiZap } from 'react-icons/fi';
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
}

interface AIChatbotProps {
  currentTopic: string;
  currentUnit: string;
  config: AIConfig;
  isAIEnabled: boolean;
  onOpenSettings: () => void;
}

// Mock AI responses for when no real API is configured
const MOCK_RESPONSES: Record<string, string[]> = {
  'negative-numbers': [
    "Great question! Think of negative numbers like debt. If you owe $5, that's -5. When you square a debt (multiply it by itself), two negatives cancel out — like saying 'I don't not owe you' = you DO owe. So (-5)² = 25.",
    "Remember: parentheses are like a box. (-3)² means everything in the box gets squared. -3² means only 3 gets squared, then we make it negative. The box makes all the difference!",
  ],
  'fractions': [
    "Fractions are just division in disguise! 3/4 means '3 divided by 4'. When adding fractions, think of it like money — you need the same 'denomination' (common denominator) before you can add them.",
    "The LCD (Lowest Common Denominator) is like finding the smallest pizza size that lets you cut both fractions into equal slices. For 1/3 and 1/4, that's 12 slices.",
  ],
  'functions': [
    "Think of f(x) as a recipe. f(x) = 2x + 1 means 'take your number, double it, add 1.' f(3) means 'follow the recipe with 3': 2(3) + 1 = 7. That's all substitution is!",
    "Domain is like a bouncer at a club — some numbers aren't allowed in! Division by zero? Not allowed. Square root of negative? Not allowed.",
  ],
  'limits': [
    "A limit is like watching a car approach a stop sign. We don't care if it actually stops — we care about where it's HEADING. That destination is the limit.",
    "When you get 0/0, don't panic! It's not 'undefined' — it's 'try harder.' Factor, cancel the common piece, then try plugging in again.",
  ],
  'probability': [
    "Probability is just counting! How many 'good' outcomes divided by total outcomes. If 3 out of 10 marbles are red, P(red) = 3/10. That's it!",
    "AND means multiply (both must happen). OR means add (either can happen). But for OR, subtract the overlap so you don't double-count!",
  ],
  'statistics': [
    "Mean = fair share (if everyone pooled and split equally). Median = the middle person. Mode = the most popular. Each tells a different story!",
    "Standard deviation measures consistency. Low SD = everyone scored similarly. High SD = huge variation.",
  ],
  'calculus': [
    "The power rule is your best friend: bring the exponent down, reduce by 1. x⁵ → 5x⁴. That's it! Practice until it's automatic.",
    "Integration is UNDOING differentiation. Power rule backwards: add 1 to power, divide by new power. x³ → x⁴/4. Don't forget +C!",
  ],
  'vectors': [
    "Vectors are arrows with length and direction. The dot product tells you how 'aligned' two arrows are. Same direction = big positive. Perpendicular = zero.",
    "For magnitude: it's just Pythagoras in 3D! |v| = √(x² + y² + z²). Like finding the diagonal of a box.",
  ],
  'laplace': [
    "Laplace transforms are a translation tool. You translate a hard differential equation into easy algebra, solve it, then translate back!",
    "Memorize these 3: L{1} = 1/s, L{t} = 1/s², L{eᵃᵗ} = 1/(s-a). These three solve 80% of exam questions!",
  ],
  'default': [
    "I'm here to help you understand math! Connect a real AI model in Settings for personalized, intelligent responses. For now, I can give you general tips! 📚",
    "💡 Tip: Connect an AI model in Settings (⚙️) to get personalized help with your specific questions. Free options are available through HuggingFace and OpenRouter!",
    "Math is just patterns and recipes. Every formula has a story behind it. Connect a real AI in Settings for detailed explanations! 🎯",
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
  else if (lowerMsg.includes('mean') || lowerMsg.includes('median') || lowerMsg.includes('standard deviation')) topicKey = 'statistics';
  else if (lowerMsg.includes('derivative') || lowerMsg.includes('integral') || lowerMsg.includes('power rule')) topicKey = 'calculus';
  else if (lowerMsg.includes('vector') || lowerMsg.includes('dot product')) topicKey = 'vectors';
  else if (lowerMsg.includes('laplace') || lowerMsg.includes('transform')) topicKey = 'laplace';

  if (topicKey === 'default' && currentTopic) {
    if (currentTopic.includes('Negative')) topicKey = 'negative-numbers';
    else if (currentTopic.includes('Fraction')) topicKey = 'fractions';
    else if (currentTopic.includes('Function') || currentTopic.includes('Domain')) topicKey = 'functions';
    else if (currentTopic.includes('Limit') || currentTopic.includes('Continuity')) topicKey = 'limits';
    else if (currentTopic.includes('Probability') || currentTopic.includes('Chance')) topicKey = 'probability';
    else if (currentTopic.includes('Data') || currentTopic.includes('Statistics')) topicKey = 'statistics';
    else if (currentTopic.includes('Calculus') || currentTopic.includes('Derivative') || currentTopic.includes('Integration')) topicKey = 'calculus';
    else if (currentTopic.includes('Vector') || currentTopic.includes('Engineering')) topicKey = 'vectors';
    else if (currentTopic.includes('Laplace')) topicKey = 'laplace';
  }

  const responses = MOCK_RESPONSES[topicKey] || MOCK_RESPONSES['default'];
  return responses[Math.floor(Math.random() * responses.length)];
}

export default function AIChatbot({ currentTopic, currentUnit, config, isAIEnabled, onOpenSettings }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: isAIEnabled
        ? `Hi! 👋 I'm your Math Buddy AI, powered by ${PROVIDER_INFO[config.provider].name}. I can read images of your math work too! What would you like help with?`
        : `Hi! 👋 I'm your Math Buddy. Connect a real AI model in Settings (⚙️) for personalized help! I support vision models that can read your handwritten math. What topic are you working on?`,
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

  // Update welcome message when AI config changes
  useEffect(() => {
    if (isAIEnabled) {
      setMessages(prev => [
        prev[0],
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `🤖 Real AI connected! I'm now powered by **${PROVIDER_INFO[config.provider].name}** (${config.modelId}). I can understand images of your math work — just snap a photo or upload an image!`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isAIEnabled]);

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 4MB for most APIs)
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
    // Reset input so same file can be selected again
    e.target.value = '';
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

    // Add loading message
    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: loadingId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    }]);

    if (isAIEnabled) {
      // Real AI call
      try {
        // Build message content
        let content: string | ReturnType<typeof createImageMessage>;
        
        if (currentImage) {
          const textPart = currentInput
            ? `Student's question: "${currentInput}"\n\nThey also attached this image of their math work. Please analyze it and help them:\n- Read what's written in the image\n- Check if the work is correct\n- Point out any errors with explanations\n- Suggest corrections using everyday examples`
            : `The student sent this image of their math work. Please:\n- Read what's written in the image\n- Check if the work is correct\n- Point out any errors with clear explanations\n- Use everyday examples to explain concepts\n- Be encouraging and patient`;
          content = createImageMessage(textPart, currentImage);
        } else {
          content = currentInput;
        }

        // Build conversation history (last 10 messages for context)
        const history = messages
          .filter(m => !m.isLoading && !m.error)
          .slice(-10)
          .map(m => ({
            role: m.role as 'user' | 'assistant',
            content: m.imageData
              ? createImageMessage(m.content, m.imageData)
              : m.content,
          }));

        const response = await callAI(config, [
          ...history,
          { role: 'user' as const, content },
        ]);

        setMessages(prev => prev.map(m =>
          m.id === loadingId
            ? { ...m, content: response.content, isLoading: false, error: response.error }
            : m
        ));
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Failed to get response';
        setMessages(prev => prev.map(m =>
          m.id === loadingId
            ? { ...m, content: '', isLoading: false, error: errorMsg }
            : m
        ));
      }
    } else {
      // Mock AI response
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
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
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
                      {PROVIDER_INFO[config.provider].name} • {config.modelId.split('/').pop()?.split('-').slice(0, 2).join(' ')}
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block" />
                      Mock mode — connect real AI in settings
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenSettings}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="AI Settings"
              >
                <FiSettings size={18} />
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
                  {/* Image preview */}
                  {msg.imageData && (
                    <div className="p-2">
                      <img
                        src={msg.imageData}
                        alt="Attached"
                        className="max-h-40 rounded-xl object-contain bg-white"
                      />
                    </div>
                  )}
                  {/* Text content */}
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
                          <button
                            onClick={onOpenSettings}
                            className="text-xs text-purple-600 underline mt-1"
                          >
                            Check settings
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
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
                <img
                  src={attachedImage}
                  alt="To send"
                  className="h-20 rounded-lg border-2 border-purple-300 object-contain"
                />
                <button
                  onClick={() => setAttachedImage(null)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200">
            {!isAIEnabled && (
              <div className="mb-2 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <FiZap className="text-amber-500 flex-shrink-0" size={14} />
                <p className="text-xs text-amber-700">
                  Connect a real AI for smart responses & image reading.
                  <button onClick={onOpenSettings} className="underline font-medium ml-1">
                    Set up now
                  </button>
                </p>
              </div>
            )}
            <div className="flex gap-2 items-end">
              {/* Image buttons */}
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
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageAttach}
                className="hidden"
              />
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageAttach}
                className="hidden"
              />

              {/* Text input */}
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={isAIEnabled ? "Ask anything or send an image..." : "Ask me anything..."}
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
