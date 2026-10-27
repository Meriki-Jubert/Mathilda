import { useState } from 'react';
import { hndFormulaSheet } from '../data/hndFormulas';

interface HndFormulaSheetViewProps {
  onBack: () => void;
}

export default function HndFormulaSheetView({ onBack }: HndFormulaSheetViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const handleCopy = (expression: string) => {
    navigator.clipboard.writeText(expression);
    setCopiedFormula(expression);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const filteredCategories = hndFormulaSheet.map(cat => ({
    ...cat,
    formulas: cat.formulas.filter(
      f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.expression.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.hndExamRelevance.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.formulas.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <button
            onClick={onBack}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-2"
          >
            ← Back to Learning Path
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <span>📐</span> Cameroon HND Math Formula Cheat Sheet
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quick reference guide for Laplace, Complex Numbers, Matrices, Calculus & Numerical Methods
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search formulas (e.g., Laplace, Matrix Inverse, De Moivre, Simpson, Product Rule)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
        </div>
      </div>

      {/* Formulas List */}
      <div className="max-w-5xl mx-auto space-y-8">
        {filteredCategories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span>{cat.icon}</span>
              {cat.categoryName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 text-sm">{f.name}</h3>
                      <button
                        onClick={() => handleCopy(f.expression)}
                        className="text-xs text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded transition-colors"
                      >
                        {copiedFormula === f.expression ? 'Copied! ✓' : 'Copy'}
                      </button>
                    </div>

                    {/* Formula Math Display */}
                    <div className="my-2 p-3 bg-slate-900 text-emerald-400 rounded-lg font-mono text-sm text-center font-bold tracking-wide">
                      {f.expression}
                    </div>

                    <p className="text-xs text-slate-500 italic mt-1">{f.note}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200 text-xs text-slate-700">
                    <span className="font-semibold text-emerald-800">HND Exam Use:</span> {f.hndExamRelevance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
