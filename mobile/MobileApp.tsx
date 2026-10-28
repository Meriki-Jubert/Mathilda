import { useState } from 'react';
import { useMobileSync } from './hooks/useMobileSync';
import { MobileBottomNav, MobileTab } from './components/MobileBottomNav';
import { MobileSyllabusMap } from './components/MobileSyllabusMap';
import { MobilePracticeView } from './components/MobilePracticeView';
import { MobileBackpackView } from './components/MobileBackpackView';
import { MobileSettingsView } from './components/MobileSettingsView';

export default function MobileApp() {
  const {
    currentUser,
    isSyncing,
    syncError,
    syncedState,
    saveMobileProgressToCloud,
    loginWithGoogle,
    logout,
  } = useMobileSync();

  const [activeTab, setActiveTab] = useState<MobileTab>('map');
  const [selectedUnitId, setSelectedUnitId] = useState('unit-1');
  const [selectedSkillId, setSelectedSkillId] = useState('skill-1.1');

  const handleSelectSkillFromMap = (unitId: string, skillId: string) => {
    setSelectedUnitId(unitId);
    setSelectedSkillId(skillId);
    setActiveTab('practice');
  };

  const handleCompleteQuestion = (skillId: string, questionId: string) => {
    const prevCompleted = syncedState.completedSkills;
    const newCompleted = prevCompleted.includes(skillId)
      ? prevCompleted
      : [...prevCompleted, skillId];

    saveMobileProgressToCloud({
      completedSkills: newCompleted,
      totalXP: syncedState.totalXP + 20,
      stamina: Math.min(100, syncedState.stamina + 15),
    });
  };

  const handleSaveAIKey = (apiKey: string) => {
    saveMobileProgressToCloud({
      aiConfig: {
        provider: 'huggingface',
        apiKey,
        modelId: 'Qwen/Qwen2-VL-7B-Instruct',
        enabled: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans max-w-md mx-auto relative px-3 shadow-xl">
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white p-3 rounded-b-xl border-b border-slate-800 flex items-center justify-between shadow-xs mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🌴</span>
          <div>
            <h1 className="text-xs font-bold font-mono text-amber-300">Mathilda Mobile Native</h1>
            <p className="text-[9px] font-mono text-slate-400">Jungle Expedition Android App</p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
          Sync Active
        </span>
      </header>

      {/* Main Tab Screen Content */}
      <main>
        {activeTab === 'map' && (
          <MobileSyllabusMap
            completedSkills={syncedState.completedSkills}
            onSelectSkill={handleSelectSkillFromMap}
          />
        )}

        {activeTab === 'practice' && (
          <MobilePracticeView
            selectedUnitId={selectedUnitId}
            selectedSkillId={selectedSkillId}
            onCompleteQuestion={handleCompleteQuestion}
            onBackToMap={() => setActiveTab('map')}
          />
        )}

        {activeTab === 'vault' && (
          <MobileBackpackView
            completedSkills={syncedState.completedSkills}
            totalXP={syncedState.totalXP}
            stamina={syncedState.stamina}
          />
        )}

        {activeTab === 'sync' && (
          <MobileSettingsView
            currentUser={currentUser}
            isSyncing={isSyncing}
            syncError={syncError}
            onLoginWithGoogle={loginWithGoogle}
            onLogout={logout}
            onSaveAIKey={handleSaveAIKey}
            currentAIKey={syncedState.aiConfig?.apiKey}
          />
        )}
      </main>

      {/* Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        stamina={syncedState.stamina}
        totalXP={syncedState.totalXP}
      />
    </div>
  );
}
