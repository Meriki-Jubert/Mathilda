import { useState } from 'react';

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

  // Calculate Trapezoidal and Simpson for f(x) = x^2
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <div className="max-w-4xl mx-auto mb-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-2"
        >
          ← Back to Learning Path
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
          <span>🧮</span> Interactive HND Step Verifiers & Calculators
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Verify your hand calculations step-by-step before your exam
        </p>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mt-6 gap-6">
          <button
            onClick={() => setActiveTab('complex')}
            className={`pb-3 text-sm font-semibold transition-all ${
              activeTab === 'complex'
                ? 'border-b-2 border-emerald-600 text-emerald-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🔮 Complex Number Polar Converter
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-3 text-sm font-semibold transition-all ${
              activeTab === 'matrix'
                ? 'border-b-2 border-emerald-600 text-emerald-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🔢 2x2 Matrix Inverse & Determinant
          </button>
          <button
            onClick={() => setActiveTab('numerical')}
            className={`pb-3 text-sm font-semibold transition-all ${
              activeTab === 'numerical'
                ? 'border-b-2 border-emerald-600 text-emerald-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🎯 Numerical Integrator (Trapezoidal / Simpson)
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === 'complex' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">z = a + bi → r ∠ θ Converter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Real Part (a)</label>
                <input
                  type="number"
                  step="any"
                  value={realPart}
                  onChange={e => setRealPart(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border rounded-xl text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Imaginary Part (b)</label>
                <input
                  type="number"
                  step="any"
                  value={imagPart}
                  onChange={e => setImagPart(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border rounded-xl text-sm font-mono"
                />
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-sm space-y-2">
              <div className="text-emerald-400 font-bold border-b border-slate-800 pb-2">Step Breakdown:</div>
              <div>z = {realPart} + {imagPart}i</div>
              <div>Modulus r = √({realPart}² + {imagPart}²) = <span className="text-emerald-400 font-bold">{mod.toFixed(4)}</span></div>
              <div>Argument θ = arctan({imagPart} / {realPart}) = <span className="text-emerald-400 font-bold">{argRad.toFixed(4)} rad</span> ({argDeg.toFixed(2)}°)</div>
              <div className="text-emerald-300 font-bold pt-2 border-t border-slate-800">
                Exponential / Polar: {mod.toFixed(4)} e^({argRad.toFixed(4)}i) = {mod.toFixed(4)} ∠ {argDeg.toFixed(2)}°
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">2x2 Matrix Determinant & Inverse</h2>
            <div className="grid grid-cols-2 gap-3 max-w-xs mb-6">
              <input type="number" value={m11} onChange={e => setM11(parseFloat(e.target.value) || 0)} className="p-2 border rounded font-mono text-center" />
              <input type="number" value={m12} onChange={e => setM12(parseFloat(e.target.value) || 0)} className="p-2 border rounded font-mono text-center" />
              <input type="number" value={m21} onChange={e => setM21(parseFloat(e.target.value) || 0)} className="p-2 border rounded font-mono text-center" />
              <input type="number" value={m22} onChange={e => setM22(parseFloat(e.target.value) || 0)} className="p-2 border rounded font-mono text-center" />
            </div>

            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-sm space-y-2">
              <div className="text-emerald-400 font-bold border-b border-slate-800 pb-2">Results:</div>
              <div>det(A) = ({m11})({m22}) - ({m12})({m21}) = <span className="text-emerald-400 font-bold">{det}</span></div>
              {invExists ? (
                <>
                  <div className="text-slate-300">A⁻¹ = (1/{det}) · [[{m22}, {-m12}], [{-m21}, {m11}]]</div>
                  <div className="text-emerald-300 font-bold pt-2 border-t border-slate-800">
                    A⁻¹ = [[{inv11.toFixed(3)}, {inv12.toFixed(3)}], [{inv21.toFixed(3)}, {inv22.toFixed(3)}]]
                  </div>
                </>
              ) : (
                <div className="text-red-400 font-bold mt-2">Matrix is singular (det = 0). No inverse exists!</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'numerical' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Numerical Integration Verifier: ∫[a to b] x² dx</h2>
            <p className="text-xs text-slate-500 mb-4">Evaluates ∫ x² dx using Trapezoidal and Simpson\'s 1/3 rules.</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Lower Bound a</label>
                <input type="number" value={lowerA} onChange={e => setLowerA(parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Upper Bound b</label>
                <input type="number" value={upperB} onChange={e => setUpperB(parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Subintervals n (Even for Simpson)</label>
                <input type="number" min="2" step="2" value={numN} onChange={e => setNumN(parseInt(e.target.value) || 2)} className="w-full p-2 border rounded font-mono" />
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-sm space-y-3">
              <div>Step size h = ({upperB} - {lowerA}) / {numN} = <span className="text-emerald-400 font-bold">{stepH.toFixed(4)}</span></div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-xs font-bold text-slate-400">TRAPEZOIDAL RULE:</div>
                <div className="text-emerald-300 text-base font-bold mt-1">Integral ≈ {trapVal.toFixed(4)}</div>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-xs font-bold text-slate-400">SIMPSON\'S 1/3 RULE:</div>
                <div className="text-emerald-300 text-base font-bold mt-1">Integral ≈ {simpVal.toFixed(4)}</div>
              </div>
              <div className="text-xs text-slate-400">
                Exact integral: [(b³ - a³) / 3] = {((upperB ** 3 - lowerA ** 3) / 3).toFixed(4)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
