import { useState, useEffect, useCallback } from 'react';
import {
  AnalyticsData,
  AnswerLog,
  loadAnalytics,
  saveAnalytics,
  logAnswer,
  logLesson,
  logChat,
  computeSkillStats,
  generateWeeklyReport,
  buildAIContext,
  WeeklyReport,
  SkillStats,
} from '../services/analytics';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData>(() => loadAnalytics());

  useEffect(() => {
    saveAnalytics(data);
  }, [data]);

  const recordAnswer = useCallback((log: Omit<AnswerLog, 'id' | 'timestamp'>) => {
    setData(prev => logAnswer(prev, log));
  }, []);

  const recordLesson = useCallback((log: { skillId: string; skillTitle: string; unitId: string; lessonId: string; lessonTitle: string }) => {
    setData(prev => logLesson(prev, log));
  }, []);

  const recordChat = useCallback((log: { topic: string; message: string; hadImage: boolean }) => {
    setData(prev => logChat(prev, log));
  }, []);

  const getSkillStats = useCallback((): SkillStats[] => {
    return computeSkillStats(data);
  }, [data]);

  const getWeeklyReport = useCallback((): WeeklyReport => {
    return generateWeeklyReport(data);
  }, [data]);

  const getAIContext = useCallback((currentSkillId?: string, currentQuestion?: string): string => {
    return buildAIContext(data, currentSkillId, currentQuestion);
  }, [data]);

  const resetAnalytics = useCallback(() => {
    setData({
      answerLogs: [],
      lessonLogs: [],
      chatLogs: [],
      streakDays: 0,
      lastActiveDate: '',
      totalStudyTimeMs: 0,
    });
  }, []);

  return {
    data,
    recordAnswer,
    recordLesson,
    recordChat,
    getSkillStats,
    getWeeklyReport,
    getAIContext,
    resetAnalytics,
  };
}
