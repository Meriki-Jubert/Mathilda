import { useState } from 'react';
import { FiArrowLeft, FiSliders, FiCpu } from 'react-icons/fi';

interface HndSolversViewProps {
  onBack: () => void;
}

export default function HndSolversView({ onBack }: HndSolversViewProps) {
  const [activeTab, setActiveTab] = useState<'complex' | 'matrix' | 'numerical'>('complex');

  // Complex Number State
  const [realPart, setRealPart] = useState<number>(1);
  const [imagPart, setImagPart] = useState<number>(1.732);

  const mod = Math.sqrt(realPart * realPart + imagPart * imagPart);
  const argRad = Math.atan2(imagPart, realPart);
  const argDeg = (argRad * 180) / Math.PI;

  // 2x2 Matrix State
  const [m11, setM11] = useState<number>(4);
  const [m12, setM12] = useState<number>(2);
  const [m21, setM21] = useState<number>(3);
  const [m22, setM22] = useState<number>(1);

  const det = m11 * m22 - m12 * m21;
  const invExists = Math.abs(det) > 1e-9;
  const inv11 = invExists ? m22 / det : 0;
  const inv12 = invExists ? -m12 / det : 0;
  const inv21 = invExists ? -m21 / det : 0;
  const inv22 = invExists ? m11 / det : 0;

  // Numerical Integration (x^2 default)
  const [lowerA, setLowerA] = useState<number>(0);
  const [upperB, setUpperB] = useState<number>(2);
  const [numN, setNumN] = useState<number>(4);

  const stepH = (upperB - lowerA) / (numN || 1);
  const f = (x: number) => x * x;

  let trapSum = f(lowerA) + f(upperB);
  for (let i = 1; i < numN; i++) {
    trapSum += 2 * f(lowerA + i * stepH);
  }
  const trapVal = (stepH / 2) * trapSum;

  let simpSum = f(lowerA) + f(upperB);
  for (let i = 1; i < numN; i++) {
    const coeff = i % 2 === 1 ? 4 : 2;
    simpSum += coeff * f(lowerA + i * stepH);
  }
  const simpVal = (stepH / 3) * simpSum;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto mb-6 bg-white p-6 rounded border border-stone-200 shadow-xs">
        <button
          onClick={onBack}
          className="text-xs font-mono font-medium text-emerald-800 hover:text-emerald-900 flex items-center gap-1 mb-2"
        >
          <FiArrowLeft size={14} /> Back to Syllabus
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <FiSliders className="text-emerald-700" size={22} />
          Interactive Mathematical Step Verifiers
        </h1>
        <p className="text-xs text-stone-600 mt-1">
          Perform step-by-step verification of hand calculations for complex numbers, matrix operations, and numerical integration
        </p>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 mt-6 gap-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('complex')}
            className={`pb-2.5 font-bold transition-all ${
              activeTab === 'complex'
                ? 'border-b-2 border-emerald-700 text-emerald-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Complex Number Converter
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-2.5 font-bold transition-all ${
              activeTab === 'matrix'
                ? 'border-b-2 border-emerald-700 text-emerald-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            2x2 Matrix Inverter
          </button>
          <button
            onClick={() => setActiveTab('numerical')}
            className={`pb-2.5 font-bold transition-all ${
              activeTab === 'numerical'
                ? 'border-b-2 border-emerald-700 text-emerald-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Numerical Integrator
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === 'complex' && (
          <div className="bg-white rounded border border-stone-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">z = a + bi → Polar / Exponential Form</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Real Part (a)</label>
                <input
                  type="number"
                  step="any"
                  value={realPart}
                  onChange={e => setRealPart(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border border-stone-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Imaginary Part (b)</label>
                <input
                  type="number"
                  step="any"
                  value={imagPart}
                  onChange={e => setImagPart(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border border-stone-300 rounded text-xs"
                />
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                <FiCpu size={14} /> Evaluation Breakdown:
              </div>
              <div>z = {realPart} + {imagPart}i</div>
              <div>Modulus r = √({realPart}² + {imagPart}²) = <span className="text-emerald-400 font-bold">{mod.toFixed(4)}</span></div>
              <div>Argument θ = arctan({imagPart} / {realPart}) = <span className="text-emerald-400 font-bold">{argRad.toFixed(4)} rad</span> ({argDeg.toFixed(2)}°)</div>
              <div className="text-emerald-300 font-bold pt-2 border-t border-slate-800">
                Exponential Polar: {mod.toFixed(4)} e^({argRad.toFixed(4)}i) = {mod.toFixed(4)} ∠ {argDeg.toFixed(2)}°
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="bg-white rounded border border-stone-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">2x2 Matrix Determinant & Inverse Matrix</h2>
            <div className="grid grid-cols-2 gap-2 max-w-xs font-mono">
              <input type="number" value={m11} onChange={e => setM11(parseFloat(e.target.value) || 0)} className="p-2 border border-stone-300 rounded text-xs text-center" />
              <input type="number" value={m12} onChange={e => setM12(parseFloat(e.target.value) || 0)} className="p-2 border border-stone-300 rounded text-xs text-center" />
              <input type="number" value={m21} onChange={e => setM21(parseFloat(e.target.value) || 0)} className="p-2 border border-stone-300 rounded text-xs text-center" />
              <input type="number" value={m22} onChange={e => setM22(parseFloat(e.target.value) || 0)} className="p-2 border border-stone-300 rounded text-xs text-center" />
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                <FiCpu size={14} /> Evaluation Breakdown:
              </div>
              <div>det(A) = ({m11})({m22}) - ({m12})({m21}) = <span className="text-emerald-400 font-bold">{det}</span></div>
              {invExists ? (
                <>
                  <div className="text-slate-300">A⁻¹ = (1/{det}) · [[{m22}, {-m12}], [{-m21}, {m11}]]</div>
                  <div className="text-emerald-300 font-bold pt-2 border-t border-slate-800">
                    A⁻¹ = [[{inv11.toFixed(3)}, {inv12.toFixed(3)}], [{inv21.toFixed(3)}, {inv22.toFixed(3)}]]
                  </div>
                </>
              ) : (
                <div className="text-red-400 font-bold mt-2">Matrix is singular (det = 0). Inverse does not exist.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'numerical' && (
          <div className="bg-white rounded border border-stone-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">Numerical Integrator: ∫[a to b] x² dx</h2>
            <p className="text-xs font-mono text-stone-500">Evaluates ∫ x² dx using Trapezoidal and Simpson\'s 1/3 rules.</p>

            <div className="grid grid-cols-3 gap-3 font-mono">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Lower Bound a</label>
                <input type="number" value={lowerA} onChange={e => setLowerA(parseFloat(e.target.value) || 0)} className="w-full p-2 border border-stone-300 rounded text-xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Upper Bound b</label>
                <input type="number" value={upperB} onChange={e => setUpperB(parseFloat(e.target.value) || 0)} className="w-full p-2 border border-stone-300 rounded text-xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Subintervals n (Even)</label>
                <input type="number" min="2" step="2" value={numN} onChange={e => setNumN(parseInt(e.target.value) || 2)} className="w-full p-2 border border-stone-300 rounded text-xs" />
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded border border-slate-800 font-mono text-xs space-y-2">
              <div>Step size h = ({upperB} - {lowerA}) / {numN} = <span className="text-emerald-400 font-bold">{stepH.toFixed(4)}</span></div>
              <div className="p-3 bg-slate-800 rounded border border-slate-700 space-y-1">
                <div className="text-[11px] font-bold text-slate-400">TRAPEZOIDAL RULE RESULT:</div>
                <div className="text-emerald-300 text-sm font-bold">Integral ≈ {trapVal.toFixed(4)}</div>
              </div>
              <div className="p-3 bg-slate-800 rounded border border-slate-700 space-y-1">
                <div className="text-[11px] font-bold text-slate-400">SIMPSON\'S 1/3 RULE RESULT:</div>
                <div className="text-emerald-300 text-sm font-bold">Integral ≈ {simpVal.toFixed(4)}</div>
              </div>
              <div className="text-[11px] text-slate-400">
                Exact analytical integral: [(b³ - a³) / 3] = {((upperB ** 3 - lowerA ** 3) / 3).toFixed(4)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
