import { useState, useEffect, useCallback } from 'react';
import { AIConfig, AIProvider } from '../services/aiModels';

const AI_CONFIG_KEY = 'math-mastery-ai-config';

const DEFAULT_CONFIG: AIConfig = {
  provider: 'huggingface' as AIProvider,
  apiKey: '',
  modelId: 'Qwen/Qwen2-VL-7B-Instruct',
  enabled: false,
};

export function useAIConfig(onCloudSave?: (config: AIConfig) => void) {
  const [config, setConfig] = useState<AIConfig>(() => {
    try {
      const saved = localStorage.getItem(AI_CONFIG_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load AI config:', e);
    }
    return DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
  }, [config]);

  const mergeCloudAIConfig = useCallback((cloudConfig?: Partial<AIConfig>) => {
    if (!cloudConfig) return;
    setConfig(prev => {
      if (cloudConfig.apiKey || cloudConfig.modelId || cloudConfig.provider) {
        const provider = (cloudConfig.provider as AIProvider) || prev.provider;
        const apiKey = cloudConfig.apiKey !== undefined ? cloudConfig.apiKey : prev.apiKey;
        const modelId = cloudConfig.modelId || prev.modelId;
        const enabled = cloudConfig.enabled !== undefined ? cloudConfig.enabled : prev.enabled;

        if (
          provider === prev.provider &&
          apiKey === prev.apiKey &&
          modelId === prev.modelId &&
          enabled === prev.enabled
        ) {
          return prev;
        }

        return { provider, apiKey, modelId, enabled };
      }
      return prev;
    });
  }, []);

  const updateConfig = (newConfig: AIConfig) => {
    setConfig(newConfig);
    if (onCloudSave) {
      onCloudSave(newConfig);
    }
  };

  const isAIEnabled = config.enabled && !!config.apiKey;

  return {
    config,
    updateConfig,
    mergeCloudAIConfig,
    isAIEnabled,
  };
}
