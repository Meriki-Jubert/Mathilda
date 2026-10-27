export type AIProvider = 'huggingface' | 'openai' | 'anthropic' | 'google' | 'together' | 'openrouter';

export interface VisionModel {
  id: string;
  name: string;
  provider: AIProvider;
  description: string;
  strengths: string;
  contextWindow: string;
  free?: boolean;
}

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  modelId: string;
  enabled: boolean;
}

// Vision models available across providers
export const VISION_MODELS: VisionModel[] = [
  // HuggingFace Models
  {
    id: 'Qwen/Qwen2.5-VL-72B-Instruct',
    name: 'Qwen 2.5 VL 72B',
    provider: 'huggingface',
    description: 'Powerful vision-language model by Alibaba. Excellent at reading handwritten math and understanding diagrams.',
    strengths: 'Math reasoning, handwriting recognition, diagram understanding',
    contextWindow: '32K tokens',
    free: true,
  },
  {
    id: 'Qwen/Qwen2-VL-7B-Instruct',
    name: 'Qwen 2 VL 7B',
    provider: 'huggingface',
    description: 'Smaller, faster vision model. Good for quick math explanations and image understanding.',
    strengths: 'Fast responses, good at basic math images',
    contextWindow: '32K tokens',
    free: true,
  },
  {
    id: 'meta-llama/Llama-3.2-11B-Vision-Instruct',
    name: 'Llama 3.2 11B Vision',
    provider: 'huggingface',
    description: "Meta's vision-capable model. Great at explaining concepts and reading mathematical notation in images.",
    strengths: 'Clear explanations, math notation recognition',
    contextWindow: '128K tokens',
    free: true,
  },
  {
    id: 'mistralai/Pixtral-12B-2409',
    name: 'Pixtral 12B',
    provider: 'huggingface',
    description: "Mistral's multimodal model. Strong at understanding charts, graphs, and mathematical diagrams.",
    strengths: 'Chart/graph reading, visual reasoning',
    contextWindow: '128K tokens',
    free: true,
  },
  // OpenAI Models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    description: "OpenAI's most capable model. Exceptional at math tutoring, reading handwriting, and step-by-step explanations.",
    strengths: 'Best overall math reasoning, excellent handwriting OCR',
    contextWindow: '128K tokens',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    description: 'Smaller, faster, cheaper version of GPT-4o. Great balance of quality and cost for everyday use.',
    strengths: 'Fast, affordable, still very capable at math',
    contextWindow: '128K tokens',
  },
  // Anthropic Models
  {
    id: 'claude-sonnet-4-20250514',
    name: 'Claude Sonnet 4',
    provider: 'anthropic',
    description: "Anthropic's latest model. Excellent at careful step-by-step math reasoning and patient teaching.",
    strengths: 'Detailed explanations, careful reasoning, patient tutoring style',
    contextWindow: '200K tokens',
  },
  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    description: 'Previous generation Claude. Still excellent at math and very affordable.',
    strengths: 'Strong math skills, good value',
    contextWindow: '200K tokens',
  },
  // Google Models
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'google',
    description: "Google's fast multimodal model. Great at understanding images and quick math explanations.",
    strengths: 'Fast, good image understanding, free tier available',
    contextWindow: '1M tokens',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    description: "Google's most capable model with massive context. Can process entire textbooks.",
    strengths: 'Massive context, excellent reasoning',
    contextWindow: '2M tokens',
  },
  // Together AI Models
  {
    id: 'llava-hf/llava-v1.6-34b',
    name: 'LLaVA v1.6 34B',
    provider: 'together',
    description: 'Open-source vision model. Good at general image understanding and math problems.',
    strengths: 'Open source, good visual understanding',
    contextWindow: '4K tokens',
  },
  // OpenRouter Models (access to many models through one API)
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash (Free)',
    provider: 'openrouter',
    description: "Access Google's Gemini Flash for free through OpenRouter. Great for getting started!",
    strengths: 'FREE, fast, good vision capabilities',
    contextWindow: '1M tokens',
    free: true,
  },
  {
    id: 'meta-llama/llama-3.2-11b-vision-instruct',
    name: 'Llama 3.2 Vision (via OpenRouter)',
    provider: 'openrouter',
    description: "Meta's vision model accessible through OpenRouter's unified API.",
    strengths: 'Good math explanations, image understanding',
    contextWindow: '128K tokens',
  },
];

export const PROVIDER_INFO: Record<AIProvider, { name: string; baseUrl: string; getApiKeyUrl: string; color: string }> = {
  huggingface: {
    name: 'HuggingFace',
    baseUrl: 'https://api-inference.huggingface.co',
    getApiKeyUrl: 'https://huggingface.co/settings/tokens',
    color: '#FF9D00',
  },
  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    getApiKeyUrl: 'https://platform.openai.com/api-keys',
    color: '#10A37F',
  },
  anthropic: {
    name: 'Anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    getApiKeyUrl: 'https://console.anthropic.com/settings/keys',
    color: '#D4A574',
  },
  google: {
    name: 'Google AI',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    getApiKeyUrl: 'https://aistudio.google.com/apikey',
    color: '#4285F4',
  },
  together: {
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    getApiKeyUrl: 'https://api.together.xyz/settings/api-keys',
    color: '#000000',
  },
  openrouter: {
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    getApiKeyUrl: 'https://openrouter.ai/keys',
    color: '#6366F1',
  },
};

export function getModelsForProvider(provider: AIProvider): VisionModel[] {
  return VISION_MODELS.filter(m => m.provider === provider);
}
