export interface AnswerLog {
  id: string;
  timestamp: number;
  skillId: string;
  skillTitle: string;
  unitId: string;
  unitTitle: string;
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  questionType: 'text' | 'multiple-choice';
  hintUsed: boolean;
  timeSpentMs: number;
}

export interface LessonLog {
  id: string;
  timestamp: number;
  skillId: string;
  skillTitle: string;
  unitId: string;
  lessonId: string;
  lessonTitle: string;
  completedAt: number;
}

export interface ChatLog {
  id: string;
  timestamp: number;
  topic: string;
  message: string;
  hadImage: boolean;
}

export interface SkillStats {
  skillId: string;
  skillTitle: string;
  unitId: string;
  unitTitle: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  avgTimeMs: number;
  lastAttempted: number;
  wrongAnswers: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    timestamp: number;
  }>;
  strengths: string[];
  weaknesses: string[];
}

export interface WeeklyReport {
  weekStart: number;
  weekEnd: number;
  totalQuestions: number;
  totalCorrect: number;
  overallAccuracy: number;
  totalTimeSpentMs: number;
  lessonsCompleted: number;
  topSkills: SkillStats[];
  strugglingSkills: SkillStats[];
  excellingSkills: SkillStats[];
  recommendations: string[];
  patterns: {
    mostActiveTime: string;
    commonMistakeTypes: string[];
    improvementAreas: string[];
  };
}

export interface AnalyticsData {
  answerLogs: AnswerLog[];
  lessonLogs: LessonLog[];
  chatLogs: ChatLog[];
  streakDays: number;
  lastActiveDate: string;
  totalStudyTimeMs: number;
}

const ANALYTICS_KEY = 'math-mastery-analytics';

const DEFAULT_DATA: AnalyticsData = {
  answerLogs: [],
  lessonLogs: [],
  chatLogs: [],
  streakDays: 0,
  lastActiveDate: '',
  totalStudyTimeMs: 0,
};

export function loadAnalytics(): AnalyticsData {
  try {
    const saved = localStorage.getItem(ANALYTICS_KEY);
    if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved) };
  } catch (e) {
    console.error('Failed to load analytics:', e);
  }
  return DEFAULT_DATA;
}

export function saveAnalytics(data: AnalyticsData): void {
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

export function logAnswer(data: AnalyticsData, log: Omit<AnswerLog, 'id' | 'timestamp'>): AnalyticsData {
  const newLog: AnswerLog = {
    ...log,
    id: `ans-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: Date.now(),
  };
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let streakDays = data.streakDays;
  if (data.lastActiveDate !== today) {
    streakDays = data.lastActiveDate === yesterday ? streakDays + 1 : 1;
  }
  return {
    ...data,
    answerLogs: [...data.answerLogs, newLog],
    streakDays,
    lastActiveDate: today,
    totalStudyTimeMs: data.totalStudyTimeMs + log.timeSpentMs,
  };
}

export function logLesson(data: AnalyticsData, log: Omit<LessonLog, 'id' | 'timestamp' | 'completedAt'>): AnalyticsData {
  const newLog: LessonLog = {
    ...log,
    id: `les-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: Date.now(),
    completedAt: Date.now(),
  };
  return {
    ...data,
    lessonLogs: [...data.lessonLogs, newLog],
  };
}

export function logChat(data: AnalyticsData, log: Omit<ChatLog, 'id' | 'timestamp'>): AnalyticsData {
  const newLog: ChatLog = {
    ...log,
    id: `chat-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: Date.now(),
  };
  return {
    ...data,
    chatLogs: [...data.chatLogs, newLog],
  };
}

export function computeSkillStats(data: AnalyticsData): SkillStats[] {
  const skillMap = new Map<string, SkillStats>();

  for (const log of data.answerLogs) {
    let stats = skillMap.get(log.skillId);
    if (!stats) {
      stats = {
        skillId: log.skillId,
        skillTitle: log.skillTitle,
        unitId: log.unitId,
        unitTitle: log.unitTitle,
        totalAttempts: 0,
        correctAttempts: 0,
        accuracy: 0,
        avgTimeMs: 0,
        lastAttempted: 0,
        wrongAnswers: [],
        strengths: [],
        weaknesses: [],
      };
      skillMap.set(log.skillId, stats);
    }
    stats.totalAttempts++;
    if (log.isCorrect) stats.correctAttempts++;
    if (log.timestamp > stats.lastAttempted) stats.lastAttempted = log.timestamp;
    if (!log.isCorrect) {
      stats.wrongAnswers.push({
        question: log.question,
        userAnswer: log.userAnswer,
        correctAnswer: log.correctAnswer,
        timestamp: log.timestamp,
      });
    }
  }

  // Compute averages
  for (const stats of skillMap.values()) {
    stats.accuracy = stats.totalAttempts > 0
      ? Math.round((stats.correctAttempts / stats.totalAttempts) * 100)
      : 0;
    const relevantLogs = data.answerLogs.filter(l => l.skillId === stats.skillId);
    stats.avgTimeMs = relevantLogs.length > 0
      ? Math.round(relevantLogs.reduce((sum, l) => sum + l.timeSpentMs, 0) / relevantLogs.length)
      : 0;
  }

  return Array.from(skillMap.values()).sort((a, b) => b.lastAttempted - a.lastAttempted);
}

export function generateWeeklyReport(data: AnalyticsData): WeeklyReport {
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  
  const weekLogs = data.answerLogs.filter(l => l.timestamp >= weekAgo);
  const weekLessons = data.lessonLogs.filter(l => l.timestamp >= weekAgo);
  
  const totalQuestions = weekLogs.length;
  const totalCorrect = weekLogs.filter(l => l.isCorrect).length;
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const totalTimeSpentMs = weekLogs.reduce((sum, l) => sum + l.timeSpentMs, 0);

  // Compute stats for this week's skills
  const weekData: AnalyticsData = { ...data, answerLogs: weekLogs, lessonLogs: weekLessons };
  const allSkillStats = computeSkillStats(weekData);

  // Sort by accuracy for excelling/struggling
  const sorted = [...allSkillStats].filter(s => s.totalAttempts >= 2);
  const excellingSkills = sorted.filter(s => s.accuracy >= 80).sort((a, b) => b.accuracy - a.accuracy);
  const strugglingSkills = sorted.filter(s => s.accuracy < 60).sort((a, b) => a.accuracy - b.accuracy);
  const topSkills = sorted.sort((a, b) => b.accuracy - a.accuracy).slice(0, 3);

  // Identify patterns
  const hours = weekLogs.map(l => new Date(l.timestamp).getHours());
  const hourCounts = new Map<number, number>();
  hours.forEach(h => hourCounts.set(h, (hourCounts.get(h) || 0) + 1));
  let mostActiveHour = 0;
  let maxCount = 0;
  hourCounts.forEach((count, hour) => {
    if (count > maxCount) { maxCount = count; mostActiveHour = hour; }
  });
  const mostActiveTime = `${mostActiveHour.toString().padStart(2, '0')}:00 - ${(mostActiveHour + 1).toString().padStart(2, '0')}:00`;

  // Common mistake types
  const wrongLogs = weekLogs.filter(l => !l.isCorrect);
  const mistakePatterns = new Map<string, number>();
  wrongLogs.forEach(l => {
    if (l.questionType === 'text') mistakePatterns.set('Calculation errors', (mistakePatterns.get('Calculation errors') || 0) + 1);
    else mistakePatterns.set('Concept confusion', (mistakePatterns.get('Concept confusion') || 0) + 1);
  });
  const commonMistakeTypes = Array.from(mistakePatterns.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([type]) => type);

  // Improvement areas
  const improvementAreas = strugglingSkills.map(s => s.skillTitle);

  // Recommendations
  const recommendations: string[] = [];
  if (strugglingSkills.length > 0) {
    recommendations.push(`Focus on revising: ${strugglingSkills.slice(0, 2).map(s => s.skillTitle).join(', ')}`);
  }
  if (excellingSkills.length > 0) {
    recommendations.push(`Great progress in ${excellingSkills[0].skillTitle}! Consider moving to the next skill.`);
  }
  if (totalQuestions < 10) {
    recommendations.push('Try to complete more practice questions this week to build consistency.');
  }
  if (overallAccuracy >= 80) {
    recommendations.push('Excellent accuracy! Challenge yourself with harder problems.');
  }
  if (overallAccuracy < 50 && totalQuestions > 5) {
    recommendations.push('Consider revisiting the lessons before attempting more practice.');
  }
  if (weekLessons.length === 0) {
    recommendations.push('Start with the lessons to build a strong foundation before practicing.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Keep up the consistent practice! You\'re doing great.');
  }

  return {
    weekStart: weekAgo,
    weekEnd: now,
    totalQuestions,
    totalCorrect,
    overallAccuracy,
    totalTimeSpentMs,
    lessonsCompleted: weekLessons.length,
    topSkills,
    strugglingSkills,
    excellingSkills,
    recommendations,
    patterns: {
      mostActiveTime,
      commonMistakeTypes,
      improvementAreas,
    },
  };
}

// Build AI context string from analytics
export function buildAIContext(data: AnalyticsData, currentSkillId?: string, currentQuestion?: string): string {
  const skillStats = computeSkillStats(data);
  const recentWrong = data.answerLogs
    .filter(l => !l.isCorrect)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5);

  let context = `\n\n=== STUDENT CONTEXT ===\n`;
  context += `Study streak: ${data.streakDays} day(s)\n`;
  context += `Total questions attempted: ${data.answerLogs.length}\n`;
  context += `Total lessons completed: ${data.lessonLogs.length}\n`;

  if (currentSkillId) {
    const currentStats = skillStats.find(s => s.skillId === currentSkillId);
    if (currentStats) {
      context += `\nCurrent skill: ${currentStats.skillTitle}\n`;
      context += `Accuracy on this skill: ${currentStats.accuracy}%\n`;
      context += `Attempts on this skill: ${currentStats.totalAttempts}\n`;
    }
  }

  if (currentQuestion) {
    context += `\nCurrent question: "${currentQuestion}"\n`;
  }

  if (recentWrong.length > 0) {
    context += `\nRecent mistakes (last 5):\n`;
    recentWrong.forEach(l => {
      context += `- Q: "${l.question}" | User answered: "${l.userAnswer}" | Correct: "${l.correctAnswer}" (Skill: ${l.skillTitle})\n`;
    });
  }

  const struggling = skillStats.filter(s => s.totalAttempts >= 2 && s.accuracy < 60);
  if (struggling.length > 0) {
    context += `\nStruggling topics: ${struggling.map(s => `${s.skillTitle} (${s.accuracy}%)`).join(', ')}\n`;
  }

  const excelling = skillStats.filter(s => s.totalAttempts >= 2 && s.accuracy >= 80);
  if (excelling.length > 0) {
    context += `\nStrong topics: ${excelling.map(s => `${s.skillTitle} (${s.accuracy}%)`).join(', ')}\n`;
  }

  context += `=== END CONTEXT ===\n`;
  return context;
}
