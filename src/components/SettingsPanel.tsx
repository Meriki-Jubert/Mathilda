import { useState, useEffect } from 'react';
import { FiX, FiExternalLink, FiCheck, FiAlertCircle, FiZap, FiEye } from 'react-icons/fi';
import { AIConfig, AIProvider, PROVIDER_INFO, VISION_MODELS, getModelsForProvider } from '../services/aiModels';
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
    setLocalConfig(config);
    setTestResult(null);
  }, [config, isOpen]);

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
        setTestResult({ success: true, message: 'Connection successful! ✅' });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800">⚙️ AI Settings</h2>
            <p className="text-sm text-gray-500">Configure your AI tutor</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              AI Provider
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(Object.keys(PROVIDER_INFO) as AIProvider[]).map(provider => {
                const info = PROVIDER_INFO[provider];
                const isSelected = localConfig.provider === provider;
                return (
                  <button
                    key={provider}
                    onClick={() => handleProviderChange(provider)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: info.color }}
                      />
                      <span className={`text-sm font-medium ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>
                        {info.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* API Key */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-gray-700">
                API Key
              </label>
              <a
                href={providerInfo.getApiKeyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700"
              >
                Get API key <FiExternalLink size={12} />
              </a>
            </div>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={localConfig.apiKey}
                onChange={e => setLocalConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder={`Enter your ${providerInfo.name} API key...`}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 text-sm font-mono"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiEye size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              🔒 Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Vision Model
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {availableModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => setLocalConfig(prev => ({ ...prev, modelId: model.id }))}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                    localConfig.modelId === model.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${
                          localConfig.modelId === model.id ? 'text-purple-700' : 'text-gray-800'
                        }`}>
                          {model.name}
                        </span>
                        {model.free && (
                          <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                            FREE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{model.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <FiZap size={10} /> {model.strengths}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        Context: {model.contextWindow}
                      </span>
                    </div>
                    {localConfig.modelId === model.id && (
                      <FiCheck className="text-purple-600 mt-1 flex-shrink-0" size={18} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Test Connection */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-gray-700">Test Connection</h4>
                <p className="text-xs text-gray-500">Verify your API key works</p>
              </div>
              <button
                onClick={handleTest}
                disabled={testing || !localConfig.apiKey}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {testing ? 'Testing...' : 'Test'}
              </button>
            </div>
            {testResult && (
              <div className={`mt-3 flex items-center gap-2 text-sm ${
                testResult.success ? 'text-green-600' : 'text-red-600'
              }`}>
                {testResult.success ? <FiCheck /> : <FiAlertCircle />}
                {testResult.message}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-bold text-sm text-blue-800 mb-2">💡 How to get API keys:</h4>
            <div className="text-xs text-blue-700 space-y-2">
              {localConfig.provider === 'huggingface' && (
                <>
                  <p>1. Go to <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="underline font-medium">huggingface.co</a> and create a free account</p>
                  <p>2. Go to Settings → Access Tokens</p>
                  <p>3. Create a new token with "Read" access</p>
                  <p>4. Free tier has rate limits but works great for learning!</p>
                </>
              )}
              {localConfig.provider === 'openai' && (
                <>
                  <p>1. Go to <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">platform.openai.com</a></p>
                  <p>2. Create an account and add billing (pay-as-you-go)</p>
                  <p>3. Go to API Keys and create a new key</p>
                  <p>4. GPT-4o-mini is very affordable (~$0.15/1M input tokens)</p>
                </>
              )}
              {localConfig.provider === 'anthropic' && (
                <>
                  <p>1. Go to <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">console.anthropic.com</a></p>
                  <p>2. Create an account and add credits</p>
                  <p>3. Go to Settings → API Keys</p>
                  <p>4. Claude is excellent at patient math tutoring</p>
                </>
              )}
              {localConfig.provider === 'google' && (
                <>
                  <p>1. Go to <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">aistudio.google.com</a></p>
                  <p>2. Sign in with Google account</p>
                  <p>3. Click "Get API Key" → Create API Key</p>
                  <p>4. Gemini has a generous free tier!</p>
                </>
              )}
              {localConfig.provider === 'together' && (
                <>
                  <p>1. Go to <a href="https://api.together.xyz" target="_blank" rel="noopener noreferrer" className="underline font-medium">api.together.xyz</a></p>
                  <p>2. Create an account</p>
                  <p>3. Go to Settings → API Keys</p>
                  <p>4. Access open-source vision models</p>
                </>
              )}
              {localConfig.provider === 'openrouter' && (
                <>
                  <p>1. Go to <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="underline font-medium">openrouter.ai</a></p>
                  <p>2. Create an account (some models are FREE)</p>
                  <p>3. Go to Keys → Create Key</p>
                  <p>4. Access many models through one API, including free options!</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-5 flex items-center justify-between rounded-b-2xl">
          <button
            onClick={handleDisable}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Use Mock AI
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!localConfig.apiKey || !localConfig.modelId}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              Save & Enable AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
