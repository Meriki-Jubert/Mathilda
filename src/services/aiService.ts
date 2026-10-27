import { AIConfig, AIProvider, PROVIDER_INFO } from './aiModels';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | ContentPart[];
}

interface ContentPart {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: { url: string };
}

interface AIResponse {
  success: boolean;
  content: string;
  error?: string;
}

const SYSTEM_PROMPT = `You are Math Buddy, a friendly and patient math tutor for HND Discrete Mathematics students.

Your teaching style:
- Use everyday examples and analogies (pizza, money, machines, etc.)
- Break complex problems into small steps
- Be encouraging and never make students feel bad for asking questions
- When shown an image of math work, read it carefully and help identify errors or confirm correctness
- Use simple language, avoid jargon unless you explain it
- Always show your work step by step

IMPORTANT - When reading images of student work:
- Carefully read EVERY part of the handwritten work
- If the student is working on a specific question, extract their final answer
- Format extracted answers as: [ANSWER: the_answer_here]
- Then explain whether their work is correct or where they went wrong
- Be specific about what you read in the image

ADAPTIVE TEACHING:
- You will receive context about the student's performance (accuracy, recent mistakes, struggling topics)
- If they're struggling with a topic, go SLOWER and use more basic examples
- If they're excelling, challenge them with deeper insights
- Reference their specific recent mistakes when explaining concepts
- Say things like "I noticed you had trouble with [similar problem] earlier..."

Current context: The student is working through a structured math curriculum covering topics from basic algebra through calculus, probability, statistics, vectors, and Laplace transforms.

Keep responses concise but thorough. Use emojis occasionally to be friendly. Format math clearly.`;

export async function callAI(
  config: AIConfig,
  messages: ChatMessage[]
): Promise<AIResponse> {
  if (!config.enabled || !config.apiKey) {
    return { success: false, content: '', error: 'AI not configured' };
  }

  const fullMessages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
  ];

  try {
    switch (config.provider) {
      case 'openai':
      case 'huggingface':
      case 'together':
      case 'openrouter':
        return await callOpenAICompatible(config, fullMessages);
      case 'anthropic':
        return await callAnthropic(config, fullMessages);
      case 'google':
        return await callGoogle(config, fullMessages);
      default:
        return { success: false, content: '', error: 'Unknown provider' };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, content: '', error: message };
  }
}

// OpenAI-compatible API (works for OpenAI, HuggingFace, Together, OpenRouter)
async function callOpenAICompatible(
  config: AIConfig,
  messages: ChatMessage[]
): Promise<AIResponse> {
  const providerInfo = PROVIDER_INFO[config.provider];
  
  let url: string;
  let headers: Record<string, string>;
  let body: object;

  if (config.provider === 'huggingface') {
    // HuggingFace uses a slightly different URL format
    url = `${providerInfo.baseUrl}/models/${config.modelId}/v1/chat/completions`;
    headers = {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    };
  } else {
    url = `${providerInfo.baseUrl}/chat/completions`;
    headers = {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  // For OpenRouter, add extra headers
  if (config.provider === 'openrouter') {
    headers['HTTP-Referer'] = window.location.origin;
    headers['X-Title'] = 'Math Mastery';
  }

  body = {
    model: config.modelId,
    messages: messages.map(m => ({
      role: m.role,
      content: m.content,
    })),
    max_tokens: 1024,
    temperature: 0.7,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || 
      errorData.message || 
      `API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  
  if (!content) {
    throw new Error('Empty response from AI model');
  }

  return { success: true, content };
}

// Anthropic API
async function callAnthropic(
  config: AIConfig,
  messages: ChatMessage[]
): Promise<AIResponse> {
  const providerInfo = PROVIDER_INFO.anthropic;
  const url = `${providerInfo.baseUrl}/messages`;

  // Separate system message
  const systemMsg = messages.find(m => m.role === 'system');
  const chatMessages = messages.filter(m => m.role !== 'system');

  const headers = {
    'x-api-key': config.apiKey,
    'anthropic-version': '2023-06-01',
    'Content-Type': 'application/json',
    'anthropic-dangerous-direct-browser-access': 'true',
  };

  const body = {
    model: config.modelId,
    max_tokens: 1024,
    system: typeof systemMsg?.content === 'string' ? systemMsg.content : SYSTEM_PROMPT,
    messages: chatMessages.map(m => ({
      role: m.role,
      content: m.content,
    })),
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || 
      `API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  const content = data.content?.[0]?.text || '';
  
  if (!content) {
    throw new Error('Empty response from AI model');
  }

  return { success: true, content };
}

// Google Gemini API
async function callGoogle(
  config: AIConfig,
  messages: ChatMessage[]
): Promise<AIResponse> {
  const providerInfo = PROVIDER_INFO.google;
  const url = `${providerInfo.baseUrl}/models/${config.modelId}:generateContent?key=${config.apiKey}`;

  // Convert messages to Gemini format
  const contents = messages
    .filter(m => m.role !== 'system')
    .map(m => {
      const role = m.role === 'assistant' ? 'model' : 'user';
      
      if (typeof m.content === 'string') {
        return {
          role,
          parts: [{ text: m.content }],
        };
      }
      
      // Handle multimodal content
      const parts = m.content.map(part => {
        if (part.type === 'text') {
          return { text: part.text };
        }
        if (part.type === 'image_url' && part.image_url) {
          // Extract base64 data from data URL
          const match = part.image_url.url.match(/^data:(.*);base64,(.*)$/);
          if (match) {
            return {
              inline_data: {
                mime_type: match[1],
                data: match[2],
              },
            };
          }
        }
        return { text: '' };
      });
      
      return { role, parts };
    });

  // Add system instruction
  const systemMsg = messages.find(m => m.role === 'system');

  const body = {
    contents,
    systemInstruction: systemMsg ? {
      parts: [{ text: typeof systemMsg.content === 'string' ? systemMsg.content : SYSTEM_PROMPT }]
    } : undefined,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || 
      `API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  if (!content) {
    throw new Error('Empty response from AI model');
  }

  return { success: true, content };
}

// Helper: Convert image data URL to message content parts
export function createImageMessage(text: string, imageDataUrl: string): ContentPart[] {
  return [
    { type: 'text', text },
    { type: 'image_url', image_url: { url: imageDataUrl } },
  ];
}

// Test connection to verify API key works
export async function testConnection(config: AIConfig): Promise<AIResponse> {
  const testMessages: ChatMessage[] = [
    { role: 'user', content: 'Say "Connection successful! ✅" in exactly those words.' },
  ];
  
  try {
    const response = await callAI(config, testMessages);
    if (response.success) {
      return { success: true, content: 'Connection successful! ✅ Your API key is working.' };
    }
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Connection failed';
    return { success: false, content: '', error: message };
  }
}
