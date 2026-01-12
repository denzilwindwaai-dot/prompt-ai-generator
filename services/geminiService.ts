
import { GoogleGenAI, Type } from "@google/genai";
import { PromptConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateVideoPrompt = async (config: PromptConfig): Promise<string> => {
  const prompt = `
    Act as a World-Class AI Video Prompt Engineer.
    Transform the following user concept into a highly detailed, professional, and cinematic video prompt 
    optimized for models like Sora, Runway Gen-3, Kling, and Luma Dream Machine.

    User Concept:
    - Subject: ${config.subject}
    - Action: ${config.action}
    - Setting: ${config.setting}
    - Style: ${config.style}
    - Mood: ${config.mood}
    - Lighting: ${config.lighting}
    - Camera Angle: ${config.cameraAngle}
    - Camera Movement: ${config.cameraMovement}
    - Resolution/Quality: ${config.resolution}
    
    Negative constraints (do not include): ${config.negativePrompt}

    Requirements for the output:
    1. Start with a strong subject-action-setting foundation.
    2. Incorporate specific technical cinematic terms (e.g., bokeh, anamorphic lens flares, ray tracing, subsurface scattering).
    3. Describe the motion dynamics clearly (e.g., fluid movement, slow-motion 120fps feel).
    4. Ensure the lighting is atmospheric and detailed.
    5. The final prompt should be a single cohesive paragraph, followed by a list of technical tags.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    return response.text || "Failed to generate prompt.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with AI service.");
  }
};

export const refinePrompt = async (currentPrompt: string): Promise<string> => {
  const prompt = `
    Take the following AI video prompt and make it even more detailed, professional, and visually stunning. 
    Add more sensory details, improve the cinematic language, and refine the motion descriptions.
    
    Current Prompt:
    ${currentPrompt}
    
    Return ONLY the refined prompt text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7
      }
    });

    return response.text || currentPrompt;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return currentPrompt;
  }
};
