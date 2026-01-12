
import React, { useState, useCallback } from 'react';
import { PromptConfig, GeneratedPrompt } from './types';
import { generateVideoPrompt, refinePrompt } from './services/geminiService';
import PromptForm from './components/PromptForm';
import PromptResult from './components/PromptResult';

const App: React.FC = () => {
  const [config, setConfig] = useState<PromptConfig>({
    subject: '',
    action: '',
    setting: '',
    style: 'cinematic',
    mood: '',
    lighting: '',
    cameraAngle: '',
    cameraMovement: '',
    resolution: '',
    negativePrompt: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [history, setHistory] = useState<GeneratedPrompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');

  const handleConfigChange = (updates: Partial<PromptConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleGenerate = async () => {
    if (!config.subject) return;

    setIsLoading(true);
    try {
      const prompt = await generateVideoPrompt(config);
      setCurrentPrompt(prompt);
      
      const newEntry: GeneratedPrompt = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        config: { ...config },
        fullPrompt: prompt,
      };
      
      setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    } catch (error) {
      alert("Something went wrong while generating your prompt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!currentPrompt) return;
    setIsRefining(true);
    try {
      const refined = await refinePrompt(currentPrompt);
      setCurrentPrompt(refined);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="py-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-500/5 blur-[120px] -z-10 rounded-full"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
          Visionary<span className="gradient-text">Prompt</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto px-6">
          Craft museum-quality cinematic prompts for high-end AI video models. 
          Bridge the gap between vision and reality.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar / Settings */}
        <section className="lg:col-span-5 xl:col-span-4">
          <div className="glass-effect rounded-3xl p-8 sticky top-8 border-white/5 shadow-2xl">
            <h2 className="text-xl font-bold mb-8 flex items-center text-indigo-400">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Director's Board
            </h2>
            <PromptForm 
              config={config} 
              onChange={handleConfigChange} 
              onSubmit={handleGenerate} 
              isLoading={isLoading} 
            />
          </div>
        </section>

        {/* Main Result Area */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-12">
          {currentPrompt ? (
            <PromptResult 
              prompt={currentPrompt} 
              onRefine={handleRefine} 
              isRefining={isRefining}
            />
          ) : (
            <div className="h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500 p-12 text-center group transition-colors hover:border-indigo-500/20">
              <div className="p-4 bg-slate-800/30 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-300 mb-2">Ready for Action</h3>
              <p className="max-w-sm">Enter your concept on the left to generate a professional cinematic prompt.</p>
            </div>
          )}

          {/* History / Recent Prompts */}
          {history.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center text-slate-300">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Creations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => {
                      setCurrentPrompt(entry.fullPrompt);
                      setConfig(entry.config);
                    }}
                    className="text-left glass-effect p-4 rounded-xl border border-white/5 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{entry.config.style}</span>
                      <span className="text-[10px] text-slate-500">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-slate-300 font-semibold truncate mb-1">{entry.config.subject}</p>
                    <p className="text-xs text-slate-500 line-clamp-2">{entry.fullPrompt}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-20 py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; 2024 VisionaryPrompt AI. Optimized for Sora, Runway, and Kling.</p>
      </footer>
    </div>
  );
};

export default App;
