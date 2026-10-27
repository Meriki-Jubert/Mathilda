export interface ExamQuestion {
  id: string;
  module: 'Calculus' | 'Complex Numbers' | 'Matrices' | 'Differential Equations' | 'Laplace Transforms' | 'Vector Calculus' | 'Numerical Methods' | 'Statistics';
  paperYear: string;
  totalMarks: number;
  title: string;
  scenario: string;
  parts: {
    partLabel: string;
    questionText: string;
    marks: number;
    hint: string;
    solutionSteps: string[];
    finalAnswer: string;
  }[];
}

export const hndExamQuestions: ExamQuestion[] = [
  {
    id: 'hnd-q1',
    module: 'Laplace Transforms',
    paperYear: 'Cameroon HND Engineering Maths 2023 - Question 1',
    totalMarks: 10,
    title: 'Solving Second-Order RLC Circuit ODE using Laplace Transforms',
    scenario: 'An electrical engineering circuit is described by the differential equation: y\'\' + 4y\' + 3y = 0 with initial conditions y(0) = 2 and y\'(0) = -2.',
    parts: [
      {
        partLabel: '(a)',
        questionText: 'Apply Laplace transform to both sides of the differential equation using the initial conditions.',
        marks: 3,
        hint: 'Use L{y\'\'} = s²Y(s) - s y(0) - y\'(0) and L{y\'} = sY(s) - y(0).',
        solutionSteps: [
          'L{y\'\'} = s²Y(s) - 2s - (-2) = s²Y(s) - 2s + 2',
          'L{4y\'} = 4(sY(s) - 2) = 4sY(s) - 8',
          'L{3y} = 3Y(s)',
          'Combine: (s²Y(s) - 2s + 2) + (4sY(s) - 8) + 3Y(s) = 0',
          'Y(s)(s² + 4s + 3) - 2s - 6 = 0'
        ],
        finalAnswer: 'Y(s)(s² + 4s + 3) = 2s + 6'
      },
      {
        partLabel: '(b)',
        questionText: 'Express Y(s) as partial fractions.',
        marks: 4,
        hint: 'Factor s² + 4s + 3 as (s + 1)(s + 3). Set Y(s) = A/(s+1) + B/(s+3).',
        solutionSteps: [
          'Y(s) = (2s + 6) / [(s + 1)(s + 3)]',
          'Set (2s + 6)/[(s+1)(s+3)] = A/(s+1) + B/(s+3)',
          '2s + 6 = A(s + 3) + B(s + 1)',
          'Let s = -1: 2(-1) + 6 = A(2) → 4 = 2A → A = 2',
          'Let s = -3: 2(-3) + 6 = B(-2) → 0 = -2B → B = 0',
          'So Y(s) = 2 / (s + 1)'
        ],
        finalAnswer: 'Y(s) = 2 / (s + 1)'
      },
      {
        partLabel: '(c)',
        questionText: 'Find the inverse Laplace transform to obtain the voltage response y(t).',
        marks: 3,
        hint: 'Use L⁻¹{1/(s-a)} = e^(at). Here a = -1.',
        solutionSteps: [
          'y(t) = L⁻¹{ 2 / (s + 1) }',
          'Recall L⁻¹{ 1 / (s + 1) } = e⁻ᵗ',
          'Therefore y(t) = 2 e⁻ᵗ'
        ],
        finalAnswer: 'y(t) = 2 e⁻ᵗ'
      }
    ]
  },
  {
    id: 'hnd-q2',
    module: 'Complex Numbers',
    paperYear: 'Cameroon HND Electrical Engineering 2022 - Question 2',
    totalMarks: 10,
    title: 'AC Impedance Analysis & De Moivre\'s Theorem',
    scenario: 'Two AC impedances in parallel are given as z₁ = 1 + i√3 and z₂ = 2∠60°.',
    parts: [
      {
        partLabel: '(a)',
        questionText: 'Convert z₁ = 1 + i√3 into exponential polar form r e^(iθ).',
        marks: 3,
        hint: 'r = √(a² + b²), θ = tan⁻¹(b/a).',
        solutionSteps: [
          'a = 1, b = √3',
          'r = √(1² + (√3)²) = √(1 + 3) = √4 = 2',
          'θ = tan⁻¹(√3 / 1) = 60° = π/3 radians',
          'Polar form: z₁ = 2 e^(i π/3) or 2∠60°'
        ],
        finalAnswer: '2 e^(i π/3) or 2∠60°'
      },
      {
        partLabel: '(b)',
        questionText: 'Calculate z₁⁶ using De Moivre\'s Theorem.',
        marks: 4,
        hint: 'z₁⁶ = r⁶ [cos(6θ) + i sin(6θ)].',
        solutionSteps: [
          'z₁ = 2 (cos(π/3) + i sin(π/3))',
          'z₁⁶ = 2⁶ [cos(6 × π/3) + i sin(6 × π/3)]',
          '2⁶ = 64',
          'cos(2π) + i sin(2π) = 1 + 0i = 1',
          'z₁⁶ = 64 × 1 = 64'
        ],
        finalAnswer: '64'
      },
      {
        partLabel: '(c)',
        questionText: 'Find the real and imaginary parts of z₁ / z₂.',
        marks: 3,
        hint: 'In polar form, divide magnitudes and subtract angles.',
        solutionSteps: [
          'z₁ = 2∠60°, z₂ = 2∠60°',
          'z₁ / z₂ = (2 / 2) ∠ (60° - 60°) = 1 ∠ 0°',
          '1 ∠ 0° = 1 + 0i'
        ],
        finalAnswer: 'Re = 1, Im = 0'
      }
    ]
  },
  {
    id: 'hnd-q3',
    module: 'Matrices',
    paperYear: 'Cameroon HND Technology 2023 - Question 3',
    totalMarks: 10,
    title: '3-Mesh Electrical Circuit Solving via Matrix Cramer\'s Rule',
    scenario: 'A 3-mesh electrical network yields the system:\n2I₁ - I₂ = 5\n-I₁ + 3I₂ - I₃ = 0\n-I₂ + 2I₃ = 0',
    parts: [
      {
        partLabel: '(a)',
        questionText: 'Write the system in matrix form A I = B and compute det(A).',
        marks: 4,
        hint: 'A = [[2, -1, 0], [-1, 3, -1], [0, -1, 2]]. Use cofactor expansion along row 1.',
        solutionSteps: [
          'A = [[2, -1, 0], [-1, 3, -1], [0, -1, 2]], B = [[5], [0], [0]]',
          'det(A) = 2 · det([[3, -1], [-1, 2]]) - (-1) · det([[-1, -1], [0, 2]]) + 0',
          'det([[3, -1], [-1, 2]]) = (3)(2) - (-1)(-1) = 6 - 1 = 5',
          'det([[-1, -1], [0, 2]]) = (-1)(2) - 0 = -2',
          'det(A) = 2(5) + 1(-2) = 10 - 2 = 8'
        ],
        finalAnswer: 'det(A) = 8'
      },
      {
        partLabel: '(b)',
        questionText: 'Calculate current I₁ using Cramer\'s Rule.',
        marks: 6,
        hint: 'Replace column 1 of A with B = [5, 0, 0]ᵀ to get A₁.',
        solutionSteps: [
          'A₁ = [[5, -1, 0], [0, 3, -1], [0, -1, 2]]',
          'det(A₁) = 5 · det([[3, -1], [-1, 2]]) = 5(5) = 25',
          'I₁ = det(A₁) / det(A) = 25 / 8 = 3.125 A'
        ],
        finalAnswer: 'I₁ = 3.125 A (or 25/8 A)'
      }
    ]
  },
  {
    id: 'hnd-q4',
    module: 'Numerical Methods',
    paperYear: 'Cameroon HND Civil & Mechanical 2022 - Question 4',
    totalMarks: 10,
    title: 'Numerical Integration via Simpson\'s 1/3 Rule',
    scenario: 'Calculate the total work done by a variable force represented by the integral W = ∫[1 to 5] (1 / x) dx using Simpson\'s 1/3 Rule with n = 4 intervals.',
    parts: [
      {
        partLabel: '(a)',
        questionText: 'Determine the step size h and tabulate x and y = 1/x for all 5 ordinates.',
        marks: 4,
        hint: 'h = (b - a)/n = (5 - 1)/4 = 1. Ordinates x = 1, 2, 3, 4, 5.',
        solutionSteps: [
          'h = (5 - 1)/4 = 1',
          'x₀ = 1 → y₀ = 1/1 = 1.0000',
          'x₁ = 2 → y₁ = 1/2 = 0.5000',
          'x₂ = 3 → y₂ = 1/3 = 0.3333',
          'x₃ = 4 → y₃ = 1/4 = 0.2500',
          'x₄ = 5 → y₄ = 1/5 = 0.2000'
        ],
        finalAnswer: 'y = [1.0000, 0.5000, 0.3333, 0.2500, 0.2000]'
      },
      {
        partLabel: '(b)',
        questionText: 'Apply Simpson\'s 1/3 Rule formula to compute the integral value W.',
        marks: 6,
        hint: 'W ≈ (h/3) [(y₀ + y₄) + 4(y₁ + y₃) + 2(y₂)]',
        solutionSteps: [
          'Ends: y₀ + y₄ = 1.0000 + 0.2000 = 1.2000',
          'Odd terms: y₁ + y₃ = 0.5000 + 0.2500 = 0.7500 → 4 × 0.7500 = 3.0000',
          'Even terms: y₂ = 0.3333 → 2 × 0.3333 = 0.6667',
          'Sum inside brackets = 1.2000 + 3.0000 + 0.6667 = 4.8667',
          'W ≈ (1/3) × 4.8667 = 1.6222'
        ],
        finalAnswer: '1.6222 (Exact ln(5) ≈ 1.6094)'
      }
    ]
  }
];
