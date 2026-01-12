
export type VideoStyle = 'cinematic' | 'realistic' | 'anime' | '3d-render' | 'cyberpunk' | 'surreal' | 'vintage';

export interface PromptConfig {
  subject: string;
  action: string;
  setting: string;
  style: VideoStyle;
  mood: string;
  lighting: string;
  cameraAngle: string;
  cameraMovement: string;
  resolution: string;
  negativePrompt: string;
}

export interface GeneratedPrompt {
  id: string;
  timestamp: number;
  config: PromptConfig;
  fullPrompt: string;
  refinedPrompt?: string;
}
