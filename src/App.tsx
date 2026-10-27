import { useState, useCallback, useRef, useEffect } from 'react';
import { curriculum } from './data/curriculum';
import { useProgress } from './hooks/useProgress';
import { useAIConfig } from './hooks/useAIConfig';
import { useAnalytics } from './hooks/useAnalytics';
import LearningTree from './components/LearningTree';
import SkillHub from './components/SkillHub';
import LessonView from './components/LessonView';
import PracticeView from './components/PracticeView';
import AIChatbot from './components/AIChatbot';
import WelcomeScreen from './components/WelcomeScreen';
import SettingsPanel from './components/SettingsPanel';
import WeeklyReportView from './components/WeeklyReport';

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

  const { config: aiConfig, updateConfig: updateAIConfig, isAIEnabled } = useAIConfig();
  const analytics = useAnalytics();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const [viewState, setViewState] = useState<ViewState>(() => {
    const hasProgress = localStorage.getItem('math-mastery-progress');
    return { view: hasProgress ? 'tree' : 'welcome' };
  });

  // Practice state for AI answer injection
  const [injectedAnswer, setInjectedAnswer] = useState<string | null>(null);
  const questionStartTime = useRef<number>(Date.now());

  // Track current question for analytics
  const currentSkill = viewState.unitId && viewState.skillId
    ? findSkillHelper(viewState.unitId, viewState.skillId)
    : null;

  function findSkillHelper(unitId: string, skillId: string) {
    const unit = curriculum.find(u => u.id === unitId);
    return unit?.skills.find(s => s.id === skillId);
  }

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
    questionStartTime.current = Date.now();
    setViewState(prev => ({ ...prev, view: 'practice' }));
  };

  const handleLessonComplete = () => {
    if (viewState.unitId && viewState.skillId && viewState.lessonId) {
      completeLesson(viewState.skillId, viewState.lessonId);
      
      // Log lesson completion
      const unit = findUnit(viewState.unitId);
      const skill = findSkill(viewState.unitId, viewState.skillId);
      const lesson = findLesson(viewState.unitId, viewState.skillId, viewState.lessonId);
      if (unit && skill && lesson) {
        analytics.recordLesson({
          skillId: skill.id,
          skillTitle: skill.title,
          unitId: unit.id,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
        });
      }
    }
    setViewState(prev => ({ ...prev, view: 'skill-hub', lessonId: undefined }));
  };

  const handlePracticeComplete = (questionId: string, isCorrect: boolean, userAnswer: string, hintUsed: boolean) => {
    if (viewState.skillId && viewState.unitId) {
      const timeSpent = Date.now() - questionStartTime.current;
      questionStartTime.current = Date.now();

      completePractice(viewState.skillId, questionId);

      // Log the answer
      const unit = findUnit(viewState.unitId);
      const skill = findSkill(viewState.unitId, viewState.skillId);
      const question = skill?.practice.find(q => q.id === questionId);
      
      if (unit && skill && question) {
        analytics.recordAnswer({
          skillId: skill.id,
          skillTitle: skill.title,
          unitId: unit.id,
          unitTitle: unit.title,
          questionId: question.id,
          question: question.question,
          userAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect,
          questionType: question.type,
          hintUsed,
          timeSpentMs: timeSpent,
        });
      }

      // Check if all practice questions are complete
      if (skill) {
        const skillProg = progress.skillProgress[viewState.skillId];
        const completedCount = (skillProg?.practiceCompleted.length || 0) + 1;
        if (completedCount >= skill.practice.length) {
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

  // Handle AI extracting answer from image
  const handleImageAnswerExtracted = (answer: string) => {
    setInjectedAnswer(answer);
  };

  // Handle chat logging
  const handleChatLogged = (message: string, hadImage: boolean) => {
    analytics.recordChat({
      topic: getCurrentTopic(),
      message,
      hadImage,
    });
  };

  // Clear injected answer after it's been consumed
  useEffect(() => {
    if (injectedAnswer && viewState.view !== 'practice') {
      setInjectedAnswer(null);
    }
  }, [viewState.view, injectedAnswer]);

  // Build AI context
  const aiContext = analytics.getAIContext(
    viewState.skillId,
    currentSkill?.practice?.[0]?.question
  );

  const isInPracticeMode = viewState.view === 'practice';

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
            streakDays={analytics.data.streakDays}
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
            injectedAnswer={injectedAnswer}
            onAnswerConsumed={() => setInjectedAnswer(null)}
          />
        );
      }

      default:
        return null;
    }
  };

  // Get current question text for AI context
  const getCurrentQuestion = () => {
    if (viewState.view === 'practice' && viewState.unitId && viewState.skillId) {
      const skill = findSkill(viewState.unitId, viewState.skillId);
      const skillProg = progress.skillProgress[viewState.skillId];
      const completedIds = skillProg?.practiceCompleted || [];
      const nextQuestion = skill?.practice.find(q => !completedIds.includes(q.id));
      return nextQuestion?.question || '';
    }
    return '';
  };

  return (
    <div className="relative">
      {/* Settings & Report Buttons */}
      {viewState.view !== 'welcome' && (
        <div className="fixed top-4 right-4 z-40 flex gap-2">
          <button
            onClick={() => setReportOpen(true)}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg border border-gray-200 transition-all hover:scale-105"
            title="Weekly Report"
          >
            <span className="text-lg">📊</span>
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg border border-gray-200 transition-all hover:scale-105"
            title="AI Settings"
          >
            <span className="text-lg">⚙️</span>
          </button>
        </div>
      )}

      {renderView()}

      {viewState.view !== 'welcome' && (
        <AIChatbot
          currentTopic={getCurrentTopic()}
          currentUnit={getCurrentUnitTitle()}
          currentSkillId={viewState.skillId}
          currentQuestion={getCurrentQuestion()}
          config={aiConfig}
          isAIEnabled={isAIEnabled}
          aiContext={aiContext}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenReport={() => setReportOpen(true)}
          onImageAnswerExtracted={handleImageAnswerExtracted}
          onChatLogged={handleChatLogged}
          isInPracticeMode={isInPracticeMode}
        />
      )}

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        config={aiConfig}
        onSave={updateAIConfig}
      />

      <WeeklyReportView
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        report={analytics.getWeeklyReport()}
      />
    </div>
  );
}

export default App;
