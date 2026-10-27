import { useState, useEffect } from 'react';
import { AIConfig, AIProvider } from '../services/aiModels';

const AI_CONFIG_KEY = 'math-mastery-ai-config';

const DEFAULT_CONFIG: AIConfig = {
  provider: 'huggingface' as AIProvider,
  apiKey: '',
  modelId: 'Qwen/Qwen2-VL-7B-Instruct',
  enabled: false,
};

export function useAIConfig() {
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

  const updateConfig = (newConfig: AIConfig) => {
    setConfig(newConfig);
  };

  const isAIEnabled = config.enabled && !!config.apiKey;

  return {
    config,
    updateConfig,
    isAIEnabled,
  };
}
