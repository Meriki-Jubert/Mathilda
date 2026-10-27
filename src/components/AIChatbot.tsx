import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatbotProps {
  currentTopic: string;
  currentUnit: string;
}

const AI_RESPONSES: Record<string, string[]> = {
  'negative-numbers': [
    "Great question! Think of negative numbers like debt. If you owe $5, that's -5. When you square a debt (multiply it by itself), two negatives cancel out — like saying 'I don't not owe you' = you DO owe. So (-5)² = 25.",
    "Remember: parentheses are like a box. (-3)² means everything in the box gets squared. -3² means only 3 gets squared, then we make it negative. The box makes all the difference!",
    "A common trick: count the negative signs. (-3)² has TWO negatives (inside the parentheses, multiplied twice) → positive result. -3² has ONE negative → stays negative."
  ],
  'fractions': [
    "Fractions are just division in disguise! 3/4 means '3 divided by 4'. When adding fractions, think of it like money — you need the same 'denomination' (common denominator) before you can add them.",
    "The LCD (Lowest Common Denominator) is like finding the smallest pizza size that lets you cut both fractions into equal slices. For 1/3 and 1/4, that's 12 slices.",
    "For algebraic fractions, the rules are IDENTICAL to number fractions. Just treat variables like unknown numbers. The same 'common denominator' rule applies."
  ],
  'functions': [
    "Think of f(x) as a recipe. f(x) = 2x + 1 means 'take your number, double it, add 1.' f(3) means 'follow the recipe with 3': 2(3) + 1 = 7. That's all substitution is!",
    "The function machine never lies — same input always gives same output. If f(2) = 5 today, it'll be 5 tomorrow. It's a reliable machine.",
    "Domain is like a bouncer at a club — some numbers aren't allowed in! Division by zero? Not allowed. Square root of negative? Not allowed. Everything else? Welcome in!"
  ],
  'limits': [
    "A limit is like watching a car approach a stop sign. We don't care if it actually stops — we care about where it's HEADING. That destination is the limit.",
    "When you get 0/0, don't panic! It's not 'undefined' — it's 'try harder.' Factor, cancel the common piece, then try plugging in again. The roadblock was just temporary.",
    "Limits at infinity: imagine sharing a pizza with more and more people. As the number of people → ∞, your slice → 0. That's the intuition behind 1/x → 0 as x → ∞."
  ],
  'probability': [
    "Probability is just counting! How many 'good' outcomes divided by total outcomes. If 3 out of 10 marbles are red, P(red) = 3/10. That's it!",
    "AND means multiply (both must happen). OR means add (either can happen). But for OR, subtract the overlap so you don't double-count!",
    "Conditional probability shrinks your world. 'Given it rained' means we ONLY look at rainy days. In that smaller world, how often did the game get cancelled?"
  ],
  'statistics': [
    "Mean = fair share (if everyone pooled and split equally). Median = the middle person. Mode = the most popular. Each tells a different story!",
    "For grouped data, we use midpoints as 'best guesses' for each group. It's like saying 'everyone in the 20-30 range is probably about 25.'",
    "Standard deviation measures consistency. Low SD = everyone scored similarly. High SD = huge variation. Think: a reliable bowler vs. a unpredictable one."
  ],
  'calculus': [
    "The power rule is your best friend: bring the exponent down, reduce by 1. x⁵ → 5x⁴. That's it! Practice until it's automatic.",
    "Chain rule = peeling an onion. Deal with the outer layer first, then the inner. For (3x+1)⁴: outer is ( )⁴, inner is 3x+1. Derivative = 4(3x+1)³ × 3.",
    "Integration is UNDOING differentiation. Power rule backwards: add 1 to power, divide by new power. x³ → x⁴/4. Don't forget +C!"
  ],
  'vectors': [
    "Vectors are arrows with length and direction. The dot product tells you how 'aligned' two arrows are. Same direction = big positive. Perpendicular = zero. Opposite = negative.",
    "For magnitude: it's just Pythagoras in 3D! |v| = √(x² + y² + z²). Like finding the diagonal of a box.",
    "Gradient points 'uphill.' Divergence measures 'spreading out.' Curl measures 'swirling.' They're all just partial derivatives arranged differently!"
  ],
  'laplace': [
    "Laplace transforms are a translation tool. You translate a hard differential equation into easy algebra, solve it, then translate back. Like using Google Translate for math!",
    "Memorize these 3: L{1} = 1/s, L{t} = 1/s², L{eᵃᵗ} = 1/(s-a). These three solve 80% of exam questions!",
    "The 4-step recipe: (1) Laplace both sides, (2) Plug in initial values, (3) Solve for Y(s), (4) Inverse Laplace back to y(t)."
  ],
  'default': [
    "I'm here to help you understand math! Try asking me about the current topic, or tell me what concept is confusing you. I'll explain it using everyday examples.",
    "Remember: math is just patterns and recipes. Every formula has a story behind it. What would you like me to explain?",
    "Don't be afraid to ask 'stupid' questions — there are no stupid questions in math! Every expert was once a beginner. What's on your mind?",
    "The key to math mastery is understanding WHY, not just memorizing formulas. Ask me 'why' about anything and I'll break it down for you!"
  ]
};

function getAIResponse(message: string, currentTopic: string): string {
  const lowerMsg = message.toLowerCase();
  
  // Check for topic-specific keywords
  let topicKey = 'default';
  if (lowerMsg.includes('negative') || lowerMsg.includes('minus') || lowerMsg.includes('(-')) topicKey = 'negative-numbers';
  else if (lowerMsg.includes('fraction') || lowerMsg.includes('denominator') || lowerMsg.includes('simplif')) topicKey = 'fractions';
  else if (lowerMsg.includes('function') || lowerMsg.includes('f(x)') || lowerMsg.includes('domain') || lowerMsg.includes('machine')) topicKey = 'functions';
  else if (lowerMsg.includes('limit') || lowerMsg.includes('approach') || lowerMsg.includes('infinity') || lowerMsg.includes('continuous')) topicKey = 'limits';
  else if (lowerMsg.includes('probability') || lowerMsg.includes('chance') || lowerMsg.includes('random') || lowerMsg.includes('dice') || lowerMsg.includes('coin')) topicKey = 'probability';
  else if (lowerMsg.includes('mean') || lowerMsg.includes('median') || lowerMsg.includes('mode') || lowerMsg.includes('average') || lowerMsg.includes('standard deviation') || lowerMsg.includes('variance')) topicKey = 'statistics';
  else if (lowerMsg.includes('derivative') || lowerMsg.includes('differentiat') || lowerMsg.includes('integral') || lowerMsg.includes('power rule') || lowerMsg.includes('chain rule') || lowerMsg.includes('partial')) topicKey = 'calculus';
  else if (lowerMsg.includes('vector') || lowerMsg.includes('dot product') || lowerMsg.includes('magnitude') || lowerMsg.includes('gradient') || lowerMsg.includes('divergence') || lowerMsg.includes('curl')) topicKey = 'vectors';
  else if (lowerMsg.includes('laplace') || lowerMsg.includes('transform') || lowerMsg.includes('differential equation')) topicKey = 'laplace';

  // Also consider current topic context
  if (topicKey === 'default' && currentTopic) {
    if (currentTopic.includes('negative') || currentTopic.includes('Negative')) topicKey = 'negative-numbers';
    else if (currentTopic.includes('fraction') || currentTopic.includes('Fraction')) topicKey = 'fractions';
    else if (currentTopic.includes('function') || currentTopic.includes('Function') || currentTopic.includes('Domain')) topicKey = 'functions';
    else if (currentTopic.includes('limit') || currentTopic.includes('Limit') || currentTopic.includes('Continuity')) topicKey = 'limits';
    else if (currentTopic.includes('probability') || currentTopic.includes('Probability') || currentTopic.includes('Chance')) topicKey = 'probability';
    else if (currentTopic.includes('mean') || currentTopic.includes('Mean') || currentTopic.includes('Data') || currentTopic.includes('Statistics')) topicKey = 'statistics';
    else if (currentTopic.includes('derivative') || currentTopic.includes('Derivative') || currentTopic.includes('Calculus') || currentTopic.includes('Power Rule') || currentTopic.includes('Integration')) topicKey = 'calculus';
    else if (currentTopic.includes('vector') || currentTopic.includes('Vector') || currentTopic.includes('Engineering')) topicKey = 'vectors';
    else if (currentTopic.includes('Laplace') || currentTopic.includes('ODE')) topicKey = 'laplace';
  }

  const responses = AI_RESPONSES[topicKey] || AI_RESPONSES['default'];
  
  // Check for specific question types
  if (lowerMsg.includes('help') || lowerMsg.includes('explain') || lowerMsg.includes('what is') || lowerMsg.includes('how')) {
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  if (lowerMsg.includes('thank')) {
    return "You're welcome! Keep practicing — you're doing great! 💪 Remember, every mistake is a step toward mastery.";
  }
  
  if (lowerMsg.includes('confused') || lowerMsg.includes('don\'t understand') || lowerMsg.includes('stuck')) {
    return "That's totally normal! Let me break it down differently. Can you tell me specifically which part is confusing? I'll try a different analogy or example. Remember: confusion means your brain is growing! 🧠";
  }

  return responses[Math.floor(Math.random() * responses.length)];
}

export default function AIChatbot({ currentTopic, currentUnit }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! 👋 I'm your Math Buddy AI. I'm here to help you understand ${currentUnit || 'math'} concepts using everyday examples. Ask me anything — there are no silly questions! What would you like help with?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && currentTopic) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `I see you're working on "${currentTopic}"! Need any help understanding this concept? I can explain it with everyday examples. Just ask! 🎯`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [currentTopic]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getAIResponse(input, currentTopic);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 800);
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
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h3 className="font-bold">Math Buddy AI</h3>
              <p className="text-xs text-purple-200">Always here to help!</p>
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
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about math..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={handleSend}
                className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
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
