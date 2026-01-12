
import React, { useState } from 'react';

interface PromptResultProps {
  prompt: string;
  onRefine: () => void;
  isRefining: boolean;
}

const PromptResult: React.FC<PromptResultProps> = ({ prompt, onRefine, isRefining }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!prompt) return null;

  return (
    <div className="glass-effect rounded-2xl p-6 border border-indigo-500/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></span>
          Generated Visionary Prompt
        </h3>
        <div className="flex space-x-2">
           <button
            onClick={onRefine}
            disabled={isRefining}
            className="flex items-center px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium"
          >
            {isRefining ? 'Refining...' : 'Refine Further'}
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              copied ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Prompt
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
          {prompt}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs font-bold px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded uppercase tracking-tighter border border-indigo-500/30">Optimization: 100%</span>
        <span className="text-xs font-bold px-2 py-1 bg-purple-500/20 text-purple-400 rounded uppercase tracking-tighter border border-purple-500/30">Cinematics: High</span>
        <span className="text-xs font-bold px-2 py-1 bg-blue-500/20 text-blue-400 rounded uppercase tracking-tighter border border-blue-500/30">Motion: Dynamic</span>
      </div>
    </div>
  );
};

export default PromptResult;
