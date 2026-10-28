import { useState, useCallback, useRef, useEffect } from 'react';
import { FiBook, FiFileText, FiBookmark, FiSliders, FiBarChart2, FiSettings, FiCloud } from 'react-icons/fi';
import { curriculum } from './data/curriculum';
import { useProgress } from './hooks/useProgress';
import { useFirebaseSync } from './hooks/useFirebaseSync';
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
import HndExamBankView from './components/HndExamBankView';
import HndFormulaSheetView from './components/HndFormulaSheetView';
import HndSolversView from './components/HndSolversView';
import BackpackModal from './components/BackpackModal';
import AccountSyncModal from './components/AccountSyncModal';

type View = 'welcome' | 'tree' | 'skill-hub' | 'lesson' | 'practice' | 'hnd-exams' | 'hnd-formulas' | 'hnd-solvers';

interface ViewState {
  view: View;
  unitId?: string;
  skillId?: string;
  lessonId?: string;
}

function App() {
  const {
    progress,
    mergeCloudProgress,
    completeLesson,
    completePractice,
    unlockSkill,
    isSkillUnlocked,
    getSkillMastery,
  } = useProgress();

  const {
    currentUser,
    isSyncing,
    syncError,
    syncedState,
    saveProgressToCloud,
    saveAIConfigToCloud,
    loginWithGoogle,
    logout,
  } = useFirebaseSync();

  const {
    config: aiConfig,
    updateConfig: updateAIConfig,
    mergeCloudAIConfig,
    isAIEnabled,
  } = useAIConfig(saveAIConfigToCloud);

  const analytics = useAnalytics();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [backpackOpen, setBackpackOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);

  // Sync cloud state into local progress & AI config on cloud document load
  useEffect(() => {
    if (syncedState) {
      mergeCloudProgress(syncedState);
      if (syncedState.aiConfig) {
        mergeCloudAIConfig(syncedState.aiConfig);
      }
    }
  }, [syncedState, mergeCloudProgress, mergeCloudAIConfig]);

  // Persist local progress updates to Firestore in real time
  const prevSavedRef = useRef<string>('');

  useEffect(() => {
    if (!currentUser) return;

    const currentPayload = {
      completedSkills: progress.completedSkills,
      skillProgress: progress.skillProgress,
      currentUnit: progress.currentUnit,
      currentSkill: progress.currentSkill,
      totalXP: progress.totalXP,
      aiConfig,
    };

    const currentPayloadStr = JSON.stringify(currentPayload);
    if (currentPayloadStr === prevSavedRef.current) {
      return;
    }

    prevSavedRef.current = currentPayloadStr;
    saveProgressToCloud(currentPayload);
  }, [progress, aiConfig, currentUser, saveProgressToCloud]);

  const [viewState, setViewState] = useState<ViewState>(() => {
    const hasProgress = localStorage.getItem('math-mastery-progress');
    return { view: hasProgress ? 'tree' : 'welcome' };
  });

  const [injectedAnswer, setInjectedAnswer] = useState<string | null>(null);
  const questionStartTime = useRef<number>(Date.now());

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

  const handleImageAnswerExtracted = (answer: string) => {
    setInjectedAnswer(answer);
  };

  const handleChatLogged = (message: string, hadImage: boolean) => {
    analytics.recordChat({
      topic: getCurrentTopic(),
      message,
      hadImage,
    });
  };

  useEffect(() => {
    if (injectedAnswer && viewState.view !== 'practice') {
      setInjectedAnswer(null);
    }
  }, [viewState.view, injectedAnswer]);

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
            onOpenBackpack={() => setBackpackOpen(true)}
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
            unitId={viewState.unitId}
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

      case 'hnd-exams':
        return <HndExamBankView onBack={handleBackToTree} />;

      case 'hnd-formulas':
        return <HndFormulaSheetView onBack={handleBackToTree} />;

      case 'hnd-solvers':
        return <HndSolversView onBack={handleBackToTree} />;

      default:
        return null;
    }
  };

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
    <div className="relative min-h-screen bg-[#FAF9F6] text-stone-900 font-sans">
      {/* Editorial Header Navigation */}
      {viewState.view !== 'welcome' && (
        <header className="sticky top-0 z-30 bg-slate-900 text-slate-100 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToTree}
              className="text-sm font-bold tracking-tight text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
            >
              <span className="font-mono text-amber-300 font-extrabold text-xs uppercase px-1.5 py-0.5 border border-amber-500/40 bg-amber-950 rounded flex items-center gap-1">
                🌴 Mathilda
              </span>
              <span className="hidden sm:inline font-bold">Jungle Expedition</span>
            </button>
          </div>

          <nav className="flex items-center gap-1 sm:gap-1.5 font-mono text-xs">
            <button
              onClick={() => setViewState({ view: 'tree' })}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                viewState.view === 'tree' || viewState.view === 'skill-hub' || viewState.view === 'lesson' || viewState.view === 'practice'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FiBook size={13} />
              <span>Syllabus Map</span>
            </button>

            <button
              onClick={() => setViewState({ view: 'hnd-exams' })}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                viewState.view === 'hnd-exams'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FiFileText size={13} />
              <span>Past Paper Vault</span>
            </button>

            <button
              onClick={() => setViewState({ view: 'hnd-formulas' })}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                viewState.view === 'hnd-formulas'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FiBookmark size={13} />
              <span>Formulas</span>
            </button>

            <button
              onClick={() => setViewState({ view: 'hnd-solvers' })}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                viewState.view === 'hnd-solvers'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FiSliders size={13} />
              <span>Solvers</span>
            </button>

            <button
              onClick={() => setSyncModalOpen(true)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 rounded font-semibold transition-all flex items-center gap-1.5 ml-1"
              title="Cloud Database Sync"
            >
              <FiCloud size={13} className={isSyncing ? 'animate-spin text-amber-400' : 'text-emerald-400'} />
              <span className="hidden md:inline font-mono text-[11px]">Sync State</span>
            </button>
          </nav>
        </header>
      )}

      {/* Analytics & Settings Controls */}
      {viewState.view !== 'welcome' && (
        <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-2">
          <button
            onClick={() => setSyncModalOpen(true)}
            className="p-2.5 bg-slate-900 text-emerald-400 rounded border border-emerald-800/80 shadow-md hover:shadow-lg transition-all hover:scale-105"
            title="Cloud Device Sync"
          >
            <FiCloud size={18} />
          </button>
          <button
            onClick={() => setBackpackOpen(true)}
            className="p-2.5 bg-amber-900 text-amber-200 rounded border border-amber-700 shadow-md hover:shadow-lg transition-all hover:scale-105"
            title="Open Expedition Backpack"
          >
            <span className="text-base">🎒</span>
          </button>
          <button
            onClick={() => setReportOpen(true)}
            className="p-2.5 bg-white text-slate-800 rounded border border-slate-300 shadow-md hover:shadow-lg transition-all hover:border-slate-400"
            title="Weekly Study Analytics"
          >
            <FiBarChart2 size={18} />
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2.5 bg-white text-slate-800 rounded border border-slate-300 shadow-md hover:shadow-lg transition-all hover:border-slate-400"
            title="Tutor Settings"
          >
            <FiSettings size={18} />
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

      <BackpackModal
        isOpen={backpackOpen}
        onClose={() => setBackpackOpen(false)}
        completedSkills={progress.completedSkills}
        totalXP={progress.totalXP}
        onNavigateToExams={() => setViewState({ view: 'hnd-exams' })}
      />

      <AccountSyncModal
        isOpen={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        currentUser={currentUser}
        isSyncing={isSyncing}
        syncError={syncError}
        onLoginWithGoogle={loginWithGoogle}
        onLogout={logout}
        totalXP={progress.totalXP}
        completedSkillsCount={progress.completedSkills.length}
      />
    </div>
  );
}

export default App;
