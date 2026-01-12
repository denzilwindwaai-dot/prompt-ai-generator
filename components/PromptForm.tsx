
import React from 'react';
import { PromptConfig, VideoStyle } from '../types';

interface PromptFormProps {
  config: PromptConfig;
  onChange: (updates: Partial<PromptConfig>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const styles: { label: string; value: VideoStyle }[] = [
  { label: 'Cinematic', value: 'cinematic' },
  { label: 'Ultra Realistic', value: 'realistic' },
  { label: 'Anime / 2D', value: 'anime' },
  { label: '3D Render (Unreal 5)', value: '3d-render' },
  { label: 'Cyberpunk', value: 'cyberpunk' },
  { label: 'Surreal', value: 'surreal' },
  { label: 'Vintage / Film', value: 'vintage' },
];

const PromptForm: React.FC<PromptFormProps> = ({ config, onChange, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Concept */}
        <div className="space-y-4 md:col-span-2">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Subject</label>
          <input
            type="text"
            name="subject"
            value={config.subject}
            onChange={handleChange}
            placeholder="e.g., A futuristic samurai, a baby dragon, a bustling nebula..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Action</label>
          <input
            type="text"
            name="action"
            value={config.action}
            onChange={handleChange}
            placeholder="e.g., running through rain, casting a spell, orbiting a star..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Setting</label>
          <input
            type="text"
            name="setting"
            value={config.setting}
            onChange={handleChange}
            placeholder="e.g., Neo-Tokyo streets, mystical forest, deep space station..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Visual Styles */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Art Style</label>
          <select
            name="style"
            value={config.style}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {styles.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Mood / Atmosphere</label>
          <input
            type="text"
            name="mood"
            value={config.mood}
            onChange={handleChange}
            placeholder="e.g., Ethereal, dark, melancholic, epic, vibrant..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Camera Controls */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Lighting</label>
          <input
            type="text"
            name="lighting"
            value={config.lighting}
            onChange={handleChange}
            placeholder="e.g., Golden hour, cinematic backlighting, neon glow..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Camera Angle</label>
          <input
            type="text"
            name="cameraAngle"
            value={config.cameraAngle}
            onChange={handleChange}
            placeholder="e.g., Low angle, extreme close-up, bird's eye view..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Camera Movement</label>
          <input
            type="text"
            name="cameraMovement"
            value={config.cameraMovement}
            onChange={handleChange}
            placeholder="e.g., Slow tracking shot, drone swoop, dolly zoom..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Output Quality</label>
          <input
            type="text"
            name="resolution"
            value={config.resolution}
            onChange={handleChange}
            placeholder="e.g., 8k resolution, photorealistic, Unreal Engine 5 render..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="space-y-4 md:col-span-2">
          <label className="block text-sm font-semibold text-indigo-300 uppercase tracking-wider">Negative Prompt (Optional)</label>
          <textarea
            name="negativePrompt"
            value={config.negativePrompt}
            onChange={handleChange}
            rows={2}
            placeholder="Avoid text, blurry, low resolution, distorted faces..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || !config.subject}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 ${
          isLoading || !config.subject
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Engineering Prompt...</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Generate Professional Prompt</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PromptForm;
