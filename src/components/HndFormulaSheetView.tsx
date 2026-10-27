import { useState } from 'react';
import { FiArrowLeft, FiBookmark, FiSearch, FiCopy, FiCheck } from 'react-icons/fi';
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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans p-4 md:p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded border border-stone-200 shadow-xs">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-mono font-medium text-emerald-800 hover:text-emerald-900 flex items-center gap-1 mb-2"
          >
            <FiArrowLeft size={14} /> Back to Syllabus
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <FiBookmark className="text-emerald-700" size={22} />
            Cameroon HND Engineering Mathematics Formula Reference
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Standard reference tables for Laplace Transforms, Complex Numbers, Matrices, Calculus, and Numerical Methods
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search reference formulas (e.g., Laplace, Matrix Inverse, De Moivre, Simpson)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded text-xs font-mono focus:outline-none focus:border-slate-900 shadow-xs"
          />
          <FiSearch className="absolute left-3 top-3 text-stone-400" size={14} />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-5xl mx-auto space-y-6">
        {filteredCategories.map(cat => (
          <div key={cat.id} className="bg-white rounded border border-stone-200 p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200 uppercase tracking-wide flex items-center gap-2">
              {cat.categoryName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-stone-50 rounded border border-stone-200 flex flex-col justify-between hover:border-emerald-600 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-stone-900 text-xs">{f.name}</h3>
                      <button
                        onClick={() => handleCopy(f.expression)}
                        className="text-[11px] font-mono text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
                      >
                        {copiedFormula === f.expression ? (
                          <>
                            <FiCheck size={12} /> Copied
                          </>
                        ) : (
                          <>
                            <FiCopy size={12} /> Copy
                          </>
                        )}
                      </button>
                    </div>

                    {/* Formula Math Box */}
                    <div className="my-2 p-3 bg-slate-900 text-emerald-400 rounded font-mono text-xs text-center font-bold tracking-wide border border-slate-800">
                      {f.expression}
                    </div>

                    <p className="text-[11px] font-mono text-stone-500 italic">{f.note}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-200 text-xs text-stone-700 font-mono">
                    <span className="font-bold text-emerald-900">Exam Use:</span> {f.hndExamRelevance}
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
