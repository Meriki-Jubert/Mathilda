import { useState, useCallback } from 'react';
import { curriculum } from './data/curriculum';
import { useProgress } from './hooks/useProgress';
import LearningTree from './components/LearningTree';
import SkillHub from './components/SkillHub';
import LessonView from './components/LessonView';
import PracticeView from './components/PracticeView';
import AIChatbot from './components/AIChatbot';
import WelcomeScreen from './components/WelcomeScreen';

type View = 'welcome' | 'tree' | 'skill-hub' | 'lesson' | 'practice';

interface ViewState {
  view: View;
  unitId?: string;
  skillId?: string;
  lessonId?: string;
}

function App() {
  const {
    progress,
    completeLesson,
    completePractice,
    unlockSkill,
    isSkillUnlocked,
    getSkillMastery,
  } = useProgress();

  const [viewState, setViewState] = useState<ViewState>(() => {
    // If user has progress, skip welcome
    const hasProgress = localStorage.getItem('math-mastery-progress');
    return { view: hasProgress ? 'tree' : 'welcome' };
  });

  const findUnit = useCallback((unitId: string) => {
    return curriculum.find(u => u.id === unitId);
  }, []);

  const findSkill = useCallback((unitId: string, skillId: string) => {
    const unit = findUnit(unitId);
    return unit?.skills.find(s => s.id === skillId);
  }, [findUnit]);

  const findLesson = useCallback((unitId: string, skillId: string, lessonId: string) => {
    const skill = findSkill(unitId, skillId);
    return skill?.lessons.find(l => l.id === lessonId);
  }, [findSkill]);

  const handleSelectSkill = (unitId: string, skillId: string) => {
    setViewState({ view: 'skill-hub', unitId, skillId });
  };

  const handleSelectLesson = (lessonId: string) => {
    setViewState(prev => ({ ...prev, view: 'lesson', lessonId }));
  };

  const handleStartPractice = () => {
    setViewState(prev => ({ ...prev, view: 'practice' }));
  };

  const handleLessonComplete = () => {
    if (viewState.unitId && viewState.skillId && viewState.lessonId) {
      completeLesson(viewState.skillId, viewState.lessonId);
    }
    setViewState(prev => ({ ...prev, view: 'skill-hub', lessonId: undefined }));
  };

  const handlePracticeComplete = (questionId: string) => {
    if (viewState.skillId) {
      completePractice(viewState.skillId, questionId);
      
      // Check if all practice questions are now complete
      const skill = findSkill(viewState.unitId!, viewState.skillId);
      if (skill) {
        const skillProg = progress.skillProgress[viewState.skillId];
        const completedCount = (skillProg?.practiceCompleted.length || 0) + 1;
        if (completedCount >= skill.practice.length) {
          // All practice complete - unlock the skill
          unlockSkill(viewState.skillId);
        }
      }
    }
  };

  const handleBackToTree = () => {
    setViewState({ view: 'tree' });
  };

  const handleBackToSkillHub = () => {
    setViewState(prev => ({ ...prev, view: 'skill-hub', lessonId: undefined }));
  };

  // Get current topic for AI chatbot context
  const getCurrentTopic = () => {
    if (viewState.unitId && viewState.skillId) {
      const skill = findSkill(viewState.unitId, viewState.skillId);
      return skill?.title || '';
    }
    return '';
  };

  const getCurrentUnitTitle = () => {
    if (viewState.unitId) {
      const unit = findUnit(viewState.unitId);
      return unit?.title || '';
    }
    return '';
  };

  // Render based on current view
  const renderView = () => {
    switch (viewState.view) {
      case 'welcome':
        return <WelcomeScreen onStart={() => setViewState({ view: 'tree' })} />;

      case 'tree':
        return (
          <LearningTree
            units={curriculum}
            completedSkills={progress.completedSkills}
            getSkillMastery={getSkillMastery}
            isSkillUnlocked={(index, ids) => isSkillUnlocked(index, ids)}
            onSelectSkill={handleSelectSkill}
            totalXP={progress.totalXP}
          />
        );

      case 'skill-hub': {
        const unit = findUnit(viewState.unitId!);
        const skill = findSkill(viewState.unitId!, viewState.skillId!);
        if (!unit || !skill) return null;

        const skillProg = progress.skillProgress[viewState.skillId!];
        return (
          <SkillHub
            skill={skill}
            unitTitle={unit.title}
            lessonsCompleted={skillProg?.lessonsCompleted || []}
            practiceCompleted={skillProg?.practiceCompleted || []}
            masteryLevel={getSkillMastery(viewState.skillId!)}
            onSelectLesson={handleSelectLesson}
            onStartPractice={handleStartPractice}
            onBack={handleBackToTree}
          />
        );
      }

      case 'lesson': {
        const lesson = findLesson(viewState.unitId!, viewState.skillId!, viewState.lessonId!);
        if (!lesson) return null;

        const skillProg = progress.skillProgress[viewState.skillId!];
        const isCompleted = skillProg?.lessonsCompleted.includes(viewState.lessonId!) || false;

        return (
          <LessonView
            lesson={lesson}
            onComplete={handleLessonComplete}
            onBack={handleBackToSkillHub}
            isCompleted={isCompleted}
          />
        );
      }

      case 'practice': {
        const skill = findSkill(viewState.unitId!, viewState.skillId!);
        if (!skill) return null;

        const skillProg = progress.skillProgress[viewState.skillId!];

        return (
          <PracticeView
            questions={skill.practice}
            skillId={viewState.skillId!}
            onComplete={handlePracticeComplete}
            onBack={handleBackToSkillHub}
            completedQuestions={skillProg?.practiceCompleted || []}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {renderView()}
      {viewState.view !== 'welcome' && (
        <AIChatbot
          currentTopic={getCurrentTopic()}
          currentUnit={getCurrentUnitTitle()}
        />
      )}
    </div>
  );
}

export default App;
