import { useMemo } from 'react';

import { Icon } from '../Icon';
import type { ScoredAnimal } from '../../lib/scoring';

type ResultsPanelProps = {
  results: ScoredAnimal[];
  testId: string;
};

export const ResultsPanel = ({ results, testId }: ResultsPanelProps) => {
  const primaryResult = results[0];
  const secondaryResults = useMemo(() => results.slice(1), [results]);

  if (!primaryResult) {
    return null;
  }

  return (
    <div className="w-full animate-slide-up pb-20">
      <div className="text-center mb-12">
        <span className="text-indigo-200 text-sm tracking-[0.2em] uppercase mb-2 block">
          Your Archetype Map
        </span>
        <h2 className="serif text-4xl text-white">Ecological Constellation</h2>
        {testId.trim().length > 0 && (
          <div className="mt-4 inline-flex flex-col items-center gap-1">
            <span className="text-xs uppercase tracking-widest text-slate-400">
              Associated Test ID
            </span>
            <span className="text-sm text-indigo-100">{testId}</span>
            <span className="text-[11px] text-slate-500">
              User-supplied reference
            </span>
          </div>
        )}
      </div>

      <div className="glass-panel p-1 rounded-2xl mb-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-slate-400 to-indigo-500 opacity-70" />
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-slate-900/50 relative min-h-[400px]">
            <img
              src={primaryResult.image}
              alt={primaryResult.name}
              className="result-image absolute inset-0 w-full h-full object-cover opacity-95"
            />
            <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-xs text-indigo-200 border border-indigo-500/30 backdrop-blur-sm">
              Primary Anchor
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h3 className="serif text-5xl text-white mb-2">
              {primaryResult.name}
            </h3>
            <p className="text-indigo-100 italic text-lg mb-6 serif">
              {primaryResult.tagline}
            </p>
            <div className="h-px w-16 bg-slate-700 mb-6" />
            <p className="text-slate-200 leading-relaxed mb-6">
              {primaryResult.desc}
            </p>
            <div className="space-y-3">
              <h4 className="text-sm text-slate-300 uppercase tracking-widest mb-3">
                Key Strategic Traits
              </h4>
              <div className="flex flex-wrap gap-2">
                {primaryResult.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-indigo-900/40 border border-indigo-500/30 rounded text-xs text-indigo-100"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {secondaryResults.map((animal, idx) => (
          <div
            key={animal.id}
            className="glass-panel rounded-xl overflow-hidden p-6 flex flex-col hover:bg-slate-800/50 transition-colors animal-card-hover cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-16 h-16 rounded-full object-cover border border-slate-600 bg-slate-900 group-hover:border-indigo-400 transition-colors"
              />
              <div>
                <div className="text-xs text-indigo-200 uppercase tracking-wider mb-1">
                  {idx === 0 ? 'Secondary Influence' : 'Tertiary Influence'}
                </div>
                <h3 className="serif text-2xl text-white">{animal.name}</h3>
              </div>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              {animal.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 text-sm text-slate-200 hover:text-white border border-slate-600 hover:border-slate-400 rounded-full transition-all flex items-center gap-2"
        >
          <Icon name="print" /> Save Map
        </button>
      </div>
    </div>
  );
};
