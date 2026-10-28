import { useState, useEffect } from 'react';
import { FiX, FiExternalLink, FiCheck, FiAlertCircle, FiZap, FiEye } from 'react-icons/fi';
import { AIConfig, AIProvider, PROVIDER_INFO, getModelsForProvider } from '../services/aiModels';
import { testConnection } from '../services/aiService';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: AIConfig;
  onSave: (config: AIConfig) => void;
}

export default function SettingsPanel({ isOpen, onClose, config, onSave }: SettingsPanelProps) {
  const [localConfig, setLocalConfig] = useState<AIConfig>(config);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalConfig(config);
      setTestResult(null);
    }
  }, [isOpen]);

  const handleProviderChange = (provider: AIProvider) => {
    const models = getModelsForProvider(provider);
    setLocalConfig(prev => ({
      ...prev,
      provider,
      modelId: models[0]?.id || '',
    }));
    setTestResult(null);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const result = await testConnection(localConfig);
      if (result.success) {
        setTestResult({ success: true, message: 'Connection verified successfully! ✓' });
      } else {
        setTestResult({ success: false, message: result.error || 'Connection failed' });
      }
    } catch (error) {
      setTestResult({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Connection failed' 
      });
    }
    setTesting(false);
  };

  const handleSave = () => {
    onSave({ ...localConfig, enabled: true });
    onClose();
  };

  const handleDisable = () => {
    onSave({ ...localConfig, enabled: false });
    onClose();
  };

  if (!isOpen) return null;

  const availableModels = getModelsForProvider(localConfig.provider);
  const providerInfo = PROVIDER_INFO[localConfig.provider];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans text-slate-900">
      <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white border-b border-slate-800 p-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              <span>⚙️</span> AI Tutor Configuration Engine
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Select provider, vision model, and API keys for AI feedback</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1 bg-slate-50">
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. AI Provider Engine
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(Object.keys(PROVIDER_INFO) as AIProvider[]).map(provider => {
                const info = PROVIDER_INFO[provider];
                const isSelected = localConfig.provider === provider;
                return (
                  <button
                    key={provider}
                    onClick={() => handleProviderChange(provider)}
                    className={`p-2.5 rounded border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-slate-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: info.color }}
                      />
                      <span className="text-xs font-mono font-semibold">
                        {info.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* API Key Entry */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. {providerInfo.name} API Key
              </label>
              <a
                href={providerInfo.getApiKeyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-emerald-700 hover:underline font-mono font-semibold"
              >
                Get API Key <FiExternalLink size={12} />
              </a>
            </div>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={localConfig.apiKey}
                onChange={e => setLocalConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder={`Paste your ${providerInfo.name} API key...`}
                className="w-full px-3 py-2.5 pr-10 border border-slate-300 rounded bg-white text-slate-900 focus:outline-none focus:border-emerald-600 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
              >
                <FiEye size={16} />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">
              🔒 API Key stored locally in browser session storage. Never transmitted to third party servers.
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              3. Vision Model Selection
            </label>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {availableModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => setLocalConfig(prev => ({ ...prev, modelId: model.id }))}
                  className={`w-full text-left p-3 rounded border transition-all ${
                    localConfig.modelId === model.id
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-xs ${
                          localConfig.modelId === model.id ? 'text-emerald-950' : 'text-slate-900'
                        }`}>
                          {model.name}
                        </span>
                        {model.free && (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                            FREE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{model.description}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-slate-500">
                        <span className="flex items-center gap-1">
                          <FiZap size={10} /> {model.strengths}
                        </span>
                        <span>Context: {model.contextWindow}</span>
                      </div>
                    </div>
                    {localConfig.modelId === model.id && (
                      <FiCheck className="text-emerald-700 shrink-0 mt-0.5" size={16} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Test Connection Section */}
          <div className="bg-white rounded border border-slate-200 p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Test Provider Connection</h4>
                <p className="text-xs text-slate-500">Verify key validity before saving</p>
              </div>
              <button
                onClick={handleTest}
                disabled={testing || !localConfig.apiKey}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {testing ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
            {testResult && (
              <div className={`mt-2.5 text-xs font-mono p-2 rounded border flex items-center gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                  : 'bg-red-50 border-red-300 text-red-950 font-bold'
              }`}>
                {testResult.success ? <FiCheck size={14} /> : <FiAlertCircle size={14} />}
                {testResult.message}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-100 border-t border-slate-200 p-4 flex items-center justify-between shrink-0">
          <button
            onClick={handleDisable}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-900 text-xs font-medium font-mono transition-colors"
          >
            Use Fallback Offline AI
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!localConfig.apiKey || !localConfig.modelId}
              className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
            >
              Save & Activate Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
