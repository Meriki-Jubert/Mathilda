export interface FormulaCategory {
  id: string;
  categoryName: string;
  icon: string;
  formulas: {
    name: string;
    expression: string;
    note: string;
    hndExamRelevance: string;
  }[];
}

export const hndFormulaSheet: FormulaCategory[] = [
  {
    id: 'f-laplace',
    categoryName: 'Laplace Transforms Table',
    icon: '⚡',
    formulas: [
      { name: 'Constant', expression: 'L{ 1 } = 1 / s', note: 's > 0', hndExamRelevance: 'Always used for unit step or DC constant inputs' },
      { name: 'Ramp Function', expression: 'L{ t } = 1 / s²', note: 's > 0', hndExamRelevance: 'Used for linear ramp inputs in ODEs' },
      { name: 'Polynomial tⁿ', expression: 'L{ tⁿ } = n! / sⁿ⁺¹', note: 'n = 1, 2, 3...', hndExamRelevance: 'Power functions in ODEs' },
      { name: 'Exponential eᵃᵗ', expression: 'L{ eᵃᵗ } = 1 / (s - a)', note: 's > a', hndExamRelevance: 'Core transform for 1st-order decay / growth' },
      { name: 'Sine Wave', expression: 'L{ sin(ωt) } = ω / (s² + ω²)', note: 's > 0', hndExamRelevance: 'AC signals and mechanical vibrations' },
      { name: 'Cosine Wave', expression: 'L{ cos(ωt) } = s / (s² + ω²)', note: 's > 0', hndExamRelevance: 'AC signals and phase response' },
      { name: '1st Derivative', expression: 'L{ y\'(t) } = s Y(s) - y(0)', note: 'Initial condition', hndExamRelevance: '1st-order ODE initial value problems' },
      { name: '2nd Derivative', expression: 'L{ y\'\'(t) } = s² Y(s) - s y(0) - y\'(0)', note: 'Initial conditions', hndExamRelevance: 'Essential for 10-mark RLC / vibration ODEs' }
    ]
  },
  {
    id: 'f-complex',
    categoryName: 'Complex Numbers & Phasors',
    icon: '🔮',
    formulas: [
      { name: 'Imaginary Unit', expression: 'i² = -1', note: 'i³ = -i, i⁴ = 1', hndExamRelevance: 'Basic algebraic simplification' },
      { name: 'Modulus (Magnitude)', expression: 'r = |z| = √(a² + b²)', note: 'z = a + bi', hndExamRelevance: 'Magnitude of AC voltage or impedance' },
      { name: 'Argument (Angle)', expression: 'θ = arctan(b / a)', note: 'Adjust quadrant', hndExamRelevance: 'Phase shift calculation in degrees/radians' },
      { name: 'Polar Form', expression: 'z = r (cos θ + i sin θ) = r e^(iθ)', note: 'Euler identity', hndExamRelevance: 'Multiplication & division of AC phasors' },
      { name: 'De Moivre\'s Theorem', expression: '[r (cos θ + i sin θ)]ⁿ = rⁿ [cos(nθ) + i sin(nθ)]', note: 'n ∈ ℤ', hndExamRelevance: 'Raising complex numbers to high powers zⁿ' }
    ]
  },
  {
    id: 'f-matrices',
    categoryName: 'Matrices & Linear Systems',
    icon: '🔢',
    formulas: [
      { name: '2x2 Determinant', expression: 'det([[a, b], [c, d]]) = ad - bc', note: 'Scalar', hndExamRelevance: 'Mesh analysis in circuits' },
      { name: '2x2 Matrix Inverse', expression: 'A⁻¹ = [1 / (ad - bc)] · [[d, -b], [-c, a]]', note: 'Requires det(A) ≠ 0', hndExamRelevance: 'Solving AX = B linear system' },
      { name: 'Cramer\'s Rule', expression: 'xᵢ = det(Aᵢ) / det(A)', note: 'Aᵢ replaces col i with B', hndExamRelevance: 'Favourite HND method for 3-variable circuits' },
      { name: 'Eigenvalue Equation', expression: 'det(A - λI) = 0', note: 'Characteristic equation', hndExamRelevance: 'Resonance frequency and system stability' }
    ]
  },
  {
    id: 'f-calculus',
    categoryName: 'Calculus & Integration Techniques',
    icon: '📐',
    formulas: [
      { name: 'Power Rule (Diff)', expression: 'd/dx [ xⁿ ] = n xⁿ⁻¹', note: 'n ∈ ℝ', hndExamRelevance: 'Basic differentiation' },
      { name: 'Product Rule', expression: 'd/dx [ u v ] = u\' v + u v\'', note: 'Two functions', hndExamRelevance: 'Differentiating combined signals' },
      { name: 'Chain Rule', expression: 'd/dx [ f(g(x)) ] = f\'(g(x)) · g\'(x)', note: 'Composite function', hndExamRelevance: 'Differentiating trig/exponential combinations' },
      { name: 'Integration by Parts', expression: '∫ u dv = u v - ∫ v du', note: 'LIATE rule for u', hndExamRelevance: 'Integrating x eˣ, x sin(x), x ln(x)' },
      { name: 'Partial Fractions (Linear)', expression: 'P(x) / [(x-a)(x-b)] = A / (x-a) + B / (x-b)', note: 'Equate numerators', hndExamRelevance: 'Prerequisite for Inverse Laplace & Integration' }
    ]
  },
  {
    id: 'f-numerical',
    categoryName: 'Numerical Methods & Integration',
    icon: '🎯',
    formulas: [
      { name: 'Step Size h', expression: 'h = (b - a) / n', note: 'n intervals', hndExamRelevance: 'First step in all numerical integration' },
      { name: 'Trapezoidal Rule', expression: '∫ ≈ (h / 2) [ (y₀ + y♞) + 2 ∑ y_inner ]', note: 'Linear approximation', hndExamRelevance: 'Estimating irregular areas or work done' },
      { name: 'Simpson\'s 1/3 Rule', expression: '∫ ≈ (h / 3) [ (y₀ + y♞) + 4 ∑ y_odd + 2 ∑ y_even ]', note: 'n MUST be even', hndExamRelevance: 'High accuracy numerical integration question' },
      { name: 'Newton-Raphson', expression: 'xₙ₊₁ = xₙ - f(xₙ) / f\'(xₙ)', note: 'Root finding', hndExamRelevance: 'Iterative solution of non-linear equations' }
    ]
  }
];
