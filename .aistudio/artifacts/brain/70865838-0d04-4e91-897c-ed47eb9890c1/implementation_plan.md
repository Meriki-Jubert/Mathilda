# Implementation Plan: Mathilda — The Jungle of Equations Expedition

Transform Mathilda into an authentic, human-centered **Jungle Expedition Experience** where discrete and applied mathematics for Cameroon HND is a wild, uncharted jungle to be explored. You navigate through 12 lush jungle zones, harvest collectible Knowledge Fruits, track your Expedition Stamina, and unlock the Secret Past Paper Vault.

---

## 1. Narrative & Gamified Progress Mechanics

- **The Mathilda Jungle Expedition Story**: You are an explorer navigating the overgrown *Mathilda Jungle*. Each unit is a distinct jungle biome:
  - *Zone 1: The Survival Clearing* (Basics & Negatives)
  - *Zone 2: The Whispering Limits Canopy* (Limits & Continuity)
  - *Zone 3: The Grove of Chance* (Probability & Counting)
  - *Zone 4: The Plateau of Statistics* (Data & Frequency Tables)
  - *Zone 5: The River of Calculus* (Derivatives & Integrals)
  - *Zone 6: The Vector Ridge & Laplace Cascades* (Vectors & Transforms)
  - *Zone 7: The Trial of the Bosses* (Exam Deconstruction)
  - *Zone 8: The Ruined Temple of Complex Phasors* (Complex Numbers)
  - *Zone 9: The Fortress of Matrices* (Linear Systems & Cramer's Rule)
  - *Zone 10: The Cavern of Partial Fractions* (Integration Techniques)
  - *Zone 11: The Oscillating Canopy* (ODEs & Fourier Series)
  - *Zone 12: The Valley of Numerical Methods* (Trapezoidal, Simpson, Newton-Raphson)
- **Collectible Knowledge Fruits**: Completing lessons and problem sets awards regional fruits (*Golden Mango of Calculus*, *Starfruit of Laplace*, *Crystal Guava of Complex Phasors*, *Papaya of Matrices*, *Passionfruit of ODEs*).
- **Expedition Backpack & Secret Vaults**: Collectible fruits fill your **Expedition Backpack** and boost your **Jungle Stamina**. Accumulating fruits unlocks secret past paper vaults in the HND Exam Temple.

---

## 2. Visual Palette & Organic Aesthetics

- **Canvas & Palette**: Warm parchment expedition map background (`#FDFBF7`), deep moss canopy (`#064E3B` / `#022C22`), sunlit clearing gold (`#D97706`), earthy bark (`#78350F`), and lush emerald green (`#059669`).
- **Texture & Shapes**: Stone tablet borders, hand-drawn trail lines, vine-wrapped progress meters, and organic badge shapes.
- **Typography**: Clean readable sans-serif for story copy, Newsreader serif for mathematical expressions and field journal entries, and JetBrains Mono for coordinates, stamina scores, and equations.

---

## 3. Core Component Architecture & Upgrades

### `src/data/jungleLore.ts`
- Stores fruit definitions, zone descriptions, explorer log entries, stamina formulas, and backpack item inventories.

### `src/components/LearningTree.tsx` (The Jungle Expedition Map)
- Interactive expedition trail map connecting all 12 zones with winding vine paths.
- Zone progress bars, canopy milestones, and fruit tree indicators.
- Quick access to the Expedition Backpack and Stamina status.

### `src/components/SkillHub.tsx` (Jungle Trailhead & Fruit Grove)
- Framer Motion staggered trail markers for lessons and practice problems.
- Animated fruit harvesting alert when completing lessons or solving problems.

### `src/components/LessonView.tsx` (Explorer's Field Journal)
- Formatted like a handwritten explorer's notebook entry with story context ("Field Notes"), core formulas carved into stone tablets, and step-by-step worked solutions.

### `src/components/PracticeView.tsx` (Jungle Trial & Fruit Discovery)
- Practice problems styled as jungle obstacles.
- Correct answers yield harvestable Knowledge Fruits with animation and stamina boosts.

### `src/components/HndExamBankView.tsx` (The Secret Past Paper Vault)
- Unlocked via harvested fruits. Features authentic 10-mark Cameroon HND past exam questions with step-by-step marking schemes.

### `src/components/BackpackModal.tsx` (Expedition Backpack & Fruit Collection)
- Interactive inventory displaying harvested Knowledge Fruits, Stamina boost level, unlocked exam vaults, and exploration badges.

### `src/components/WelcomeScreen.tsx` (The Expedition Entrance)
- Evocative narrative introduction to the Mathilda Jungle expedition.

---

## 4. Verification Plan

1. Compile applet using `compile_applet` to ensure zero build or syntax errors.
2. Verify Framer Motion staggered animations, fruit harvesting triggers, and inventory tracking.
3. Test seamless navigation between Syllabus Map, Past Paper Vault, Formula Handbook, Solvers, and Expedition Backpack.
