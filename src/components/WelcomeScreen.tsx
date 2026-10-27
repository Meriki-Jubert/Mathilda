import { FiArrowRight, FiBook, FiFileText, FiCamera, FiSliders } from 'react-icons/fi';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex items-center justify-center p-4 font-sans">
      <div className="max-w-2xl w-full bg-white border border-stone-300 rounded p-8 shadow-sm space-y-8">
        {/* Title Header */}
        <div className="border-b border-stone-200 pb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-950 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase tracking-wider mb-3">
            <span>🌴</span> Mathilda Jungle Expedition • Cameroon HND
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            Mathilda: The Jungle of Equations
          </h1>
          <p className="text-stone-600 text-sm mt-2 leading-relaxed font-serif">
            Mathematics is an uncharted jungle waiting to be explored. Navigate through 12 lush biomes, 
            harvest regional Knowledge Fruits, boost your Expedition Stamina, and unlock secret past paper vaults 
            for your Cameroon HND National Examinations.
          </p>
        </div>

        {/* Expedition Features */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded font-mono">
            <FiBook className="text-emerald-800 mb-1" size={18} />
            <div className="text-stone-900 font-bold text-sm">12 Biomes</div>
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">Syllabus Map</div>
          </div>
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded font-mono">
            <span className="text-lg mb-1 block">🥭</span>
            <div className="text-stone-900 font-bold text-sm">Knowledge Fruits</div>
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">Collect Rewards</div>
          </div>
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded font-mono">
            <FiFileText className="text-emerald-800 mb-1" size={18} />
            <div className="text-stone-900 font-bold text-sm">Secret Vault</div>
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">HND Past Papers</div>
          </div>
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded font-mono">
            <FiCamera className="text-emerald-800 mb-1" size={18} />
            <div className="text-stone-900 font-bold text-sm">Vision AI</div>
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">Handwriting Inspector</div>
          </div>
        </div>

        {/* CTA Launch Control */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-500 font-mono">
            Expedition Status: <span className="text-emerald-800 font-bold">12 Jungle Biomes Open</span>
          </div>
          <button
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            Enter Jungle Expedition Map <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
