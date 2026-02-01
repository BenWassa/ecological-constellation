import { useRef, useState } from 'react';

import { animals } from '../../data/animals';
import { manualEntryTraitOrder, sliderTraitOrder } from '../../data/traits';
import { calculateResults, type ScoredAnimal } from '../../lib/scoring';
import { clampTraitValue, getTraitDescription } from '../../lib/traits';
import type { TraitKey, TraitValues } from '../../types/traits';
import { Icon } from '../../components/Icon';
import { ResultsPanel } from '../../components/results/ResultsPanel';
import { ScienceModal } from '../../components/modals/ScienceModal';
import { TraitSlider } from '../../components/traits/TraitSlider';
import { BackgroundParticles } from '../../components/layout/BackgroundParticles';

type ViewState =
  | 'intro'
  | 'assessment'
  | 'external-test-info'
  | 'manual-entry'
  | 'processing'
  | 'results';

const defaultTraits: TraitValues = {
  N: 60,
  E: 60,
  O: 60,
  A: 60,
  C: 60,
};

export default function ConstellationApp() {
  const [view, setView] = useState<ViewState>('intro');
  const [traits, setTraits] = useState<TraitValues>(defaultTraits);
  const [testId, setTestId] = useState('');
  const [results, setResults] = useState<ScoredAnimal[]>([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const valueRefs = useRef<Record<TraitKey, HTMLSpanElement | null>>({
    N: null,
    E: null,
    O: null,
    A: null,
    C: null,
  });

  const handleTraitChange = (trait: TraitKey, value: number) => {
    const nextValue = clampTraitValue(value);
    setTraits((prev) => ({ ...prev, [trait]: nextValue }));
  };

  const handleTabPress = (
    currentTrait: TraitKey,
    direction: 'forward' | 'backward'
  ) => {
    const currentIndex = sliderTraitOrder.indexOf(currentTrait);
    let nextIndex: number;

    if (direction === 'forward') {
      nextIndex = (currentIndex + 1) % sliderTraitOrder.length;
    } else {
      nextIndex =
        (currentIndex - 1 + sliderTraitOrder.length) % sliderTraitOrder.length;
    }

    const nextTrait = sliderTraitOrder[nextIndex];
    window.setTimeout(() => {
      valueRefs.current[nextTrait]?.click();
    }, 10);
  };

  const handleCalculate = () => {
    setView('processing');
    window.setTimeout(() => {
      setResults(calculateResults(traits, animals));
      setView('results');
    }, 900);
  };

  const setValueRef = (trait: TraitKey) => (node: HTMLSpanElement | null) => {
    valueRefs.current[trait] = node;
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundParticles />

      <nav className="relative z-10 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setView('intro')}
        >
          <Icon name="hub" className="text-indigo-200" />
          <span className="serif text-xl tracking-wider text-slate-100">
            ARCHETYPE MAP
          </span>
        </button>
        <div className="flex gap-6 items-center">
          <button
            className="text-sm text-slate-200 hover:text-white transition-colors"
            onClick={() => setIsAboutOpen(true)}
          >
            The Science
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 min-h-[80vh] flex flex-col items-center justify-center">
        {view === 'intro' && (
          <div className="text-center max-w-2xl animate-fade-in">
            <h1 className="serif text-5xl md:text-7xl text-white mb-6 leading-tight">
              Discover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-slate-400">
                Ecological Constellation
              </span>
            </h1>
            <p className="text-lg text-slate-200 mb-6 font-light leading-relaxed">
              This system translates your Big Five personality traits into a
              weighted constellation of ecological strategies.
            </p>
            <button
              onClick={() => setView('assessment')}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-200 bg-indigo-900/50 border border-indigo-500/30 rounded-full hover:bg-indigo-800/50 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              <span className="mr-2">Begin Mapping</span>
              <Icon
                name="arrow_forward"
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <p className="text-sm text-slate-400 mt-6">
              Want a full assessment first?{' '}
              <a
                href="https://bigfive-test.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 underline-offset-2 transition-colors"
              >
                <span className="underline">
                  Take the Big Five test
                  <Icon name="open_in_new" className="text-xs" />
                </span>
              </a>
            </p>
          </div>
        )}

        {view === 'assessment' && (
          <div className="w-full animate-fade-in">
            <div className="w-full flex justify-between items-end mb-12 border-b border-slate-800 pb-4">
              <div>
                <h2 className="serif text-3xl text-white">Trait Input</h2>
                <p className="text-slate-300 text-sm mt-1">
                  Adjust sliders to match your tendencies.
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs uppercase tracking-widest text-slate-400 block mb-1">
                  Methodology
                </span>
                <span className="text-sm text-indigo-200">Big Five Model</span>
              </div>
            </div>
            <div className="grid gap-4 md:gap-8">
              {sliderTraitOrder.map((trait) => (
                <TraitSlider
                  key={trait}
                  trait={trait}
                  value={traits[trait]}
                  desc={getTraitDescription(trait, traits[trait])}
                  onChange={handleTraitChange}
                  onTabPress={(direction) => handleTabPress(trait, direction)}
                  valueRef={setValueRef(trait)}
                />
              ))}
            </div>
            <div className="mt-8 flex justify-center pb-12">
              <button
                onClick={handleCalculate}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg serif text-white transition-all duration-300 bg-slate-800 border border-indigo-500/50 rounded-lg hover:bg-indigo-900 hover:border-indigo-400 shadow-lg hover:shadow-indigo-500/20"
              >
                <span className="mr-3">Reveal Constellation</span>
                <Icon name="auto_awesome" className="animate-pulse" />
              </button>
            </div>
          </div>
        )}

        {view === 'external-test-info' && (
          <div className="w-full max-w-2xl animate-fade-in">
            <div className="glass-panel rounded-2xl p-8 space-y-6">
              <div>
                <h2 className="serif text-3xl text-white mb-2">
                  External Big Five Test
                </h2>
                <p className="text-slate-300 text-sm">
                  You will complete a standardized assessment on another site.
                </p>
              </div>
              <div className="space-y-3 text-slate-200 leading-relaxed">
                <p>This site does not administer personality tests.</p>
                <p>You will receive numeric scores for O C E A N.</p>
                <p>Save your Test ID or results page for future use.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://bigfive-test.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center px-6 py-3 text-sm text-white bg-indigo-900/50 border border-indigo-500/30 rounded-full hover:bg-indigo-800/50 hover:border-indigo-400/50 transition-all"
                >
                  Go to Big Five Test
                  <Icon
                    name="open_in_new"
                    className="ml-2 text-indigo-200 group-hover:translate-x-0.5 transition-transform"
                  />
                </a>
                <button
                  onClick={() => {
                    setView('manual-entry');
                  }}
                  className="px-6 py-3 text-sm text-slate-200 hover:text-white border border-slate-600 hover:border-slate-400 rounded-full transition-all"
                >
                  I already have my results
                </button>
              </div>
              <button
                onClick={() => setView('intro')}
                className="text-xs text-slate-400 hover:text-slate-200 uppercase tracking-widest"
              >
                Back to home
              </button>
            </div>
          </div>
        )}

        {view === 'manual-entry' && (
          <div className="w-full animate-fade-in">
            <div className="w-full flex justify-between items-end mb-10 border-b border-slate-800 pb-4">
              <div>
                <h2 className="serif text-3xl text-white">
                  Manual Score Entry
                </h2>
                <p className="text-slate-300 text-sm mt-1">
                  Enter your Big Five scores (0–120).
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs uppercase tracking-widest text-slate-400 block mb-1">
                  Format
                </span>
                <span className="text-sm text-indigo-200">
                  N E O A C Scores
                </span>
              </div>
            </div>
            <div className="grid gap-4">
              {manualEntryTraitOrder.map(([trait, label]) => (
                <label
                  key={trait}
                  className="glass-panel rounded-xl p-5 flex items-center justify-between gap-6"
                >
                  <div>
                    <h3 className="text-lg text-white">{label}</h3>
                    <p className="text-xs text-slate-400">
                      0 (low) to 120 (high)
                    </p>
                  </div>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="120"
                    step="1"
                    value={traits[trait]}
                    onChange={(e) =>
                      handleTraitChange(trait, Number(e.target.value))
                    }
                    className="w-24 text-right bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </label>
              ))}
            </div>
            <div className="mt-8 glass-panel rounded-xl p-5">
              <label className="block text-sm text-slate-300 mb-2">
                Test ID (for your reference)
              </label>
              <input
                type="text"
                value={testId}
                onChange={(e) => setTestId(e.target.value)}
                placeholder="Optional"
                className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>
            <div className="mt-8 flex justify-center pb-12">
              <button
                onClick={handleCalculate}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg serif text-white transition-all duration-300 bg-slate-800 border border-indigo-500/50 rounded-lg hover:bg-indigo-900 hover:border-indigo-400 shadow-lg hover:shadow-indigo-500/20"
              >
                <span className="mr-3">Reveal Constellation</span>
                <Icon name="auto_awesome" className="animate-pulse" />
              </button>
            </div>
          </div>
        )}

        {view === 'processing' && (
          <div className="flex flex-col items-center justify-center h-64 w-full">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin" />
              <div
                className="absolute inset-2 border-r-2 border-slate-600 rounded-full animate-spin"
                style={{
                  animationDirection: 'reverse',
                  animationDuration: '1.5s',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="hub" className="text-indigo-300 text-3xl" />
              </div>
            </div>
            <p className="mt-8 text-slate-200 serif text-xl animate-pulse">
              Mapping ecological strategies...
            </p>
          </div>
        )}

        {view === 'results' && results.length > 0 && (
          <ResultsPanel results={results} testId={testId} />
        )}
      </main>

      <ScienceModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
