import { useState, useEffect, useCallback } from 'react';

export interface SkillProgress {
  skillId: string;
  lessonsCompleted: string[];
  practiceCompleted: string[];
  masteryLevel: number; // 0-100
}

export interface UserProgress {
  completedSkills: string[];
  skillProgress: Record<string, SkillProgress>;
  currentUnit: string;
  currentSkill: string;
  totalXP: number;
}

const DEFAULT_PROGRESS: UserProgress = {
  completedSkills: [],
  skillProgress: {},
  currentUnit: 'unit-1',
  currentSkill: 'skill-1.1',
  totalXP: 0,
};

const STORAGE_KEY = 'math-mastery-progress';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeLesson = (skillId: string, lessonId: string) => {
    setProgress(prev => {
      const skillProg = prev.skillProgress[skillId] || {
        skillId,
        lessonsCompleted: [],
        practiceCompleted: [],
        masteryLevel: 0,
      };
      
      if (skillProg.lessonsCompleted.includes(lessonId)) return prev;

      const newLessons = [...skillProg.lessonsCompleted, lessonId];
      const mastery = Math.min(100, Math.round(
        (newLessons.length * 30 + skillProg.practiceCompleted.length * 20)
      ));

      return {
        ...prev,
        skillProgress: {
          ...prev.skillProgress,
          [skillId]: {
            ...skillProg,
            lessonsCompleted: newLessons,
            masteryLevel: mastery,
          },
        },
        totalXP: prev.totalXP + 10,
      };
    });
  };

  const completePractice = (skillId: string, questionId: string) => {
    setProgress(prev => {
      const skillProg = prev.skillProgress[skillId] || {
        skillId,
        lessonsCompleted: [],
        practiceCompleted: [],
        masteryLevel: 0,
      };

      if (skillProg.practiceCompleted.includes(questionId)) return prev;

      const newPractice = [...skillProg.practiceCompleted, questionId];
      const mastery = Math.min(100, Math.round(
        (skillProg.lessonsCompleted.length * 30 + newPractice.length * 20)
      ));

      return {
        ...prev,
        skillProgress: {
          ...prev.skillProgress,
          [skillId]: {
            ...skillProg,
            practiceCompleted: newPractice,
            masteryLevel: mastery,
          },
        },
        totalXP: prev.totalXP + 15,
      };
    });
  };

  const unlockSkill = (skillId: string) => {
    setProgress(prev => ({
      ...prev,
      completedSkills: prev.completedSkills.includes(skillId)
        ? prev.completedSkills
        : [...prev.completedSkills, skillId],
    }));
  };

  const isSkillUnlocked = (skillIndex: number, allSkillIds: string[]): boolean => {
    if (skillIndex === 0) return true;
    const prevSkillId = allSkillIds[skillIndex - 1];
    return progress.completedSkills.includes(prevSkillId);
  };

  const isSkillComplete = (skillId: string): boolean => {
    return progress.completedSkills.includes(skillId);
  };

  const getSkillMastery = (skillId: string): number => {
    return progress.skillProgress[skillId]?.masteryLevel || 0;
  };

  const setCurrentLocation = (unitId: string, skillId: string) => {
    setProgress(prev => ({
      ...prev,
      currentUnit: unitId,
      currentSkill: skillId,
    }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const mergeCloudProgress = useCallback((cloudData: Partial<UserProgress>) => {
    setProgress(prev => {
      const mergedCompletedSkills = Array.from(new Set([...prev.completedSkills, ...(cloudData.completedSkills || [])]));
      const mergedSkillProgress = {
        ...prev.skillProgress,
        ...(cloudData.skillProgress || {}),
      };
      const mergedUnit = cloudData.currentUnit || prev.currentUnit;
      const mergedSkill = cloudData.currentSkill || prev.currentSkill;
      const mergedXP = Math.max(prev.totalXP, cloudData.totalXP || 0);

      const isUnchanged =
        JSON.stringify(mergedCompletedSkills) === JSON.stringify(prev.completedSkills) &&
        JSON.stringify(mergedSkillProgress) === JSON.stringify(prev.skillProgress) &&
        mergedUnit === prev.currentUnit &&
        mergedSkill === prev.currentSkill &&
        mergedXP === prev.totalXP;

      if (isUnchanged) return prev;

      return {
        completedSkills: mergedCompletedSkills,
        skillProgress: mergedSkillProgress,
        currentUnit: mergedUnit,
        currentSkill: mergedSkill,
        totalXP: mergedXP,
      };
    });
  }, []);

  return {
    progress,
    setProgress,
    mergeCloudProgress,
    completeLesson,
    completePractice,
    unlockSkill,
    isSkillUnlocked,
    isSkillComplete,
    getSkillMastery,
    setCurrentLocation,
    resetProgress,
  };
}

