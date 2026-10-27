# 🌳 Math Mastery - AI-Powered Discrete Mathematics Learning Platform

<div align="center">

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**Learn Discrete Mathematics the way it should be taught — with real-life examples, step-by-step explanations, and an AI tutor that adapts to your learning journey.**

[Features](#-features) • [Curriculum](#-curriculum) • [AI Integration](#-ai-integration) • [Getting Started](#-getting-started) • [Screenshots](#-screenshots)

</div>

---

## 📖 Overview

Math Mastery is a Duolingo-style learning platform designed specifically for HND (Higher National Diploma) students studying Discrete Mathematics. Unlike traditional math tools that just show solutions, Math Mastery **teaches** concepts using everyday analogies and real-world examples that make abstract mathematics tangible.

### 🎯 Why Math Mastery?

- **Teaches, doesn't just show** — Every concept is explained with relatable examples (pizza sharing, bank accounts, vending machines)
- **Progressive unlock system** — Master foundational skills before advancing to complex topics
- **AI-powered tutoring** — Connect your own AI API for personalized, context-aware help
- **Vision AI support** — Snap photos of handwritten work and get instant feedback
- **Adaptive learning** — The AI knows your strengths, weaknesses, and recent mistakes
- **Weekly progress reports** — Track your journey with detailed analytics

---

## ✨ Features

### 🌳 Progressive Learning Tree
- 7 comprehensive units covering Pre-Calculus to Advanced Engineering Tools
- Skills unlock sequentially as you master prerequisites
- Visual progress tracking with mastery percentages
- XP system to gamify your learning journey

### 📚 Structured Lessons
Each lesson follows a proven 4-step teaching method:
1. **Concept Explanation** — Clear, jargon-free breakdown
2. **Real-Life Connection** — Everyday analogies that make it stick
3. **Key Takeaway** — The core formula or principle
4. **Worked Example** — Step-by-step problem solving

### 🤖 AI-Powered Tutoring
- **Multi-provider support** — Use HuggingFace, OpenAI, Anthropic, Google, Together AI, or OpenRouter
- **Vision models** — Read handwritten math, diagrams, and charts
- **Context-aware** — AI knows your current skill level, recent mistakes, and struggling topics
- **Adaptive teaching** — Goes slower when you're struggling, challenges you when you're excelling
- **Image-to-answer** — Snap a photo of your work, AI reads it and auto-fills the answer box

### 📊 Analytics & Progress Tracking
- **Answer logging** — Every question attempt is tracked (correct/wrong, time spent, hints used)
- **Wrong answer analysis** — AI sees your specific mistakes and addresses them
- **Weekly reports** — Detailed breakdown of strengths, weaknesses, and recommendations
- **Study streaks** — Stay motivated with consecutive day tracking
- **Skill mastery metrics** — See exactly where you excel and where you need work

### 📸 Image Recognition
- Camera capture or file upload
- AI reads handwritten mathematical expressions
- Automatic answer extraction and validation
- Works with diagrams, equations, and problem-solving work

---

## 📚 Curriculum

### Unit 1: The Survival Toolkit 🧰
**Goal:** Eliminate confusion with negatives, fractions, and basic algebraic manipulation

- **Skill 1.1:** Handling Negative Numbers — Understanding `(-3)²` vs `-3²`
- **Skill 1.2:** Fraction Arithmetic — Adding, simplifying algebraic fractions
- **Skill 1.3:** Functions as Machines — Understanding `f(x)` as input/output
- **Skill 1.4:** Domain & Range — What numbers are "allowed" in the machine?

### Unit 2: The Language of Change 📐
**Goal:** Understand what happens to a function as it approaches a point

- **Skill 2.1:** Direct Substitution in Limits
- **Skill 2.2:** Fixing "Broken" Limits — Factoring to remove discontinuities
- **Skill 2.3:** Limits at Infinity — Behavior as x → ∞
- **Skill 2.4:** Continuity — Making piecewise functions connect smoothly

### Unit 3: Chance & Counting 🎲
**Goal:** Master probability foundations using logic and basic arithmetic

- **Skill 3.1:** Basic Probability — Favorable/Total outcomes
- **Skill 3.2:** AND vs OR Rules — Intersection and union of events
- **Skill 3.3:** Conditional Probability & Tree Diagrams
- **Skill 3.4:** Discrete Random Variables — Finding missing constants

### Unit 4: Making Sense of Data 📊
**Goal:** Learn to read tables and calculate key statistical metrics

- **Skill 4.1:** Mean, Median, Mode for raw data
- **Skill 4.2:** Grouped Data Tables — Finding missing frequencies
- **Skill 4.3:** Variance and Standard Deviation
- **Skill 4.4:** Quartiles and Box Plot concepts

### Unit 5: The Calculus Engine ⚙️
**Goal:** Demystify calculus as a set of "recipes" rather than magic

- **Skill 5.1:** The Power Rule for Derivatives
- **Skill 5.2:** Chain Rule & Product Rule
- **Skill 5.3:** Basic Integration — The reverse of differentiation
- **Skill 5.4:** Definite Integrals — Plugging in bounds
- **Skill 5.5:** Partial Derivatives — Treating other variables as constants

### Unit 6: Advanced Engineering Tools 🔧
**Goal:** Tackle high-mark questions using step-by-step templates

- **Skill 6.1:** Vectors — Dot product and magnitude
- **Skill 6.2:** Vector Calculus — Gradient, Divergence, Curl
- **Skill 6.3:** Laplace Transform Dictionary
- **Skill 6.4:** Solving Differential Equations using Laplace

### Unit 7: Boss Battles 👑
**Goal:** Apply everything under timed conditions

- **Skill 7.1:** Deconstructing complex questions into micro-steps
- **Skill 7.2:** Time management and identifying "free marks"

---

## 🤖 AI Integration

Math Mastery supports **bring-your-own-API** AI integration with multiple providers:

### Supported Providers

| Provider | Vision Models | Free Tier | Best For |
|----------|---------------|-----------|----------|
| **HuggingFace** | Qwen VL, Llama Vision, Pixtral | ✅ Yes | Getting started, free usage |
| **OpenAI** | GPT-4o, GPT-4o Mini | ❌ No | Best overall quality |
| **Anthropic** | Claude Sonnet 4, Claude 3.5 | ❌ No | Patient, detailed explanations |
| **Google** | Gemini 2.0 Flash, Gemini 1.5 Pro | ✅ Yes | Large context, fast responses |
| **Together AI** | LLaVA, open-source models | ❌ No | Open-source alternatives |
| **OpenRouter** | Multiple models via one API | ✅ Some free | Flexibility, free options |

### How It Works

1. **Configure your API** — Click ⚙️ Settings and enter your API key
2. **Choose a vision model** — Select from curated list with descriptions
3. **Test connection** — Verify your API key works
4. **Start learning** — AI tutor is now active and context-aware

### AI Context System

The AI receives rich context about each student:
- Current skill and unit being studied
- Accuracy percentage on current topic
- Recent wrong answers with specific questions
- Struggling topics (accuracy < 60%)
- Strong topics (accuracy ≥ 80%)
- Study streak and total progress

This allows the AI to:
- Reference specific past mistakes: *"I noticed you struggled with [similar problem] earlier..."*
- Adapt teaching speed based on performance
- Provide targeted practice recommendations
- Celebrate improvements in weak areas

### Image-to-Answer Flow

```
User snaps photo → AI reads image → Extracts answer → Auto-fills practice box
     ↓                    ↓                ↓                    ↓
  [Camera]         [Vision Model]    [ANSWER: 42]        [Input field]
```

The AI uses a special `[ANSWER: ...]` pattern to extract answers from images, which are then automatically inserted into the practice question's answer box.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **API Key** from one of the supported AI providers (optional - app works in mock mode)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/math-mastery.git
cd math-mastery

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### First Time Setup

1. Open the app in your browser (usually `http://localhost:5173`)
2. Click through the welcome screen
3. Start with Unit 1, Skill 1.1
4. (Optional) Click ⚙️ Settings to configure your AI provider
5. Enter your API key and select a vision model
6. Test the connection
7. Start learning!

### Getting API Keys

**HuggingFace (Recommended for free tier):**
1. Go to [huggingface.co](https://huggingface.co)
2. Create a free account
3. Go to Settings → Access Tokens
4. Create a new token with "Read" access
5. Copy and paste into the app

**OpenAI:**
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account and add billing
3. Go to API Keys → Create new key
4. GPT-4o-mini is very affordable (~$0.15/1M tokens)

**Google Gemini (Free tier available):**
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with Google
3. Click "Get API Key" → Create API Key
4. Copy and paste into the app

---

## 📁 Project Structure

```
math-mastery/
├── src/
│   ├── components/
│   │   ├── AIChatbot.tsx          # AI chat interface with vision support
│   │   ├── LearningTree.tsx       # Main curriculum navigation
│   │   ├── LessonView.tsx         # 4-step lesson interface
│   │   ├── PracticeView.tsx       # Question/answer practice
│   │   ├── SettingsPanel.tsx      # AI provider configuration
│   │   ├── SkillHub.tsx           # Skill overview with lessons/practice
│   │   ├── WeeklyReport.tsx       # Analytics dashboard
│   │   └── WelcomeScreen.tsx      # Onboarding screen
│   ├── data/
│   │   └── curriculum.ts          # All 7 units, skills, lessons, questions
│   ├── hooks/
│   │   ├── useAIConfig.ts         # AI configuration state management
│   │   ├── useAnalytics.ts        # Analytics data management
│   │   └── useProgress.ts         # User progress tracking
│   ├── services/
│   │   ├── aiModels.ts            # Vision model definitions
│   │   ├── aiService.ts           # AI API integration layer
│   │   └── analytics.ts           # Analytics computation & reporting
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Tailwind CSS + custom styles
├── public/                        # Static assets
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # This file
```

---

## 🎨 Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first styling
- **React Icons** — Icon library
- **LocalStorage** — Client-side data persistence

---

## 📊 Analytics System

### What Gets Tracked

**Answer Logs:**
- Question ID and text
- User's answer (correct or wrong)
- Correct answer
- Time spent on question
- Whether hint was used
- Skill and unit context
- Timestamp

**Lesson Logs:**
- Lesson completion timestamps
- Skill and unit context
- Sequential progress tracking

**Chat Logs:**
- Messages sent to AI
- Whether image was attached
- Current topic context
- Timestamp

### Weekly Report Metrics

- **Total Questions** — Questions attempted this week
- **Overall Accuracy** — Percentage correct
- **Study Time** — Total time spent practicing
- **Lessons Completed** — New lessons finished
- **Excelling Skills** — Topics with ≥80% accuracy
- **Struggling Skills** — Topics with <60% accuracy
- **Most Active Time** — When you study most
- **Common Mistakes** — Patterns in wrong answers
- **Recommendations** — Personalized next steps

---

## 🔒 Privacy & Data

- **All data stored locally** — Nothing is sent to our servers
- **API keys stored in browser** — Only you can see them
- **AI calls go directly to provider** — We don't proxy your requests
- **No analytics collection** — Your learning data stays on your device
- **Export your data** — All progress is in localStorage, easily exportable

---

## 🎯 Use Cases

### For Students
- Self-paced learning with structured curriculum
- AI tutor available 24/7 for questions
- Track progress and identify weak areas
- Practice with immediate feedback

### For Educators
- Assign specific units/skills to students
- Monitor student progress through analytics
- Identify common misconceptions
- Supplement traditional teaching

### For Self-Learners
- Comprehensive discrete math curriculum
- Flexible learning schedule
- AI-powered explanations
- Build strong foundations progressively

---

## 🗺️ Roadmap

### Planned Features
- [ ] Offline mode with service worker
- [ ] Export/import progress data
- [ ] More practice questions per skill
- [ ] Spaced repetition system
- [ ] Collaborative study groups
- [ ] Teacher dashboard for classrooms
- [ ] Mobile app (React Native)
- [ ] More AI providers (Cohere, Mistral)
- [ ] Voice input for questions
- [ ] LaTeX rendering for math formulas
- [ ] Printable worksheets
- [ ] Achievement badges and certificates

### Under Consideration
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Custom curriculum builder
- [ ] Integration with LMS platforms
- [ ] Video explanations
- [ ] Peer tutoring system

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Areas for Contribution
- Add more practice questions to existing skills
- Improve AI prompts for better tutoring
- Add new units/skills to the curriculum
- Enhance the analytics system
- Improve accessibility
- Add translations
- Fix bugs and improve performance

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Duolingo** — Inspiration for the progressive unlock system
- **Khan Academy** — Inspiration for structured, step-by-step teaching
- **HuggingFace, OpenAI, Anthropic, Google** — For making AI accessible
- **React & Vite teams** — For excellent developer tools
- **Tailwind CSS** — For making styling enjoyable

---

## 📧 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/math-mastery/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/math-mastery/discussions)
- **Email:** your-email@example.com

---

## ⭐ Show Your Support

If you find this project helpful, please consider giving it a star on GitHub! It helps others discover the project and motivates continued development.

---

<div align="center">

**Made with ❤️ for mathematics students everywhere**

[Back to Top](#-math-mastery---ai-powered-discrete-mathematics-learning-platform)

</div>
