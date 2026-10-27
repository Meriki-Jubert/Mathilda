export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  everydayExample: string;
  keyConcept: string;
  formula?: string;
  workedExample: {
    problem: string;
    steps: string[];
    answer: string;
  };
}

export interface PracticeQuestion {
  id: string;
  question: string;
  type: 'text' | 'multiple-choice';
  options?: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  practice: PracticeQuestion[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  icon: string;
  goal: string;
  skills: Skill[];
}

export const curriculum: Unit[] = [
  {
    id: 'unit-1',
    number: 1,
    title: 'The Survival Toolkit',
    icon: '🧰',
    goal: 'Eliminate confusion with negatives, fractions, and basic algebraic manipulation. You cannot build a house without a foundation.',
    skills: [
      {
        id: 'skill-1.1',
        title: 'Handling Negative Numbers',
        description: 'Understanding the difference between (-3)² and -3²',
        lessons: [
          {
            id: 'lesson-1.1.1',
            title: 'The Power of Parentheses',
            explanation: 'When you see a negative number raised to a power, the parentheses matter enormously. Think of parentheses as a "container" — everything inside gets the operation applied to it. Without parentheses, the negative sign is applied AFTER the power.',
            everydayExample: 'Think of it like a bank account. If you owe $3 (that\'s -3) and this debt is "squared" (doubled in a sense), the parentheses determine whether you\'re squaring the debt itself or just the amount. (-3)² = you squared the whole debt = $9 (positive, because two negatives cancel). But -3² = you first square 3 to get 9, then apply the "owing" = -$9.',
            keyConcept: '(-3)² = (-3) × (-3) = 9, but -3² = -(3 × 3) = -9. Parentheses first, then the negative!',
            workedExample: {
              problem: 'Evaluate (-4)² and -4²',
              steps: [
                '(-4)² means: (-4) × (-4) = 16 (negative × negative = positive)',
                '-4² means: -(4 × 4) = -(16) = -16 (square first, then negate)',
                'Key difference: parentheses tell you the negative is part of what gets squared'
              ],
              answer: '(-4)² = 16, -4² = -16'
            }
          }
        ],
        practice: [
          {
            id: 'pq-1.1.1',
            question: 'What is (-5)² ?',
            type: 'multiple-choice',
            options: ['25', '-25', '10', '-10'],
            correctAnswer: '25',
            hint: 'Remember: the parentheses mean the negative sign is included in what gets squared.',
            explanation: '(-5)² = (-5) × (-5) = 25. The parentheses include the negative sign, so we multiply two negative fives together.'
          },
          {
            id: 'pq-1.1.2',
            question: 'What is -5² ?',
            type: 'multiple-choice',
            options: ['25', '-25', '10', '-10'],
            correctAnswer: '-25',
            hint: 'No parentheses! Square 5 first, then apply the negative.',
            explanation: '-5² = -(5²) = -(5 × 5) = -25. Without parentheses, we square 5 first to get 25, then apply the negative sign.'
          },
          {
            id: 'pq-1.1.3',
            question: 'Evaluate: (-2)³',
            type: 'text',
            correctAnswer: '-8',
            hint: 'Multiply (-2) three times: (-2) × (-2) × (-2)',
            explanation: '(-2)³ = (-2) × (-2) × (-2) = 4 × (-2) = -8. An odd power of a negative number stays negative.'
          },
          {
            id: 'pq-1.1.4',
            question: 'What is -(-3)² ?',
            type: 'text',
            correctAnswer: '-9',
            hint: 'First evaluate (-3)², then apply the outer negative.',
            explanation: '-(-3)² = -((-3) × (-3)) = -(9) = -9. The parentheses make (-3)² = 9, then the outer negative gives -9.'
          }
        ]
      },
      {
        id: 'skill-1.2',
        title: 'Fraction Arithmetic',
        description: 'Adding, subtracting, multiplying and simplifying algebraic fractions',
        lessons: [
          {
            id: 'lesson-1.2.1',
            title: 'Fractions in Real Life',
            explanation: 'Fractions are just division written differently. When you add fractions, you need a common denominator — think of it like converting everything to the same "currency" before you can add them up. For algebraic fractions, the same rules apply, but with variables.',
            everydayExample: 'Imagine you have 1/3 of a pizza and your friend has 1/4 of the same pizza. To figure out how much pizza you have together, you can\'t just say "1+1 = 2" because the slices are different sizes. You need to cut them into the same size pieces first — that\'s finding a common denominator (12 in this case).',
            keyConcept: 'To add fractions: find LCD, convert, then add numerators. To multiply: multiply tops and bottoms directly.',
            formula: 'a/b + c/d = (ad + bc) / bd',
            workedExample: {
              problem: 'Simplify: 2/x + 3/(x+1)',
              steps: [
                'Find common denominator: x(x+1)',
                'Convert first fraction: 2(x+1) / x(x+1)',
                'Convert second fraction: 3x / x(x+1)',
                'Add numerators: [2(x+1) + 3x] / x(x+1)',
                'Simplify numerator: (2x + 2 + 3x) / x(x+1) = (5x + 2) / x(x+1)'
              ],
              answer: '(5x + 2) / x(x+1)'
            }
          }
        ],
        practice: [
          {
            id: 'pq-1.2.1',
            question: 'Simplify: 1/2 + 1/3',
            type: 'text',
            correctAnswer: '5/6',
            hint: 'Find the LCD of 2 and 3, which is 6.',
            explanation: '1/2 + 1/3 = 3/6 + 2/6 = 5/6'
          },
          {
            id: 'pq-1.2.2',
            question: 'Simplify: (x+2)/x - 1/x',
            type: 'text',
            correctAnswer: '(x+1)/x',
            hint: 'Same denominator, so just subtract the numerators.',
            explanation: '(x+2)/x - 1/x = (x+2-1)/x = (x+1)/x'
          },
          {
            id: 'pq-1.2.3',
            question: 'Multiply: (2/3) × (3/4)',
            type: 'text',
            correctAnswer: '1/2',
            hint: 'Multiply numerators together and denominators together, then simplify.',
            explanation: '(2/3) × (3/4) = 6/12 = 1/2'
          }
        ]
      },
      {
        id: 'skill-1.3',
        title: 'Functions as Machines',
        description: 'Understanding f(x) as a machine that transforms input to output',
        lessons: [
          {
            id: 'lesson-1.3.1',
            title: 'The Function Machine',
            explanation: 'A function f(x) is like a vending machine. You put in a number (x), the machine does something to it (the rule), and spits out a result f(x). The key is: every input gives exactly ONE output. If you put in 3, you always get the same answer.',
            everydayExample: 'Think of a toaster. You put in bread (the input x), the toaster applies heat (the function rule), and you get toast (the output f(x)). If you put in the same bread at the same setting, you always get the same toast. That\'s what a function does — it\'s a reliable machine.',
            keyConcept: 'f(x) means "apply the rule f to the value x". To evaluate f(3), replace every x in the formula with 3.',
            workedExample: {
              problem: 'If f(x) = 2x² + 3x - 1, find f(2)',
              steps: [
                'Replace every x with 2: f(2) = 2(2)² + 3(2) - 1',
                'Calculate (2)² = 4',
                'Multiply: 2(4) = 8, and 3(2) = 6',
                'Add and subtract: 8 + 6 - 1 = 13'
              ],
              answer: 'f(2) = 13'
            }
          }
        ],
        practice: [
          {
            id: 'pq-1.3.1',
            question: 'If f(x) = x² + 2x, what is f(3)?',
            type: 'text',
            correctAnswer: '15',
            hint: 'Replace every x with 3: f(3) = (3)² + 2(3)',
            explanation: 'f(3) = 3² + 2(3) = 9 + 6 = 15'
          },
          {
            id: 'pq-1.3.2',
            question: 'If g(x) = 3x - 7, what is g(5)?',
            type: 'text',
            correctAnswer: '8',
            hint: 'Replace x with 5: g(5) = 3(5) - 7',
            explanation: 'g(5) = 3(5) - 7 = 15 - 7 = 8'
          },
          {
            id: 'pq-1.3.3',
            question: 'If h(x) = x² - 4x + 4, what is h(2)?',
            type: 'text',
            correctAnswer: '0',
            hint: 'Replace x with 2: h(2) = (2)² - 4(2) + 4',
            explanation: 'h(2) = 4 - 8 + 4 = 0. Notice this is (x-2)², so h(2) = 0² = 0.'
          }
        ]
      },
      {
        id: 'skill-1.4',
        title: 'Domain & Range',
        description: 'What numbers are "allowed" in the function machine?',
        lessons: [
          {
            id: 'lesson-1.4.1',
            title: 'What Can Go In?',
            explanation: 'The domain is the set of all "allowed" inputs for a function. Think of it as the list of valid coins a vending machine accepts. Some machines only take quarters — that\'s their "domain." Two things break functions: dividing by zero, and taking square roots of negative numbers.',
            everydayExample: 'Imagine a coffee machine that only accepts R1, R2, and R5 coins. Its "domain" is {1, 2, 5}. If you try to put in a R10 coin, the machine rejects it. Similarly, f(x) = 1/x rejects x = 0 because you can\'t divide by zero — the machine "breaks."',
            keyConcept: 'Domain restrictions come from: (1) Division by zero → set denominator ≠ 0, (2) Square root of negative → set inside ≥ 0',
            workedExample: {
              problem: 'Find the domain of f(x) = 1/(x-3)',
              steps: [
                'The function has a fraction, so the denominator cannot be zero',
                'Set denominator ≠ 0: x - 3 ≠ 0',
                'Solve: x ≠ 3',
                'Domain: all real numbers except 3, written as {x ∈ ℝ : x ≠ 3} or (-∞, 3) ∪ (3, +∞)'
              ],
              answer: 'All real numbers except 3: x ≠ 3'
            }
          }
        ],
        practice: [
          {
            id: 'pq-1.4.1',
            question: 'What value of x is NOT in the domain of f(x) = 1/(x+2)?',
            type: 'text',
            correctAnswer: '-2',
            hint: 'Set the denominator equal to zero and solve for x.',
            explanation: 'x + 2 = 0 → x = -2. The function is undefined at x = -2 because we\'d be dividing by zero.'
          },
          {
            id: 'pq-1.4.2',
            question: 'Find the domain of f(x) = √(x-4). What is the smallest value x can be?',
            type: 'text',
            correctAnswer: '4',
            hint: 'The expression under a square root must be ≥ 0.',
            explanation: 'x - 4 ≥ 0 → x ≥ 4. The smallest value is 4.'
          },
          {
            id: 'pq-1.4.3',
            question: 'The domain of f(x) = x² is...',
            type: 'multiple-choice',
            options: ['x > 0', 'x ≥ 0', 'All real numbers', 'x ≠ 0'],
            correctAnswer: 'All real numbers',
            hint: 'Can you square any real number? Think about negative numbers...',
            explanation: 'You can square ANY real number — positive, negative, or zero. So the domain is all real numbers.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'The Language of Change',
    icon: '📐',
    goal: 'Understand what happens to a function as it gets infinitely close to a point.',
    skills: [
      {
        id: 'skill-2.1',
        title: 'Direct Substitution in Limits',
        description: 'The simplest way to evaluate limits',
        lessons: [
          {
            id: 'lesson-2.1.1',
            title: 'What is a Limit?',
            explanation: 'A limit asks: "What value does f(x) get closer and closer to as x approaches some number?" It\'s NOT asking what f(x) IS at that point — it\'s asking what f(x) is APPROACHING. Think of it as watching where someone is walking toward, not where they currently stand.',
            everydayExample: 'Imagine you\'re walking toward a wall. You keep going halfway each time. You never actually TOUCH the wall, but you\'re clearly heading toward it. The limit is the wall — the destination you\'re approaching, even if you never arrive.',
            keyConcept: 'lim(x→a) f(x) = L means: as x gets closer to a, f(x) gets closer to L. Try plugging in a directly first!',
            workedExample: {
              problem: 'Find lim(x→3) (x² + 1)',
              steps: [
                'Try direct substitution: plug in x = 3',
                'f(3) = 3² + 1 = 9 + 1 = 10',
                'Since we got a real number (not 0/0 or ∞), the limit is just 10'
              ],
              answer: 'lim(x→3) (x² + 1) = 10'
            }
          }
        ],
        practice: [
          {
            id: 'pq-2.1.1',
            question: 'Find lim(x→2) (3x + 1)',
            type: 'text',
            correctAnswer: '7',
            hint: 'Try plugging in x = 2 directly.',
            explanation: 'Direct substitution: 3(2) + 1 = 6 + 1 = 7'
          },
          {
            id: 'pq-2.1.2',
            question: 'Find lim(x→1) (x² - 3x + 5)',
            type: 'text',
            correctAnswer: '3',
            hint: 'Plug x = 1 into the expression.',
            explanation: 'Direct substitution: 1² - 3(1) + 5 = 1 - 3 + 5 = 3'
          }
        ]
      },
      {
        id: 'skill-2.2',
        title: 'Fixing "Broken" Limits',
        description: 'Using factoring to remove removable discontinuities',
        lessons: [
          {
            id: 'lesson-2.2.1',
            title: 'When Direct Substitution Gives 0/0',
            explanation: 'Sometimes when you plug in the value, you get 0/0. This doesn\'t mean "no answer" — it means "try harder!" The 0/0 is like a roadblock, but there\'s a detour. Factor the numerator and denominator, cancel the common factor, then try again.',
            everydayExample: 'Imagine two roads that seem to lead to the same dead end (0/0). But if you look closer, there\'s a hidden side road (a common factor). Take that side road, and suddenly the path is clear again.',
            keyConcept: 'If substitution gives 0/0: FACTOR → CANCEL → SUBSTITUTE again.',
            formula: 'lim(x→a) (x²-a²)/(x-a) = lim(x→a) (x+a)(x-a)/(x-a) = lim(x→a) (x+a) = 2a',
            workedExample: {
              problem: 'Find lim(x→2) (x²-4)/(x-2)',
              steps: [
                'Try direct substitution: (4-4)/(2-2) = 0/0 ← broken!',
                'Factor numerator: x²-4 = (x-2)(x+2)',
                'Cancel common factor: (x-2)(x+2)/(x-2) = (x+2)',
                'Now substitute: 2+2 = 4'
              ],
              answer: 'lim(x→2) (x²-4)/(x-2) = 4'
            }
          }
        ],
        practice: [
          {
            id: 'pq-2.2.1',
            question: 'Find lim(x→3) (x²-9)/(x-3)',
            type: 'text',
            correctAnswer: '6',
            hint: 'Factor x²-9 as (x-3)(x+3), then cancel.',
            explanation: '(x²-9)/(x-3) = (x-3)(x+3)/(x-3) = x+3. At x=3: 3+3 = 6.'
          },
          {
            id: 'pq-2.2.2',
            question: 'Find lim(x→1) (x²-1)/(x-1)',
            type: 'text',
            correctAnswer: '2',
            hint: 'Factor x²-1 as (x-1)(x+1).',
            explanation: '(x²-1)/(x-1) = (x-1)(x+1)/(x-1) = x+1. At x=1: 1+1 = 2.'
          }
        ]
      },
      {
        id: 'skill-2.3',
        title: 'Limits at Infinity',
        description: 'What happens when x grows without bound',
        lessons: [
          {
            id: 'lesson-2.3.1',
            title: 'Approaching Infinity',
            explanation: 'When x → ∞, we ask: "What happens to f(x) as x gets astronomically large?" The key insight: the highest power of x dominates. Lower powers become insignificant. Think of it like a rich person\'s wealth — if they have billions, a few extra dollars don\'t matter.',
            everydayExample: 'If you\'re sharing a pizza with 1 person, you get half. With 100 people, you get a tiny sliver. With 1 billion people... you get essentially nothing. As the number of people → ∞, your share → 0. That\'s like 1/x as x → ∞.',
            keyConcept: 'For rational functions: compare degrees. Same degree → ratio of leading coefficients. Higher bottom → limit is 0. Higher top → limit is ±∞.',
            workedExample: {
              problem: 'Find lim(x→∞) (3x² + 2x)/(x² - 1)',
              steps: [
                'Both top and bottom have degree 2 (same degree)',
                'Divide everything by x² (highest power)',
                '= (3 + 2/x)/(1 - 1/x²)',
                'As x → ∞: 2/x → 0 and 1/x² → 0',
                '= (3 + 0)/(1 - 0) = 3/1 = 3'
              ],
              answer: 'lim(x→∞) (3x² + 2x)/(x² - 1) = 3'
            }
          }
        ],
        practice: [
          {
            id: 'pq-2.3.1',
            question: 'Find lim(x→∞) 1/x',
            type: 'text',
            correctAnswer: '0',
            hint: 'As x gets very large, what happens to 1 divided by a huge number?',
            explanation: 'As x → ∞, 1/x → 0. A fixed number divided by an ever-growing number approaches zero.'
          },
          {
            id: 'pq-2.3.2',
            question: 'Find lim(x→∞) (5x + 3)/(2x + 1)',
            type: 'text',
            correctAnswer: '5/2',
            hint: 'Same degree (1) on top and bottom. Take ratio of leading coefficients.',
            explanation: 'Same degree → ratio of leading coefficients: 5/2.'
          }
        ]
      },
      {
        id: 'skill-2.4',
        title: 'Continuity',
        description: 'Making piecewise functions connect smoothly',
        lessons: [
          {
            id: 'lesson-2.4.1',
            title: 'What is Continuity?',
            explanation: 'A function is continuous at a point if you can draw it without lifting your pen. Mathematically, three things must be true: (1) f(a) exists, (2) the limit as x→a exists, and (3) they\'re equal. For piecewise functions, we need the two pieces to "meet" at the boundary.',
            everydayExample: 'Think of a road. If there\'s a gap in the road, cars can\'t drive through — that\'s discontinuity. A continuous road has no gaps, no jumps, no sudden teleportation. The road smoothly connects from one section to the next.',
            keyConcept: 'For piecewise functions at the boundary x = a: set left piece = right piece at x = a to ensure continuity.',
            workedExample: {
              problem: 'Find k so that f(x) = {x² if x≤2, kx+1 if x>2} is continuous at x=2',
              steps: [
                'For continuity: left limit = right limit = f(2)',
                'Left piece at x=2: f(2) = 2² = 4',
                'Right piece at x=2: k(2) + 1 = 2k + 1',
                'Set them equal: 4 = 2k + 1',
                'Solve: 2k = 3, so k = 3/2'
              ],
              answer: 'k = 3/2'
            }
          }
        ],
        practice: [
          {
            id: 'pq-2.4.1',
            question: 'If f(x) = {2x if x<1, x+k if x≥1}, find k for continuity at x=1.',
            type: 'text',
            correctAnswer: '1',
            hint: 'Set the left piece equal to the right piece at x=1.',
            explanation: 'Left: 2(1) = 2. Right: 1+k. Set equal: 2 = 1+k, so k = 1.'
          },
          {
            id: 'pq-2.4.2',
            question: 'Is f(x) = x² continuous at x = 3?',
            type: 'multiple-choice',
            options: ['Yes', 'No', 'Only from the left', 'Only from the right'],
            correctAnswer: 'Yes',
            hint: 'Polynomials are always continuous everywhere.',
            explanation: 'Yes! Polynomials (like x²) are continuous everywhere. There are no breaks, holes, or jumps.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'Chance & Counting',
    icon: '🎲',
    goal: 'Master the most forgiving section of the exam. This relies on logic and basic arithmetic, not complex calculus.',
    skills: [
      {
        id: 'skill-3.1',
        title: 'Basic Probability',
        description: 'Favorable outcomes divided by total outcomes',
        lessons: [
          {
            id: 'lesson-3.1.1',
            title: 'Probability as a Fraction',
            explanation: 'Probability is simply: (number of ways something can happen) / (total number of possible outcomes). It\'s always between 0 (impossible) and 1 (certain). A probability of 0.5 means it\'s a coin flip — equally likely to happen or not.',
            everydayExample: 'If you have a bag with 3 red balls and 7 blue balls, the probability of picking red is 3/(3+7) = 3/10. It\'s just counting: how many "good" outcomes vs how many total outcomes.',
            keyConcept: 'P(event) = favorable outcomes / total outcomes. Always between 0 and 1.',
            workedExample: {
              problem: 'A die is rolled. What is the probability of getting an even number?',
              steps: [
                'Total outcomes: {1, 2, 3, 4, 5, 6} → 6 outcomes',
                'Even numbers: {2, 4, 6} → 3 favorable outcomes',
                'P(even) = 3/6 = 1/2'
              ],
              answer: 'P(even) = 1/2'
            }
          }
        ],
        practice: [
          {
            id: 'pq-3.1.1',
            question: 'A bag has 4 red and 6 blue marbles. P(red) = ?',
            type: 'text',
            correctAnswer: '2/5',
            hint: 'Total marbles = 4 + 6 = 10. Favorable = 4.',
            explanation: 'P(red) = 4/10 = 2/5'
          },
          {
            id: 'pq-3.1.2',
            question: 'What is the probability of rolling a number greater than 4 on a standard die?',
            type: 'text',
            correctAnswer: '1/3',
            hint: 'Numbers greater than 4 on a die: 5 and 6.',
            explanation: 'Favorable: {5, 6} = 2 outcomes. Total: 6. P = 2/6 = 1/3.'
          }
        ]
      },
      {
        id: 'skill-3.2',
        title: 'AND vs OR Rules',
        description: 'Intersection and Union of events',
        lessons: [
          {
            id: 'lesson-3.2.1',
            title: 'When to Multiply vs Add',
            explanation: 'AND means BOTH events must happen → MULTIPLY probabilities. OR means EITHER event can happen → ADD probabilities (but subtract the overlap to avoid double-counting).',
            everydayExample: 'AND: "What\'s the chance it rains AND I forget my umbrella?" — Both must happen, so multiply. OR: "What\'s the chance it rains OR I forget my umbrella?" — Either one is enough, so add (but don\'t double-count the times both happen).',
            keyConcept: 'P(A AND B) = P(A) × P(B) [if independent]. P(A OR B) = P(A) + P(B) - P(A AND B)',
            workedExample: {
              problem: 'P(A) = 0.3, P(B) = 0.4, A and B are independent. Find P(A AND B) and P(A OR B).',
              steps: [
                'P(A AND B) = P(A) × P(B) = 0.3 × 0.4 = 0.12',
                'P(A OR B) = P(A) + P(B) - P(A AND B)',
                '= 0.3 + 0.4 - 0.12 = 0.58'
              ],
              answer: 'P(A AND B) = 0.12, P(A OR B) = 0.58'
            }
          }
        ],
        practice: [
          {
            id: 'pq-3.2.1',
            question: 'P(A) = 0.5, P(B) = 0.2, independent. P(A AND B) = ?',
            type: 'text',
            correctAnswer: '0.1',
            hint: 'Independent AND = multiply.',
            explanation: 'P(A AND B) = 0.5 × 0.2 = 0.1'
          },
          {
            id: 'pq-3.2.2',
            question: 'P(A) = 0.6, P(B) = 0.3, P(A AND B) = 0.1. P(A OR B) = ?',
            type: 'text',
            correctAnswer: '0.8',
            hint: 'P(A OR B) = P(A) + P(B) - P(A AND B)',
            explanation: 'P(A OR B) = 0.6 + 0.3 - 0.1 = 0.8'
          }
        ]
      },
      {
        id: 'skill-3.3',
        title: 'Conditional Probability',
        description: 'Probability given that something already happened',
        lessons: [
          {
            id: 'lesson-3.3.1',
            title: 'Given That...',
            explanation: 'Conditional probability asks: "Given that we KNOW event B happened, what\'s the probability of A?" It shrinks our sample space. We only look at cases where B happened, and ask: in those cases, how often did A also happen?',
            everydayExample: 'Imagine a class of 100 students. 60 passed math, 40 passed English, 30 passed both. If I tell you "this student passed math," what\'s the chance they also passed English? Now we only look at the 60 who passed math, and 30 of those also passed English. So P(English|Math) = 30/60 = 0.5.',
            keyConcept: 'P(A|B) = P(A AND B) / P(B). Read "P(A|B)" as "probability of A GIVEN B."',
            workedExample: {
              problem: 'In a factory, Machine X makes 60% of products with 2% defect rate. Machine Y makes 40% with 5% defect rate. Given a product is defective, what\'s the probability it came from Machine X?',
              steps: [
                'P(defective AND X) = 0.6 × 0.02 = 0.012',
                'P(defective AND Y) = 0.4 × 0.05 = 0.020',
                'P(defective) = 0.012 + 0.020 = 0.032',
                'P(X|defective) = P(defective AND X) / P(defective)',
                '= 0.012 / 0.032 = 0.375'
              ],
              answer: 'P(X|defective) = 0.375 or 37.5%'
            }
          }
        ],
        practice: [
          {
            id: 'pq-3.3.1',
            question: 'P(A) = 0.4, P(B) = 0.5, P(A AND B) = 0.2. Find P(A|B).',
            type: 'text',
            correctAnswer: '0.4',
            hint: 'P(A|B) = P(A AND B) / P(B)',
            explanation: 'P(A|B) = 0.2 / 0.5 = 0.4'
          },
          {
            id: 'pq-3.3.2',
            question: 'If P(A|B) = P(A), then A and B are...',
            type: 'multiple-choice',
            options: ['Dependent', 'Independent', 'Mutually exclusive', 'Complementary'],
            correctAnswer: 'Independent',
            hint: 'If knowing B happened doesn\'t change the probability of A...',
            explanation: 'If P(A|B) = P(A), then knowing B happened doesn\'t affect A\'s probability. That\'s the definition of independence.'
          }
        ]
      },
      {
        id: 'skill-3.4',
        title: 'Discrete Random Variables',
        description: 'Finding missing constants using the sum-to-1 rule',
        lessons: [
          {
            id: 'lesson-3.4.1',
            title: 'Probabilities Must Sum to 1',
            explanation: 'A discrete random variable has a probability distribution — a table showing P(X=x) for each possible value x. The golden rule: ALL probabilities must add up to exactly 1 (because something MUST happen). If there\'s a missing value k, just set the sum equal to 1 and solve.',
            everydayExample: 'Imagine a spinner divided into sections. The sections must cover the ENTIRE circle — no gaps, no overlaps. If you know the sizes of all sections except one, you can figure out the missing section by subtracting the known sections from the whole circle (which is 1 or 100%).',
            keyConcept: 'For a probability distribution: Σ P(X=x) = 1. Use this to find any unknown constant.',
            workedExample: {
              problem: 'X has distribution: P(X=1)=0.2, P(X=2)=k, P(X=3)=0.3, P(X=4)=0.1. Find k.',
              steps: [
                'All probabilities must sum to 1',
                '0.2 + k + 0.3 + 0.1 = 1',
                '0.6 + k = 1',
                'k = 1 - 0.6 = 0.4'
              ],
              answer: 'k = 0.4'
            }
          }
        ],
        practice: [
          {
            id: 'pq-3.4.1',
            question: 'P(X=0)=0.1, P(X=1)=k, P(X=2)=0.3, P(X=3)=0.2. Find k.',
            type: 'text',
            correctAnswer: '0.4',
            hint: 'Sum of all probabilities = 1.',
            explanation: '0.1 + k + 0.3 + 0.2 = 1 → k = 1 - 0.6 = 0.4'
          },
          {
            id: 'pq-3.4.2',
            question: 'P(X=1)=2k, P(X=2)=3k, P(X=3)=k. Find k.',
            type: 'text',
            correctAnswer: '1/6',
            hint: 'Sum = 1: 2k + 3k + k = 1',
            explanation: '2k + 3k + k = 6k = 1, so k = 1/6'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'Making Sense of Data',
    icon: '📊',
    goal: 'Learn to read tables and calculate key metrics. Highly formulaic and predictable.',
    skills: [
      {
        id: 'skill-4.1',
        title: 'Mean, Median, Mode',
        description: 'The three measures of central tendency',
        lessons: [
          {
            id: 'lesson-4.1.1',
            title: 'Three Ways to Find the "Center"',
            explanation: 'Mean = average (add all, divide by count). Median = middle value (sort first!). Mode = most frequent value. Each tells a different story about the data.',
            everydayExample: 'Salaries at a company: Mean is what you\'d earn if everyone pooled money and split equally. Median is what the "typical" person earns (half earn more, half earn less). Mode is the most common salary. If the CEO earns millions, the mean is misleading — median is better!',
            keyConcept: 'Mean = Σx/n. Median = middle value when sorted. Mode = most frequent value.',
            workedExample: {
              problem: 'Data: 3, 7, 7, 2, 9. Find mean, median, mode.',
              steps: [
                'Mean: (3+7+7+2+9)/5 = 28/5 = 5.6',
                'Sort: 2, 3, 7, 7, 9. Middle (3rd value) = 7',
                'Mode: 7 appears most often (twice)'
              ],
              answer: 'Mean = 5.6, Median = 7, Mode = 7'
            }
          }
        ],
        practice: [
          {
            id: 'pq-4.1.1',
            question: 'Find the mean of: 4, 8, 6, 10, 2',
            type: 'text',
            correctAnswer: '6',
            hint: 'Add them all up and divide by 5.',
            explanation: '(4+8+6+10+2)/5 = 30/5 = 6'
          },
          {
            id: 'pq-4.1.2',
            question: 'Find the median of: 12, 5, 8, 3, 15',
            type: 'text',
            correctAnswer: '8',
            hint: 'Sort first: 3, 5, 8, 12, 15. The middle value is...',
            explanation: 'Sorted: 3, 5, 8, 12, 15. Middle value (3rd) = 8.'
          }
        ]
      },
      {
        id: 'skill-4.2',
        title: 'Grouped Data Tables',
        description: 'Working with frequency tables and finding missing values',
        lessons: [
          {
            id: 'lesson-4.2.1',
            title: 'Reading Frequency Tables',
            explanation: 'When data is grouped into ranges (like salary brackets), we use the midpoint of each group as a "representative" value. Multiply each midpoint by its frequency, sum up, and divide by total frequency to get the mean.',
            everydayExample: 'A teacher doesn\'t know each student\'s exact test score, but knows how many scored in each range (0-20, 21-40, etc.). She uses the middle of each range as a best guess for students in that group.',
            keyConcept: 'Mean for grouped data = Σ(f × midpoint) / Σf. Use midpoints as representative values.',
            workedExample: {
              problem: 'Table: Score 10-20 (f=3), 21-30 (f=5), 31-40 (f=2). Find the mean.',
              steps: [
                'Midpoints: 15, 25.5→25, 35',
                'f × midpoint: 3(15)=45, 5(25)=125, 2(35)=70',
                'Σ(f×midpoint) = 45+125+70 = 240',
                'Σf = 3+5+2 = 10',
                'Mean = 240/10 = 24'
              ],
              answer: 'Mean ≈ 24'
            }
          }
        ],
        practice: [
          {
            id: 'pq-4.2.1',
            question: 'Table: Value 5(f=2), 10(f=3), 15(f=5). Mean = ?',
            type: 'text',
            correctAnswer: '11.5',
            hint: 'Σ(f×x)/Σf = (2×5 + 3×10 + 5×15)/(2+3+5)',
            explanation: '(10+30+75)/10 = 115/10 = 11.5'
          },
          {
            id: 'pq-4.2.2',
            question: 'If total frequency is 20 and Σ(f×x) = 160, what is the mean?',
            type: 'text',
            correctAnswer: '8',
            hint: 'Mean = Σ(f×x) / Σf',
            explanation: 'Mean = 160/20 = 8'
          }
        ]
      },
      {
        id: 'skill-4.3',
        title: 'Variance & Standard Deviation',
        description: 'Measuring how spread out the data is',
        lessons: [
          {
            id: 'lesson-4.3.1',
            title: 'How Spread Out is the Data?',
            explanation: 'Variance measures the average squared distance from the mean. Standard deviation is the square root of variance — it\'s in the same units as the original data. High SD = data is spread out. Low SD = data is clustered near the mean.',
            everydayExample: 'Two classes both have an average test score of 70. Class A: everyone scored 68-72 (low SD — consistent). Class B: some got 40, some got 100 (high SD — unpredictable). Same mean, very different spread!',
            keyConcept: 'Variance σ² = Σ(x-mean)²/n. Standard Deviation σ = √(variance).',
            workedExample: {
              problem: 'Data: 2, 4, 6. Find variance and standard deviation.',
              steps: [
                'Mean = (2+4+6)/3 = 4',
                'Deviations: (2-4)²=4, (4-4)²=0, (6-4)²=4',
                'Variance = (4+0+4)/3 = 8/3 ≈ 2.67',
                'SD = √(8/3) ≈ 1.63'
              ],
              answer: 'Variance = 8/3 ≈ 2.67, SD ≈ 1.63'
            }
          }
        ],
        practice: [
          {
            id: 'pq-4.3.1',
            question: 'Data: 1, 3, 5. Find the variance (as a fraction).',
            type: 'text',
            correctAnswer: '8/3',
            hint: 'Mean = 3. Deviations: (1-3)²=4, (3-3)²=0, (5-3)²=4. Sum=8. Divide by 3.',
            explanation: 'Mean=3. Variance = (4+0+4)/3 = 8/3 ≈ 2.67'
          },
          {
            id: 'pq-4.3.2',
            question: 'If variance = 16, what is the standard deviation?',
            type: 'text',
            correctAnswer: '4',
            hint: 'SD = √(variance)',
            explanation: 'SD = √16 = 4'
          }
        ]
      },
      {
        id: 'skill-4.4',
        title: 'Quartiles & Box Plots',
        description: 'Dividing data into quarters',
        lessons: [
          {
            id: 'lesson-4.4.1',
            title: 'The Five-Number Summary',
            explanation: 'Quartiles divide sorted data into 4 equal parts. Q1 = 25th percentile, Q2 = median (50th), Q3 = 75th percentile. A box plot shows: minimum, Q1, median, Q3, maximum. The "box" spans Q1 to Q3 (the middle 50% of data).',
            everydayExample: 'Think of exam results. The bottom 25% failed badly (below Q1). The middle 50% did okay (between Q1 and Q3). The top 25% aced it (above Q3). The box plot shows you this at a glance.',
            keyConcept: 'Q1 = median of lower half. Q2 = median of all data. Q3 = median of upper half. IQR = Q3 - Q1.',
            workedExample: {
              problem: 'Data: 2, 5, 7, 9, 12, 15, 18, 20. Find Q1, Q2, Q3.',
              steps: [
                'Sorted: 2, 5, 7, 9, 12, 15, 18, 20 (n=8)',
                'Q2 (median) = average of 4th and 5th = (9+12)/2 = 10.5',
                'Lower half: 2, 5, 7, 9. Q1 = (5+7)/2 = 6',
                'Upper half: 12, 15, 18, 20. Q3 = (15+18)/2 = 16.5'
              ],
              answer: 'Q1=6, Q2=10.5, Q3=16.5'
            }
          }
        ],
        practice: [
          {
            id: 'pq-4.4.1',
            question: 'Data: 3, 6, 8, 10, 14, 17, 20. What is the median (Q2)?',
            type: 'text',
            correctAnswer: '10',
            hint: '7 values sorted. The middle (4th) value is...',
            explanation: 'Middle value (4th of 7) = 10'
          },
          {
            id: 'pq-4.4.2',
            question: 'If Q1 = 20 and Q3 = 40, what is the IQR?',
            type: 'text',
            correctAnswer: '20',
            hint: 'IQR = Q3 - Q1',
            explanation: 'IQR = 40 - 20 = 20'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    number: 5,
    title: 'The Calculus Engine',
    icon: '⚙️',
    goal: 'Demystify calculus by treating it as a set of "recipes" rather than magic.',
    skills: [
      {
        id: 'skill-5.1',
        title: 'The Power Rule',
        description: 'The foundation of all differentiation',
        lessons: [
          {
            id: 'lesson-5.1.1',
            title: 'Bring Down, Reduce by One',
            explanation: 'The power rule is the most basic differentiation rule: if f(x) = xⁿ, then f\'(x) = nxⁿ⁻¹. Just bring the power down as a coefficient and reduce the power by 1. That\'s it! For axⁿ, it becomes anxⁿ⁻¹.',
            everydayExample: 'Think of it like a recipe transformation. The power rule says: "Whatever number is on top (the exponent), drag it down to the front, then reduce it by 1." It\'s like a conveyor belt that moves the exponent and decrements it.',
            keyConcept: 'd/dx [xⁿ] = nxⁿ⁻¹. d/dx [axⁿ] = anxⁿ⁻¹. d/dx [c] = 0 (constants disappear).',
            workedExample: {
              problem: 'Differentiate f(x) = 3x⁴ - 2x² + 5x - 7',
              steps: [
                '3x⁴ → 3(4)x³ = 12x³',
                '-2x² → -2(2)x¹ = -4x',
                '5x → 5(1)x⁰ = 5',
                '-7 → 0 (constant disappears)',
                'f\'(x) = 12x³ - 4x + 5'
              ],
              answer: 'f\'(x) = 12x³ - 4x + 5'
            }
          }
        ],
        practice: [
          {
            id: 'pq-5.1.1',
            question: 'Differentiate f(x) = x⁵. f\'(x) = ?',
            type: 'text',
            correctAnswer: '5x⁴',
            hint: 'Bring the 5 down, reduce power by 1.',
            explanation: 'f\'(x) = 5x⁴'
          },
          {
            id: 'pq-5.1.2',
            question: 'Differentiate f(x) = 4x³ + 2x. f\'(x) = ?',
            type: 'text',
            correctAnswer: '12x²+2',
            hint: 'Apply power rule to each term separately.',
            explanation: 'f\'(x) = 4(3)x² + 2(1) = 12x² + 2'
          },
          {
            id: 'pq-5.1.3',
            question: 'What is the derivative of a constant, like f(x) = 7?',
            type: 'text',
            correctAnswer: '0',
            hint: 'Constants don\'t change, so their rate of change is...',
            explanation: 'The derivative of any constant is 0. A flat line has zero slope.'
          }
        ]
      },
      {
        id: 'skill-5.2',
        title: 'Chain Rule & Product Rule',
        description: 'Handling composite and multiplied functions',
        lessons: [
          {
            id: 'lesson-5.2.1',
            title: 'Functions Inside Functions',
            explanation: 'Chain Rule: For f(g(x)), differentiate the outside function (leaving inside unchanged), then multiply by the derivative of the inside. Product Rule: For f(x)·g(x), the derivative is f\'g + fg\'. (First times derivative of second + second times derivative of first)',
            everydayExample: 'Chain Rule is like peeling an onion. You deal with the outer layer first, then the inner layer. If you\'re wearing a jacket over a shirt, you take off the jacket first (outer function), then the shirt (inner function).',
            keyConcept: 'Chain: d/dx[f(g(x))] = f\'(g(x)) × g\'(x). Product: d/dx[f·g] = f\'g + fg\'',
            workedExample: {
              problem: 'Differentiate f(x) = (3x+1)⁴',
              steps: [
                'Outer function: ( )⁴ → derivative: 4( )³',
                'Inner function: 3x+1 → derivative: 3',
                'Chain rule: 4(3x+1)³ × 3',
                'f\'(x) = 12(3x+1)³'
              ],
              answer: 'f\'(x) = 12(3x+1)³'
            }
          }
        ],
        practice: [
          {
            id: 'pq-5.2.1',
            question: 'Differentiate f(x) = (2x)³ using chain rule. f\'(x) = ?',
            type: 'text',
            correctAnswer: '24x²',
            hint: 'Outer: 3( )². Inner derivative: 2. Multiply: 3(2x)² × 2 = 6(4x²) = 24x²',
            explanation: 'f\'(x) = 3(2x)² × 2 = 6(2x)² = 6(4x²) = 24x²'
          },
          {
            id: 'pq-5.2.2',
            question: 'Using product rule: d/dx[x² · x³] = ?',
            type: 'text',
            correctAnswer: '5x⁴',
            hint: 'f\'g + fg\' = 2x·x³ + x²·3x² = 2x⁴ + 3x⁴',
            explanation: '2x·x³ + x²·3x² = 2x⁴ + 3x⁴ = 5x⁴. (Or note x²·x³ = x⁵, d/dx = 5x⁴ ✓)'
          }
        ]
      },
      {
        id: 'skill-5.3',
        title: 'Basic Integration',
        description: 'The reverse of differentiation',
        lessons: [
          {
            id: 'lesson-5.3.1',
            title: 'Undoing the Power Rule',
            explanation: 'Integration is the REVERSE of differentiation. If differentiation brings the power down and reduces by 1, integration ADDS 1 to the power and divides by the new power. Don\'t forget the +C (constant of integration)!',
            everydayExample: 'If differentiation is "unwrapping a present" (removing the wrapping), integration is "wrapping it back up." You reverse the process. The +C is like saying "I don\'t know what color the box was" — any constant could have been there.',
            keyConcept: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C. ∫axⁿ dx = axⁿ⁺¹/(n+1) + C.',
            workedExample: {
              problem: 'Find ∫(3x² + 4x - 5) dx',
              steps: [
                '∫3x² dx = 3x³/3 = x³',
                '∫4x dx = 4x²/2 = 2x²',
                '∫-5 dx = -5x',
                'Add constant: + C',
                'Answer: x³ + 2x² - 5x + C'
              ],
              answer: 'x³ + 2x² - 5x + C'
            }
          }
        ],
        practice: [
          {
            id: 'pq-5.3.1',
            question: 'Find ∫x³ dx',
            type: 'text',
            correctAnswer: 'x⁴/4+C',
            hint: 'Add 1 to the power (3→4), divide by new power.',
            explanation: '∫x³ dx = x⁴/4 + C'
          },
          {
            id: 'pq-5.3.2',
            question: 'Find ∫6x² dx',
            type: 'text',
            correctAnswer: '2x³+C',
            hint: '6x^(2+1)/(2+1) = 6x³/3 = 2x³',
            explanation: '∫6x² dx = 6x³/3 + C = 2x³ + C'
          }
        ]
      },
      {
        id: 'skill-5.4',
        title: 'Definite Integrals',
        description: 'Plugging in bounds and subtracting',
        lessons: [
          {
            id: 'lesson-5.4.1',
            title: 'From Indefinite to Definite',
            explanation: 'A definite integral has specific upper and lower bounds. The process: (1) Find the indefinite integral (antiderivative), (2) Plug in the upper bound, (3) Plug in the lower bound, (4) Subtract: F(upper) - F(lower). No +C needed!',
            everydayExample: 'Think of it like a bank account. The indefinite integral is your balance formula. The definite integral from month 1 to month 6 asks: "How much did my balance CHANGE?" You check the balance at month 6, subtract the balance at month 1.',
            keyConcept: '∫[a to b] f(x)dx = F(b) - F(a), where F is the antiderivative of f.',
            workedExample: {
              problem: 'Evaluate ∫[1 to 3] 2x dx',
              steps: [
                'Find antiderivative: F(x) = x²',
                'F(3) = 3² = 9',
                'F(1) = 1² = 1',
                'F(3) - F(1) = 9 - 1 = 8'
              ],
              answer: '∫[1 to 3] 2x dx = 8'
            }
          }
        ],
        practice: [
          {
            id: 'pq-5.4.1',
            question: 'Evaluate ∫[0 to 2] 3x² dx',
            type: 'text',
            correctAnswer: '8',
            hint: 'Antiderivative is x³. Evaluate at 2 and 0, subtract.',
            explanation: 'F(x) = x³. F(2) - F(0) = 8 - 0 = 8.'
          },
          {
            id: 'pq-5.4.2',
            question: 'Evaluate ∫[1 to 4] 1 dx',
            type: 'text',
            correctAnswer: '3',
            hint: 'Antiderivative of 1 is x. Evaluate: 4 - 1.',
            explanation: 'F(x) = x. F(4) - F(1) = 4 - 1 = 3.'
          }
        ]
      },
      {
        id: 'skill-5.5',
        title: 'Partial Derivatives',
        description: 'Differentiating with respect to one variable at a time',
        lessons: [
          {
            id: 'lesson-5.5.1',
            title: 'One Variable at a Time',
            explanation: 'When a function has multiple variables like f(x,y), a partial derivative asks: "How does f change if ONLY x changes?" Treat all other variables as constants. fₓ means differentiate with respect to x (treat y as a number). fᵧ means differentiate with respect to y (treat x as a number).',
            everydayExample: 'Imagine your happiness depends on both sleep (x) and food (y). The partial derivative with respect to sleep asks: "If I keep food constant and get more sleep, how does happiness change?" You\'re only looking at one factor at a time.',
            keyConcept: 'For fₓ: treat y as a constant, differentiate normally with respect to x. For fᵧ: treat x as a constant.',
            workedExample: {
              problem: 'f(x,y) = 3x²y + 2xy³. Find fₓ and fᵧ.',
              steps: [
                'fₓ: treat y as constant',
                '3x²y → 6xy (y is constant, power rule on x)',
                '2xy³ → 2y³ (y³ is constant, derivative of x is 1)',
                'fₓ = 6xy + 2y³',
                'fᵧ: treat x as constant',
                '3x²y → 3x² (x² is constant, derivative of y is 1)',
                '2xy³ → 6xy² (x is constant, power rule on y)',
                'fᵧ = 3x² + 6xy²'
              ],
              answer: 'fₓ = 6xy + 2y³, fᵧ = 3x² + 6xy²'
            }
          }
        ],
        practice: [
          {
            id: 'pq-5.5.1',
            question: 'f(x,y) = x²y + 3y². Find fₓ.',
            type: 'text',
            correctAnswer: '2xy',
            hint: 'Treat y as constant. Differentiate x²y with respect to x.',
            explanation: 'fₓ = 2xy + 0 = 2xy (3y² has no x, so it\'s 0)'
          },
          {
            id: 'pq-5.5.2',
            question: 'f(x,y) = x³ + 2xy. Find fᵧ.',
            type: 'text',
            correctAnswer: '2x',
            hint: 'Treat x as constant. Differentiate with respect to y.',
            explanation: 'fᵧ = 0 + 2x = 2x (x³ has no y, so it\'s 0)'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-6',
    number: 6,
    title: 'Advanced Engineering Tools',
    icon: '🔧',
    goal: 'Tackle the high-mark, intimidating-looking questions using step-by-step templates.',
    skills: [
      {
        id: 'skill-6.1',
        title: 'Vectors',
        description: 'Dot product and magnitude',
        lessons: [
          {
            id: 'lesson-6.1.1',
            title: 'Vectors: Direction + Magnitude',
            explanation: 'A vector has both size (magnitude) and direction. The dot product of two vectors gives a scalar (number) that tells you how "aligned" they are. If vectors point in the same direction, dot product is large. If perpendicular, dot product is zero.',
            everydayExample: 'Think of wind pushing a sailboat. The wind is a vector (has speed and direction). The sail orientation is another vector. The dot product tells you how much of the wind actually pushes the boat forward. If wind is perpendicular to the sail, it doesn\'t help at all (dot product = 0).',
            keyConcept: 'a⃗·b⃗ = a₁b₁ + a₂b₂ + a₃b₃. |a⃗| = √(a₁² + a₂² + a₃²)',
            workedExample: {
              problem: 'a⃗ = (2, 3, 1), b⃗ = (4, -1, 2). Find a⃗·b⃗ and |a⃗|.',
              steps: [
                'Dot product: (2)(4) + (3)(-1) + (1)(2) = 8 - 3 + 2 = 7',
                '|a⃗| = √(2² + 3² + 1²) = √(4 + 9 + 1) = √14'
              ],
              answer: 'a⃗·b⃗ = 7, |a⃗| = √14'
            }
          }
        ],
        practice: [
          {
            id: 'pq-6.1.1',
            question: 'Find the dot product of (1, 2, 3) and (4, -1, 2).',
            type: 'text',
            correctAnswer: '8',
            hint: '(1)(4) + (2)(-1) + (3)(2)',
            explanation: '4 + (-2) + 6 = 8'
          },
          {
            id: 'pq-6.1.2',
            question: 'Find |v⃗| where v⃗ = (3, 4).',
            type: 'text',
            correctAnswer: '5',
            hint: '|v⃗| = √(3² + 4²)',
            explanation: '|v⃗| = √(9 + 16) = √25 = 5'
          }
        ]
      },
      {
        id: 'skill-6.2',
        title: 'Vector Calculus',
        description: 'Gradient, Divergence, and Curl',
        lessons: [
          {
            id: 'lesson-6.2.1',
            title: 'Grad, Div, Curl Recipes',
            explanation: 'These are just formulas you plug into. Gradient (grad f) gives a vector field from a scalar function. Divergence (div F⃗) gives a scalar from a vector field. Curl (curl F⃗) gives a vector from a vector field. They\'re all just partial derivatives arranged differently.',
            everydayExample: 'Gradient: Like a topographic map showing which direction is "uphill" at every point. Divergence: Like checking if water is "spreading out" (positive) or "converging" (negative) at a point. Curl: Like checking if water is "swirling" at a point.',
            keyConcept: 'grad f = (∂f/∂x, ∂f/∂y, ∂f/∂z). div F⃗ = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z.',
            workedExample: {
              problem: 'F⃗ = (x²y, 2yz, -z²). Find div F⃗.',
              steps: [
                '∂/∂x (x²y) = 2xy',
                '∂/∂y (2yz) = 2z',
                '∂/∂z (-z²) = -2z',
                'div F⃗ = 2xy + 2z + (-2z) = 2xy'
              ],
              answer: 'div F⃗ = 2xy'
            }
          }
        ],
        practice: [
          {
            id: 'pq-6.2.1',
            question: 'f(x,y,z) = x² + y² + z². Find ∂f/∂x.',
            type: 'text',
            correctAnswer: '2x',
            hint: 'Treat y and z as constants.',
            explanation: '∂f/∂x = 2x (y² and z² are constants, their derivatives are 0)'
          },
          {
            id: 'pq-6.2.2',
            question: 'F⃗ = (3x, 2y, z). Find div F⃗.',
            type: 'text',
            correctAnswer: '6',
            hint: 'div = ∂(3x)/∂x + ∂(2y)/∂y + ∂(z)/∂z',
            explanation: 'div F⃗ = 3 + 2 + 1 = 6'
          }
        ]
      },
      {
        id: 'skill-6.3',
        title: 'Laplace Transform',
        description: 'Converting functions from time domain to s-domain',
        lessons: [
          {
            id: 'lesson-6.3.1',
            title: 'The Transform Dictionary',
            explanation: 'Laplace transforms convert differential equations into algebra (easier to solve!). Think of it as a translation dictionary: each time-domain function has an s-domain equivalent. The most important ones: L{1} = 1/s, L{t} = 1/s², L{eᵃᵗ} = 1/(s-a), L{tⁿ} = n!/sⁿ⁺¹.',
            everydayExample: 'It\'s like converting a recipe from Celsius to Fahrenheit. The recipe is the same, just expressed differently. Some problems are MUCH easier in "s-language" than in "t-language." Solve in s, then convert back.',
            keyConcept: 'L{1} = 1/s, L{t} = 1/s², L{tⁿ} = n!/sⁿ⁺¹, L{eᵃᵗ} = 1/(s-a)',
            workedExample: {
              problem: 'Find L{3t² + 2t + 1}',
              steps: [
                'L{3t²} = 3 × 2!/s³ = 6/s³',
                'L{2t} = 2 × 1!/s² = 2/s²',
                'L{1} = 1/s',
                'L{3t² + 2t + 1} = 6/s³ + 2/s² + 1/s'
              ],
              answer: '6/s³ + 2/s² + 1/s'
            }
          }
        ],
        practice: [
          {
            id: 'pq-6.3.1',
            question: 'Find L{1}.',
            type: 'text',
            correctAnswer: '1/s',
            hint: 'This is the most basic Laplace transform.',
            explanation: 'L{1} = 1/s'
          },
          {
            id: 'pq-6.3.2',
            question: 'Find L{t}.',
            type: 'text',
            correctAnswer: '1/s²',
            hint: 'L{tⁿ} = n!/sⁿ⁺¹. Here n=1.',
            explanation: 'L{t} = 1!/s² = 1/s²'
          }
        ]
      },
      {
        id: 'skill-6.4',
        title: 'Solving ODEs with Laplace',
        description: 'A strict 4-step recipe',
        lessons: [
          {
            id: 'lesson-6.4.1',
            title: 'The 4-Step Recipe',
            explanation: 'Solving differential equations with Laplace follows a strict recipe: (1) Take Laplace of both sides, (2) Plug in initial conditions, (3) Solve for Y(s), (4) Take inverse Laplace to get y(t).',
            everydayExample: 'It\'s like solving a maze by flying over it (Laplace domain) instead of walking through it (time domain). From above, the path is obvious. You find the path, then come back down to ground level (inverse Laplace).',
            keyConcept: 'L{y\'} = sY(s) - y(0). L{y\'\'} = s²Y(s) - sy(0) - y\'(0).',
            workedExample: {
              problem: 'Solve y\' + y = 0, y(0) = 1',
              steps: [
                'Step 1: Take Laplace: sY(s) - y(0) + Y(s) = 0',
                'Step 2: Plug in y(0) = 1: sY(s) - 1 + Y(s) = 0',
                'Step 3: Solve for Y(s): Y(s)(s+1) = 1, so Y(s) = 1/(s+1)',
                'Step 4: Inverse Laplace: y(t) = e⁻ᵗ'
              ],
              answer: 'y(t) = e⁻ᵗ'
            }
          }
        ],
        practice: [
          {
            id: 'pq-6.4.1',
            question: 'What is L{y\'} in terms of Y(s) and y(0)?',
            type: 'text',
            correctAnswer: 'sY(s)-y(0)',
            hint: 'L{y\'} = sY(s) - ?',
            explanation: 'L{y\'} = sY(s) - y(0)'
          },
          {
            id: 'pq-6.4.2',
            question: 'What is the inverse Laplace of 1/(s-2)?',
            type: 'text',
            correctAnswer: 'e²ᵗ',
            hint: 'L{eᵃᵗ} = 1/(s-a). Here a = ?',
            explanation: 'Since L{eᵃᵗ} = 1/(s-a), and we have 1/(s-2), a=2, so y(t) = e²ᵗ'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-7',
    number: 7,
    title: 'Boss Battles',
    icon: '👑',
    goal: 'Apply everything under timed conditions. Deconstruct complex questions into manageable steps.',
    skills: [
      {
        id: 'skill-7.1',
        title: 'Deconstructing Complex Questions',
        description: 'Breaking 10-mark questions into 1-mark micro-steps',
        lessons: [
          {
            id: 'lesson-7.1.1',
            title: 'The Art of Breaking Down',
            explanation: 'Every complex exam question is just several simple questions wearing a trench coat. Your job: identify each micro-step, solve them one at a time, and combine. Always write the formula first (free partial credit mark!), then substitute, then calculate.',
            everydayExample: 'Cooking a complex dish: you don\'t try to do everything at once. You prep ingredients (step 1), cook the sauce (step 2), prepare the protein (step 3), combine (step 4), plate (step 5). Each step is simple. Together they make something impressive.',
            keyConcept: 'Strategy: (1) Write the formula, (2) Identify what\'s given, (3) Substitute, (4) Calculate step by step, (5) Box your answer.',
            workedExample: {
              problem: 'A 10-mark question: "Find the area under y = x² from x=0 to x=3, then find the volume when rotated about the x-axis."',
              steps: [
                'Part 1: Area = ∫[0 to 3] x² dx',
                '= [x³/3] from 0 to 3 = 27/3 - 0 = 9',
                'Part 2: Volume = π∫[0 to 3] (x²)² dx = π∫[0 to 3] x⁴ dx',
                '= π[x⁵/5] from 0 to 3 = π(243/5) = 243π/5',
                'Always show your formula, substitution, and final answer clearly!'
              ],
              answer: 'Area = 9, Volume = 243π/5'
            }
          }
        ],
        practice: [
          {
            id: 'pq-7.1.1',
            question: 'What should you ALWAYS write first in an exam answer to get partial credit?',
            type: 'multiple-choice',
            options: ['The final answer', 'The formula', 'Your name', 'The question number'],
            correctAnswer: 'The formula',
            hint: 'Even if your calculation is wrong, showing you know the formula earns marks.',
            explanation: 'Writing the formula first shows understanding and earns partial credit even if arithmetic goes wrong.'
          },
          {
            id: 'pq-7.1.2',
            question: 'A question asks for the mean of grouped data. What are the micro-steps?',
            type: 'multiple-choice',
            options: [
              'Find midpoints, multiply by frequency, sum, divide by total frequency',
              'Just add all values and divide by n',
              'Find the median and mode',
              'Calculate variance first'
            ],
            correctAnswer: 'Find midpoints, multiply by frequency, sum, divide by total frequency',
            hint: 'Think about the grouped data mean formula.',
            explanation: 'For grouped data: mean = Σ(f×midpoint)/Σf. Each step is a micro-task.'
          }
        ]
      },
      {
        id: 'skill-7.2',
        title: 'Time Management',
        description: 'Identifying "free marks" and managing exam time',
        lessons: [
          {
            id: 'lesson-7.2.1',
            title: 'Working Smart Under Pressure',
            explanation: 'In exams, not all marks are equally hard to earn. "Free marks" come from: writing formulas, stating definitions, drawing diagrams, and doing easy first steps. Do ALL questions\' easy parts first, then go back for harder marks.',
            everydayExample: 'At a buffet, you don\'t spend 20 minutes deciding on dessert first. You grab the easy stuff (salad, bread), then tackle the main course. In exams: grab the easy marks from every question first, then go deeper.',
            keyConcept: 'Strategy: (1) Scan all questions, (2) Do easy parts of ALL questions first, (3) Return to harder parts, (4) Never leave blanks — write SOMETHING.',
            workedExample: {
              problem: 'Exam strategy for a 3-hour paper with 5 questions.',
              steps: [
                'Minute 0-5: Read ALL questions, identify easy starts',
                'Minute 5-60: Do first parts of all 5 questions (grab free marks)',
                'Minute 60-150: Go deeper into questions you\'re strong at',
                'Minute 150-170: Attempt remaining parts',
                'Minute 170-180: Review, check calculations, add anything missing'
              ],
              answer: 'Structured approach maximizes marks earned per minute.'
            }
          }
        ],
        practice: [
          {
            id: 'pq-7.2.1',
            question: 'In an exam, you encounter a question you can\'t solve. What should you do?',
            type: 'multiple-choice',
            options: [
              'Skip it entirely and never come back',
              'Write the formula and any steps you know, then move on',
              'Spend 30 minutes trying to figure it out',
              'Leave it blank'
            ],
            correctAnswer: 'Write the formula and any steps you know, then move on',
            hint: 'Partial credit is better than zero!',
            explanation: 'Writing what you know earns partial marks. You can always come back if time permits.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-8',
    number: 8,
    title: 'Complex Numbers (HND Core)',
    icon: '🔮',
    goal: 'Master imaginary numbers, polar coordinates, and De Moivre\'s Theorem for electrical and mechanical HND exams.',
    skills: [
      {
        id: 'skill-8.1',
        title: 'Rectangular Form (a + bi)',
        description: 'Adding, subtracting, multiplying, and dividing complex numbers',
        lessons: [
          {
            id: 'lesson-8.1.1',
            title: 'The Imaginary Unit i',
            explanation: 'In real numbers, √(-1) has no solution. We define i = √(-1) so that i² = -1. A complex number z = a + bi has a real part Re(z) = a and an imaginary part Im(z) = b. To divide complex numbers, multiply top and bottom by the complex conjugate (a - bi).',
            everydayExample: 'Think of 2D movement on a map. Real numbers move you east-west along the x-axis. Imaginary numbers move you north-south along the y-axis. A complex number a + bi describes your exact coordinate (a, b) on the Argand plane!',
            keyConcept: 'i² = -1. Conjugate of (a + bi) is (a - bi). (a + bi)(a - bi) = a² + b².',
            formula: 'z = a + bi,  z̄ = a - bi',
            workedExample: {
              problem: 'Divide: (3 + 2i) / (1 - i)',
              steps: [
                'Multiply numerator and denominator by conjugate of denominator (1 + i)',
                'Top: (3 + 2i)(1 + i) = 3 + 3i + 2i + 2i² = 3 + 5i - 2 = 1 + 5i',
                'Bottom: (1 - i)(1 + i) = 1 - i² = 1 - (-1) = 2',
                'Result: (1 + 5i) / 2 = 1/2 + (5/2)i'
              ],
              answer: '1/2 + 2.5i'
            }
          }
        ],
        practice: [
          {
            id: 'pq-8.1.1',
            question: 'What is i² + i⁴ ?',
            type: 'text',
            correctAnswer: '0',
            hint: 'i² = -1, i⁴ = (i²)² = (-1)² = 1.',
            explanation: 'i² = -1 and i⁴ = 1. So -1 + 1 = 0.'
          },
          {
            id: 'pq-8.1.2',
            question: 'Multiply: (2 + 3i)(1 - 2i)',
            type: 'text',
            correctAnswer: '8-i',
            hint: 'Expand using FOIL: 2(1) - 4i + 3i - 6i². Remember i² = -1.',
            explanation: '2 - 4i + 3i - 6(-1) = 2 - i + 6 = 8 - i.'
          }
        ]
      },
      {
        id: 'skill-8.2',
        title: 'Polar Form & De Moivre\'s Theorem',
        description: 'Converting to r∠θ and raising complex numbers to powers zⁿ',
        lessons: [
          {
            id: 'lesson-8.2.1',
            title: 'Modulus, Argument & De Moivre',
            explanation: 'A complex number z = a + bi can be written in polar form z = r(cos θ + i sin θ) = re^(iθ), where modulus r = √(a² + b²) and argument θ = tan⁻¹(b/a). De Moivre\'s Theorem states that zⁿ = rⁿ[cos(nθ) + i sin(nθ)]. This makes raising complex numbers to high powers ridiculously easy!',
            everydayExample: 'In AC circuit analysis (HND Electrical Engineering), voltage and current are phasors. Multiplying phasors multiplies their magnitudes (r) and adds their phase angles (θ). De Moivre\'s theorem is the backbone of AC power analysis!',
            keyConcept: 'De Moivre: [r(cos θ + i sin θ)]ⁿ = rⁿ[cos(nθ) + i sin(nθ)].',
            formula: 'r = √(a² + b²),  θ = arctan(b/a)',
            workedExample: {
              problem: 'Evaluate (1 + i)⁸ using De Moivre\'s Theorem.',
              steps: [
                'Find r for 1 + i: r = √(1² + 1²) = √2',
                'Find θ for 1 + i: θ = tan⁻¹(1/1) = π/4 (45°)',
                'Apply De Moivre: (√2)⁸ [cos(8 × π/4) + i sin(8 × π/4)]',
                '(√2)⁸ = 2⁴ = 16',
                'cos(2π) + i sin(2π) = 1 + 0i = 1',
                'Answer: 16 × 1 = 16'
              ],
              answer: '16'
            }
          }
        ],
        practice: [
          {
            id: 'pq-8.2.1',
            question: 'Find the modulus r of z = 3 + 4i.',
            type: 'text',
            correctAnswer: '5',
            hint: 'r = √(a² + b²) = √(3² + 4²)',
            explanation: 'r = √(9 + 16) = √25 = 5.'
          },
          {
            id: 'pq-8.2.2',
            question: 'Using De Moivre\'s theorem, if z = 2(cos 30° + i sin 30°), what is z³ in rectangular form?',
            type: 'text',
            correctAnswer: '8i',
            hint: '2³ = 8, angle becomes 3 × 30° = 90°. cos 90° = 0, sin 90° = 1.',
            explanation: 'z³ = 8(cos 90° + i sin 90°) = 8(0 + i) = 8i.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-9',
    number: 9,
    title: 'Matrices & Linear Systems',
    icon: '🔢',
    goal: 'Master determinants, inverse matrices, Cramer\'s rule, and Eigenvalues required in HND engineering problems.',
    skills: [
      {
        id: 'skill-9.1',
        title: 'Determinants & Matrix Inverses',
        description: 'Calculating 2x2 and 3x3 determinants and finding A⁻¹',
        lessons: [
          {
            id: 'lesson-9.1.1',
            title: 'Matrix Inverses and Determinants',
            explanation: 'The determinant det(A) or |A| measures if a matrix can be inverted. If det(A) = 0, the matrix is singular and has no inverse. For a 2x2 matrix A = [[a, b], [c, d]], det(A) = ad - bc, and A⁻¹ = (1/det(A)) * [[d, -b], [-c, a]].',
            everydayExample: 'In structural engineering or electrical circuits, a system of equations AX = B represents forces or nodal voltages. Finding X = A⁻¹B gives the exact solution instantly!',
            keyConcept: 'det(A) = ad - bc. A⁻¹ exists ONLY if det(A) ≠ 0.',
            formula: 'A⁻¹ = (1 / (ad - bc)) · [[d, -b], [-c, a]]',
            workedExample: {
              problem: 'Find the inverse of A = [[4, 2], [3, 1]]',
              steps: [
                'det(A) = (4)(1) - (2)(3) = 4 - 6 = -2',
                'Swap main diagonal: 4 and 1 swap → 1 and 4',
                'Negate off diagonal: 2 and 3 become -2 and -3',
                'A⁻¹ = (-1/2) * [[1, -2], [-3, 4]] = [[-0.5, 1], [1.5, -2]]'
              ],
              answer: '[[-0.5, 1], [1.5, -2]]'
            }
          }
        ],
        practice: [
          {
            id: 'pq-9.1.1',
            question: 'Find det(A) for A = [[3, 5], [2, 4]].',
            type: 'text',
            correctAnswer: '2',
            hint: 'ad - bc = 3(4) - 5(2)',
            explanation: 'det(A) = 12 - 10 = 2.'
          },
          {
            id: 'pq-9.1.2',
            question: 'Solve for x using Cramer\'s Rule: 2x + 3y = 8 and x - y = 1.',
            type: 'text',
            correctAnswer: '2.2',
            hint: 'D = det([[2,3],[1,-1]]) = -5. Dx = det([[8,3],[1,-1]]) = -11. x = Dx/D = -11/-5 = 2.2.',
            explanation: 'D = -5. Dx = (8)(-1) - (3)(1) = -11. x = -11 / -5 = 2.2.'
          }
        ]
      },
      {
        id: 'skill-9.2',
        title: 'Eigenvalues & Eigenvectors',
        description: 'Solving det(A - λI) = 0 for stability and frequency analysis',
        lessons: [
          {
            id: 'lesson-9.2.1',
            title: 'Characteristic Equation det(A - λI) = 0',
            explanation: 'Eigenvalues λ represent special scalar multipliers where matrix transformation acts as pure stretching without changing direction: Av = λv. To find them, solve the characteristic equation det(A - λI) = 0.',
            everydayExample: 'In vibration analysis of bridges or mechanical structures, eigenvalues correspond to natural resonant frequencies! Finding eigenvalues prevents structural collapse from resonance.',
            keyConcept: 'Solve det(A - λI) = 0 to get polynomial in λ, then find roots.',
            workedExample: {
              problem: 'Find eigenvalues of A = [[2, 1], [1, 2]]',
              steps: [
                'Form A - λI = [[2-λ, 1], [1, 2-λ]]',
                'det(A - λI) = (2-λ)(2-λ) - (1)(1) = 0',
                'λ² - 4λ + 4 - 1 = λ² - 4λ + 3 = 0',
                'Factor: (λ - 1)(λ - 3) = 0',
                'Eigenvalues: λ₁ = 1, λ₂ = 3'
              ],
              answer: 'λ = 1, 3'
            }
          }
        ],
        practice: [
          {
            id: 'pq-9.2.1',
            question: 'What is the characteristic equation of A = [[3, 0], [0, 5]]?',
            type: 'text',
            correctAnswer: '(3-λ)(5-λ)=0',
            hint: 'Diagonal matrix eigenvalues are just the diagonal elements!',
            explanation: 'det([[3-λ, 0],[0, 5-λ]]) = (3-λ)(5-λ) = 0. Roots are λ = 3, 5.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-10',
    number: 10,
    title: 'Partial Fractions & Integration',
    icon: '✂️',
    goal: 'Master partial fractions decomposition and Integration by Parts — mandatory for passing HND calculus questions.',
    skills: [
      {
        id: 'skill-10.1',
        title: 'Partial Fractions Decomposition',
        description: 'Splitting complex fractions into simple addable terms',
        lessons: [
          {
            id: 'lesson-10.1.1',
            title: 'Linear Factors Decomposition',
            explanation: 'When integrating a fraction with a factored polynomial in the denominator, split it into A/(x-a) + B/(x-b). Multiply through by the denominator and equate coefficients or use cover-up method to find A and B.',
            everydayExample: 'Decomposing fractions is like taking apart a complex machine into standard nuts and bolts so each piece can be easily serviced (integrated or Laplace transformed).',
            keyConcept: '(P x + Q)/[(x-a)(x-b)] = A/(x-a) + B/(x-b).',
            workedExample: {
              problem: 'Decompose: 5/( (x - 1)(x + 4) )',
              steps: [
                'Set 5/[(x-1)(x+4)] = A/(x-1) + B/(x+4)',
                'Multiply by (x-1)(x+4): 5 = A(x+4) + B(x-1)',
                'Let x = 1: 5 = A(5) + 0 → A = 1',
                'Let x = -4: 5 = 0 + B(-5) → B = -1',
                'Result: 1/(x-1) - 1/(x+4)'
              ],
              answer: '1/(x-1) - 1/(x+4)'
            }
          }
        ],
        practice: [
          {
            id: 'pq-10.1.1',
            question: 'Decompose 3/[(x-2)(x+1)] into A/(x-2) + B/(x+1). What is A?',
            type: 'text',
            correctAnswer: '1',
            hint: 'Let x = 2 in 3 = A(x+1) + B(x-2). 3 = A(3) → A = 1.',
            explanation: '3 = A(x+1) + B(x-2). Setting x = 2 gives 3 = 3A, so A = 1.'
          }
        ]
      },
      {
        id: 'skill-10.2',
        title: 'Integration by Parts',
        description: 'Using ∫ u dv = u v - ∫ v du for products like x·eˣ or x·sin(x)',
        lessons: [
          {
            id: 'lesson-10.2.1',
            title: 'LIATE Rule for Integration by Parts',
            explanation: 'When integrating the product of two functions ∫ u dv = u v - ∫ v du, choose u according to LIATE priority: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.',
            everydayExample: 'Integration by parts breaks down a difficult product integral into a simple product minus a much easier residual integral!',
            keyConcept: '∫ u dv = uv - ∫ v du. Choose u using LIATE.',
            workedExample: {
              problem: 'Evaluate ∫ x eˣ dx',
              steps: [
                'Choose u = x (Algebraic) and dv = eˣ dx',
                'Then du = dx and v = eˣ',
                'Apply formula: uv - ∫ v du = x eˣ - ∫ eˣ dx',
                'Result: x eˣ - eˣ + C = eˣ(x - 1) + C'
              ],
              answer: 'eˣ(x - 1) + C'
            }
          }
        ],
        practice: [
          {
            id: 'pq-10.2.1',
            question: 'Evaluate ∫ x cos(x) dx.',
            type: 'text',
            correctAnswer: 'x sin(x) + cos(x) + C',
            hint: 'u = x, dv = cos(x) dx → du = dx, v = sin(x). uv - ∫v du = x sin(x) - ∫sin(x) dx.',
            explanation: 'x sin(x) - (-cos(x)) + C = x sin(x) + cos(x) + C.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-11',
    number: 11,
    title: 'Differential Equations & Fourier Series',
    icon: '🌊',
    goal: 'Solve 1st and 2nd Order ODEs and compute Fourier coefficients for periodic signals in HND exams.',
    skills: [
      {
        id: 'skill-11.1',
        title: '1st Order ODEs & Integrating Factors',
        description: 'Solving dy/dx + P(x)y = Q(x) using IF = e^(∫ P(x)dx)',
        lessons: [
          {
            id: 'lesson-11.1.1',
            title: 'Linear 1st Order Differential Equations',
            explanation: 'For differential equations of the form dy/dx + P(x)y = Q(x), multiply every term by the Integrating Factor IF = e^(∫ P(x)dx). The left side condenses into d/dx [y · IF]. Integrate both sides to solve for y.',
            everydayExample: 'Models cooling objects (Newton\'s Law of Cooling), charging capacitors in RC circuits, and population growth with immigration!',
            keyConcept: 'IF = e^(∫ P(x) dx). Solution: y · IF = ∫ (Q(x) · IF) dx + C.',
            workedExample: {
              problem: 'Solve dy/dx + 2y = e⁻ˣ',
              steps: [
                'P(x) = 2, Q(x) = e⁻ˣ',
                'IF = e^(∫ 2 dx) = e²ˣ',
                'Multiply through: e²ˣ(dy/dx) + 2e²ˣ y = e²ˣ · e⁻ˣ = eˣ',
                'Left side is d/dx [y e²ˣ] = eˣ',
                'Integrate: y e²ˣ = ∫ eˣ dx = eˣ + C',
                'Divide by e²ˣ: y = e⁻ˣ + C e⁻²ˣ'
              ],
              answer: 'y = e⁻ˣ + C e⁻²ˣ'
            }
          }
        ],
        practice: [
          {
            id: 'pq-11.1.1',
            question: 'What is the Integrating Factor for dy/dx + 3y = x?',
            type: 'text',
            correctAnswer: 'e³ˣ',
            hint: 'IF = e^(∫ 3 dx)',
            explanation: 'IF = e^(∫ 3 dx) = e³ˣ.'
          }
        ]
      },
      {
        id: 'skill-11.2',
        title: 'Fourier Series Basics',
        description: 'Representing periodic functions as sums of sines and cosines',
        lessons: [
          {
            id: 'lesson-11.2.1',
            title: 'Fourier Coefficients a₀, aₙ, bₙ',
            explanation: 'Any periodic wave f(x) with period 2L can be written as f(x) = a₀/2 + ∑ [aₙ cos(nπx/L) + bₙ sin(nπx/L)]. For even functions (f(-x) = f(x)), bₙ = 0. For odd functions (f(-x) = -f(x)), a₀ = 0 and aₙ = 0.',
            everydayExample: 'In signal processing, audio equalizer, and electrical engineering, Fourier series breaks down complex square or sawtooth sound waves into pure sine wave frequencies!',
            keyConcept: 'Even function → Cosine series (bₙ = 0). Odd function → Sine series (aₙ = 0).',
            workedExample: {
              problem: 'If f(x) = x on (-π, π) is an odd function, which Fourier coefficients are ZERO?',
              steps: [
                'Check symmetry: f(-x) = -x = -f(x) → Odd function!',
                'Odd functions have symmetry about origin',
                'Cosine terms and DC offset are even, so a₀ = 0 and all aₙ = 0',
                'Only sine terms bₙ remain!'
              ],
              answer: 'a₀ = 0 and aₙ = 0'
            }
          }
        ],
        practice: [
          {
            id: 'pq-11.2.1',
            question: 'For an even function f(x) = x² on (-π, π), which coefficient is ALWAYS zero?',
            type: 'multiple-choice',
            options: ['bₙ', 'a₀', 'aₙ', 'None'],
            correctAnswer: 'bₙ',
            hint: 'Even functions have symmetry about y-axis and consist only of cosines!',
            explanation: 'Even functions have bₙ = 0 because sin(nx) is an odd function.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-12',
    number: 12,
    title: 'Numerical Methods & Standard Distributions',
    icon: '🎯',
    goal: 'Master Trapezoidal Rule, Simpson\'s Rule, Newton-Raphson, and Normal/Binomial distributions for high marks.',
    skills: [
      {
        id: 'skill-12.1',
        title: 'Trapezoidal & Simpson\'s 1/3 Rule',
        description: 'Approximating definite integrals numerically when exact integration is hard',
        lessons: [
          {
            id: 'lesson-12.1.1',
            title: 'Numerical Integration Formulas',
            explanation: 'Trapezoidal Rule: ∫[a to b] f(x)dx ≈ (h/2) [y₀ + yₙ + 2(y₁ + y₂ + ... + yₙ₋₁)]. Simpson\'s 1/3 Rule: (h/3) [(y₀ + yₙ) + 4(Odd y\'s) + 2(Even y\'s)]. Note: Simpson\'s rule requires an EVEN number of intervals (n)!',
            everydayExample: 'Engineers use numerical integration to calculate cross-sectional areas of irregularly shaped riverbeds, ship hulls, or land terrains from measured height samples!',
            keyConcept: 'h = (b - a)/n. Simpson\'s 1/3 uses multipliers: 1, 4, 2, 4, 2 ... 4, 1.',
            formula: 'Simpson: (h/3)[(y₀ + yₙ) + 4∑y_odd + 2∑y_even]',
            workedExample: {
              problem: 'Use Trapezoidal rule with n = 2 to estimate ∫[0 to 2] x² dx',
              steps: [
                'a = 0, b = 2, n = 2 → h = (2 - 0)/2 = 1',
                'x values: x₀ = 0, x₁ = 1, x₂ = 2',
                'y values: y₀ = 0² = 0, y₁ = 1² = 1, y₂ = 2² = 4',
                'Trapezoidal formula: (1/2) [0 + 4 + 2(1)] = (1/2) [6] = 3'
              ],
              answer: '3 (Exact integral is 8/3 ≈ 2.67)'
            }
          }
        ],
        practice: [
          {
            id: 'pq-12.1.1',
            question: 'To use Simpson\'s 1/3 Rule, the number of subintervals n MUST be...',
            type: 'multiple-choice',
            options: ['Even', 'Odd', 'Prime', 'Any integer'],
            correctAnswer: 'Even',
            hint: 'Simpson\'s 1/3 rule pairs up subintervals into parabolas.',
            explanation: 'Simpson\'s 1/3 rule requires an EVEN number of intervals n (which means an odd number of ordinates).'
          }
        ]
      },
      {
        id: 'skill-12.2',
        title: 'Newton-Raphson Method',
        description: 'Iteratively finding roots of equations f(x) = 0',
        lessons: [
          {
            id: 'lesson-12.2.1',
            title: 'Root Finding via Tangent Lines',
            explanation: 'The Newton-Raphson formula xₙ₊₁ = xₙ - f(xₙ)/f\'(xₙ) generates rapidly converging approximations to roots of f(x) = 0 starting from an initial guess x₀.',
            everydayExample: 'Calculators and computer algorithms use Newton-Raphson under the hood to calculate square roots and solve non-linear engineering equations in milliseconds!',
            keyConcept: 'x₁ = x₀ - f(x₀)/f\'(x₀).',
            workedExample: {
              problem: 'Use Newton-Raphson with x₀ = 2 to find 1st iteration for x² - 5 = 0',
              steps: [
                'f(x) = x² - 5, so f\'(x) = 2x',
                'f(x₀) = f(2) = 2² - 5 = -1',
                'f\'(x₀) = f\'(2) = 2(2) = 4',
                'x₁ = 2 - (-1 / 4) = 2 + 0.25 = 2.25'
              ],
              answer: '2.25'
            }
          }
        ],
        practice: [
          {
            id: 'pq-12.2.1',
            question: 'Using f(x) = x² - 2 and x₀ = 1, calculate x₁ using Newton-Raphson.',
            type: 'text',
            correctAnswer: '1.5',
            hint: 'f(1) = -1, f\'(1) = 2. x₁ = 1 - (-1/2) = 1.5.',
            explanation: 'f(1) = 1 - 2 = -1. f\'(x) = 2x → f\'(1) = 2. x₁ = 1 - (-1/2) = 1 + 0.5 = 1.5.'
          }
        ]
      }
    ]
  }
];

