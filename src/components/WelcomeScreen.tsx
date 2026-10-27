import { FiArrowRight } from 'react-icons/fi';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo/Icon */}
        <div className="mb-8 animate-bounce-gentle">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl">
            <span className="text-5xl">🌳</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Math Mastery
        </h1>
        <p className="text-xl text-white/80 mb-2">
          HND Discrete Mathematics
        </p>
        <p className="text-white/60 mb-10 max-w-md mx-auto">
          Learn math the way it should be taught — with real-life examples, 
          step-by-step explanations, and a real AI tutor powered by your choice of 
          <span className="text-white/80 font-medium"> HuggingFace, OpenAI, Anthropic, Google, or OpenRouter</span>.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <span className="text-3xl mb-2 block">📚</span>
            <p className="text-white text-sm font-medium">7 Units</p>
            <p className="text-white/60 text-xs mt-1">Basics → Advanced</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <span className="text-3xl mb-2 block">🤖</span>
            <p className="text-white text-sm font-medium">Your AI Key</p>
            <p className="text-white/60 text-xs mt-1">Use your own API</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <span className="text-3xl mb-2 block">👁️</span>
            <p className="text-white text-sm font-medium">Vision AI</p>
            <p className="text-white/60 text-xs mt-1">Reads your handwriting</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <span className="text-3xl mb-2 block">🔓</span>
            <p className="text-white text-sm font-medium">Unlock Path</p>
            <p className="text-white/60 text-xs mt-1">Progressive learning</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="inline-flex items-center gap-3 bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
        >
          Start Learning <FiArrowRight size={20} />
        </button>

        {/* Footer note */}
        <p className="text-white/40 text-sm mt-8">
          Your progress is saved automatically. Learn at your own pace.
        </p>
      </div>
    </div>
  );
}
