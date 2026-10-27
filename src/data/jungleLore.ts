export interface JungleFruit {
  id: string;
  name: string;
  zoneId: string;
  zoneName: string;
  icon: string;
  description: string;
  staminaBoost: number;
}

export const jungleFruits: Record<string, JungleFruit> = {
  'unit-1': {
    id: 'fruit-1',
    name: 'Wild Banana of Negatives',
    zoneId: 'unit-1',
    zoneName: 'The Survival Clearing',
    icon: '🍌',
    description: 'Found near the root of basic algebra. Clears mental fatigue regarding negative signs and fraction denominators.',
    staminaBoost: 15,
  },
  'unit-2': {
    id: 'fruit-2',
    name: 'Golden Guava of Limits',
    zoneId: 'unit-2',
    zoneName: 'The Whispering Limits Canopy',
    icon: '🥭',
    description: 'Grows high near indeterminate cliffs. Gives vision to see where functions approach infinity.',
    staminaBoost: 20,
  },
  'unit-3': {
    id: 'fruit-3',
    name: 'Starfruit of Probability',
    zoneId: 'unit-3',
    zoneName: 'The Grove of Chance',
    icon: '⭐',
    description: 'Harvested under the canopy of chance. Sharpens intuition for AND/OR probabilities and sample spaces.',
    staminaBoost: 20,
  },
  'unit-4': {
    id: 'fruit-4',
    name: 'Jungle Fig of Statistics',
    zoneId: 'unit-4',
    zoneName: 'The Plateau of Data',
    icon: '🫐',
    description: 'Found in frequency table clusters. Reveals hidden midpoints and standard deviations.',
    staminaBoost: 20,
  },
  'unit-5': {
    id: 'fruit-5',
    name: 'Emerald Papaya of Calculus',
    zoneId: 'unit-5',
    zoneName: 'The River of Derivatives',
    icon: '🍈',
    description: 'Flows down the differentiation cascades. Unlocks instant power rule and integration insight.',
    staminaBoost: 25,
  },
  'unit-6': {
    id: 'unit-6',
    name: 'Laplace Dragonfruit',
    zoneId: 'unit-6',
    zoneName: 'The Laplace Cascades',
    icon: '🐉',
    description: 'Rare fruit found deep near differential equation waterfalls. Transforms s-domain equations into time domain.',
    staminaBoost: 30,
  },
  'unit-7': {
    id: 'unit-7',
    name: 'Crown Pineapple of Strategy',
    zoneId: 'unit-7',
    zoneName: 'The Trial of the Bosses',
    icon: '🍍',
    description: 'Awarded for deconstructing 10-mark exam questions under timed conditions.',
    staminaBoost: 30,
  },
  'unit-8': {
    id: 'unit-8',
    name: 'Crystal Coconut of Phasors',
    zoneId: 'unit-8',
    zoneName: 'The Ruined Temple of Complex Numbers',
    icon: '🥥',
    description: 'Ancient coconut containing De Moivre\'s secrets. Converts rectangular a+bi coordinates into polar phasors.',
    staminaBoost: 35,
  },
  'unit-9': {
    id: 'unit-9',
    name: 'Sunlit Mango of Matrices',
    zoneId: 'unit-9',
    zoneName: 'The Fortress of Linear Systems',
    icon: '🥭',
    description: 'Grows within matrix determinants. Unlocks Cramer\'s rule for multi-mesh circuits.',
    staminaBoost: 35,
  },
  'unit-10': {
    id: 'unit-10',
    name: 'Passionfruit of Partial Fractions',
    zoneId: 'unit-10',
    zoneName: 'The Cavern of Fractions',
    icon: '🍇',
    description: 'Juicy fruit that splits complex rational expressions into simple integrable fractions.',
    staminaBoost: 35,
  },
  'unit-11': {
    id: 'unit-11',
    name: 'Oscillating Kiwifruit of ODEs',
    zoneId: 'unit-11',
    zoneName: 'The Oscillating Fourier Canopy',
    icon: '🥝',
    description: 'Vibrates at harmonic frequencies. Unlocks Integrating Factors and Fourier wave series.',
    staminaBoost: 40,
  },
  'unit-12': {
    id: 'unit-12',
    name: 'Golden Persimmon of Simpson',
    zoneId: 'unit-12',
    zoneName: 'The Valley of Numerical Methods',
    icon: '🍑',
    description: 'Ripens near parabolic curves. Provides high precision for Simpson\'s 1/3 Rule and Newton-Raphson.',
    staminaBoost: 40,
  },
};

export interface ExpeditionLog {
  unitId: string;
  zoneTitle: string;
  loreQuote: string;
  journalEntry: string;
}

export const jungleZoneLogs: Record<string, ExpeditionLog> = {
  'unit-1': {
    unitId: 'unit-1',
    zoneTitle: 'Zone 1: The Survival Clearing',
    loreQuote: '"Before venturing into the thick mathematical canopy, an explorer must master basic fractions and negative signs."',
    journalEntry: 'Field Note #01: We entered the outskirts of the Mathilda Jungle. The trail is paved with basic algebraic expressions. The air smells of wild bananas.',
  },
  'unit-2': {
    unitId: 'unit-2',
    zoneTitle: 'Zone 2: The Whispering Limits Canopy',
    loreQuote: '"As you climb closer to the infinite cliffs, values get arbitrarily close to their limit destinations."',
    journalEntry: 'Field Note #02: Reached the high rope bridges over Indeterminate Ravine. 0/0 traps abound, but factoring provides a secure foothold.',
  },
  'unit-3': {
    unitId: 'unit-3',
    zoneTitle: 'Zone 3: The Grove of Chance',
    loreQuote: '"In the grove of probability, every path branches into multiple outcomes."',
    journalEntry: 'Field Note #03: The trees here bear Starfruit of Probability. Calculating sample spaces reveals the clearest route through the fog.',
  },
  'unit-4': {
    unitId: 'unit-4',
    zoneTitle: 'Zone 4: The Plateau of Statistics',
    loreQuote: '"Data points gather like river pebbles. The mean marks the center, while standard deviation measures the spread."',
    journalEntry: 'Field Note #04: Erected camp on Frequency Plateau. Grouped data tables give a panoramic view of the entire mathematical landscape.',
  },
  'unit-5': {
    unitId: 'unit-5',
    zoneTitle: 'Zone 5: The River of Calculus',
    loreQuote: '"Rates of change flow continuously like jungle rivers."',
    journalEntry: 'Field Note #05: Navigating the fast currents of differentiation. The Power Rule is our sturdy wooden canoe.',
  },
  'unit-6': {
    unitId: 'unit-6',
    zoneTitle: 'Zone 6: The Laplace Cascades',
    loreQuote: '"The waterfalls of Laplace transform complex time-domain differential equations into tranquil s-domain algebra."',
    journalEntry: 'Field Note #06: Discovered ancient stone tablets listing Laplace transform pairs. Solving circuit equations is now effortless.',
  },
  'unit-7': {
    unitId: 'unit-7',
    zoneTitle: 'Zone 7: The Trial of the Bosses',
    loreQuote: '"Only explorers who deconstruct 10-mark questions into micro-steps can claim the Crown Pineapple."',
    journalEntry: 'Field Note #07: Faced multi-part exam challenges. Writing the formula first earns partial credit even when the terrain gets steep.',
  },
  'unit-8': {
    unitId: 'unit-8',
    zoneTitle: 'Zone 8: Ruined Temple of Complex Numbers',
    loreQuote: '"Imaginary roots carved into overgrown temple pillars. Real and imaginary axes meet at right angles."',
    journalEntry: 'Field Note #08: Uncovered phasor inscriptions. Converting rectangular coordinates to polar r∠θ simplifies AC circuit analysis.',
  },
  'unit-9': {
    unitId: 'unit-9',
    zoneTitle: 'Zone 9: The Fortress of Linear Systems',
    loreQuote: '"Interlocking stone blocks arranged in 3x3 matrices holding back linear system forces."',
    journalEntry: 'Field Note #09: Solved determinant locks using Cramer\'s Rule. Mesh currents flow freely once more.',
  },
  'unit-10': {
    unitId: 'unit-10',
    zoneTitle: 'Zone 10: Cavern of Partial Fractions',
    loreQuote: '"Decomposing complex rational fractions into simple addable terms reveals hidden passages."',
    journalEntry: 'Field Note #10: LIATE integration by parts guided us through the dark fraction caves into light.',
  },
  'unit-11': {
    unitId: 'unit-11',
    zoneTitle: 'Zone 11: The Oscillating Canopy',
    loreQuote: '"Periodic waveforms echo through the trees as sums of harmonically tuned sines and cosines."',
    journalEntry: 'Field Note #11: Calculating Fourier coefficients a₀, aₙ, bₙ harmonizes the jungle resonance.',
  },
  'unit-12': {
    unitId: 'unit-12',
    zoneTitle: 'Zone 12: Valley of Numerical Methods',
    loreQuote: '"When exact analytical integration is overgrown, parabolic Simpson rules carve out precise paths."',
    journalEntry: 'Field Note #12: Reached the highest summit of the Mathilda Jungle using Newton-Raphson iterations. Full Cameroon HND mastery achieved!',
  },
};
