import React, { useState, useMemo } from 'react';
import { ChevronRight, RotateCcw, Info, Activity, Shield, Zap, Brain, Heart } from 'lucide-react';

// --- CONFIGURATION & DATA MODELS -------------------------------------------

// 1. Trait Definitions
const TRAITS = {
  O: { id: 'O', label: 'Openness', desc: 'Exploratory adaptation and novelty seeking', weight: 1.2 },
  C: { id: 'C', label: 'Conscientiousness', desc: 'Future investment and delay tolerance', weight: 1.2 },
  E: { id: 'E', label: 'Extraversion', desc: 'Social signaling density and energy', weight: 1.0 },
  A: { id: 'A', label: 'Agreeableness', desc: 'Cooperation and conflict resolution', weight: 1.0 },
  N: { id: 'N', label: 'Neuroticism', desc: 'Threat sensitivity and vigilance', weight: 0.8 },
};

// 2. Band Definitions (Logic Driver)
const BANDS = {
  LOW: { label: 'Low', min: 0, max: 35, val: 0 },
  MODERATE: { label: 'Moderate', min: 36, max: 65, val: 1 },
  HIGH: { label: 'High', min: 66, max: 85, val: 2 },
  VERY_HIGH: { label: 'Very High', min: 86, max: 100, val: 3 },
};

// Helper to determine band from numeric input
const getBand = (value) => {
  if (value <= BANDS.LOW.max) return BANDS.LOW;
  if (value <= BANDS.MODERATE.max) return BANDS.MODERATE;
  if (value <= BANDS.HIGH.max) return BANDS.HIGH;
  return BANDS.VERY_HIGH;
};

// Helper to get numeric value from string trait in Animal Data
const getBandFromStr = (str) => {
  const map = { 'low': 0, 'moderate': 1, 'high': 2, 'very_high': 3 };
  return map[str.toLowerCase()] || 1;
};

// 3. Animal Data (Extensible JSON Schema)
const ANIMAL_DATA = [
  {
    id: 'wolf',
    name: 'Wolf',
    traits: { E: 'high', A: 'moderate', C: 'high', O: 'moderate', N: 'moderate' },
    description: 'Relies on coordinated action and hierarchical purpose.',
    strengths: ['Strategic cooperation', 'Resilient pursuit', 'Role clarity'],
    limitations: ['Territorial rigidity', 'Dependent on pack dynamics']
  },
  {
    id: 'elephant',
    name: 'Elephant',
    traits: { E: 'high', A: 'very_high', C: 'very_high', O: 'moderate', N: 'low' },
    description: 'A stabilizer that prioritizes social memory and collective wisdom.',
    strengths: ['Long-term planning', 'Deep social bonds', 'Environmental stability'],
    limitations: ['High resource requirements', 'Slow response to rapid change']
  },
  {
    id: 'octopus',
    name: 'Octopus',
    traits: { E: 'low', A: 'low', C: 'moderate', O: 'very_high', N: 'high' },
    description: 'A solitary problem-solver thriving on adaptation and stealth.',
    strengths: ['Independent innovation', 'Camouflage strategies', 'Complex abstraction'],
    limitations: ['Social isolation', 'High sensitivity to environment']
  },
  {
    id: 'dolphin',
    name: 'Dolphin',
    traits: { E: 'very_high', A: 'high', C: 'moderate', O: 'high', N: 'low' },
    description: 'Navigates through social fluidity and creative communication.',
    strengths: ['Adaptive communication', 'Creative play', 'Social energy transfer'],
    limitations: ['Distractible', 'Requires constant stimulation']
  },
  {
    id: 'owl',
    name: 'Owl',
    traits: { E: 'low', A: 'moderate', C: 'high', O: 'high', N: 'moderate' },
    description: 'An efficiency specialist focused on observation and precision.',
    strengths: ['Energy conservation', 'Strategic timing', 'Independent analysis'],
    limitations: ['Slow social integration', 'Specialist vulnerability']
  },
  {
    id: 'ant',
    name: 'Ant',
    traits: { E: 'high', A: 'high', C: 'very_high', O: 'low', N: 'moderate' },
    description: 'Driven by duty, structure, and collective efficiency.',
    strengths: ['Systematic organization', 'Selflessness', 'Operational scale'],
    limitations: ['Rigid adaptability', 'Individual agency limited']
  },
  {
    id: 'bear',
    name: 'Bear',
    traits: { E: 'low', A: 'low', C: 'high', O: 'low', N: 'low' },
    description: 'A resource-guarding strategist with high autonomy.',
    strengths: ['Self-reliance', 'Resource defense', 'Steady endurance'],
    limitations: ['Solitary nature', 'Lower social negotiation skills']
  },
  {
    id: 'crow',
    name: 'Crow',
    traits: { E: 'moderate', A: 'moderate', C: 'moderate', O: 'very_high', N: 'moderate' },
    description: 'An opportunistic generalist that excels at tool use and learning.',
    strengths: ['Rapid learning', 'Tool utilization', 'Urban adaptability'],
    limitations: ['Cautious of novelty', 'Opportunistic reputation']
  }
];

// --- CORE LOGIC MODULE -----------------------------------------------------

const calculateConstellation = (userTraits) => {
  // 1. Convert User 0-100 to Bands (0-3)
  const userBands = {};
  Object.keys(userTraits).forEach(k => {
    userBands[k] = getBand(userTraits[k]).val;
  });

  // 2. Score Animals
  const scored = ANIMAL_DATA.map(animal => {
    let rawScore = 0;
    const details = [];

    Object.keys(TRAITS).forEach(traitKey => {
      const uVal = userBands[traitKey];
      const aVal = getBandFromStr(animal.traits[traitKey]);
      const weight = TRAITS[traitKey].weight;
      
      const diff = Math.abs(uVal - aVal);
      let points = 0;

      // Algorithm Rules per Brief Section 6
      if (diff === 0) points = 3;       // Exact band match
      else if (diff === 1) points = 1;  // Adjacent band match
      else points = -2;                 // Opposite/Distant mismatch

      const weightedPoints = points * weight;
      rawScore += weightedPoints;

      if (points > 0) {
        details.push({ trait: TRAITS[traitKey].label, score: weightedPoints });
      }
    });

    // Sort contributors for the "Alignment Summary"
    details.sort((a, b) => b.score - a.score);

    return { ...animal, score: rawScore, topMatches: details.slice(0, 2) };
  });

  // 3. Rank and Return Top 3
  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
};


// --- UI COMPONENTS ---------------------------------------------------------

export default function AnimalConstellationApp() {
  const [screen, setScreen] = useState('intro'); // intro | traits | results
  const [inputs, setInputs] = useState({ O: 50, C: 50, E: 50, A: 50, N: 50 });
  const [results, setResults] = useState([]);

  const handleAnalyze = () => {
    const matches = calculateConstellation(inputs);
    setResults(matches);
    setScreen('results');
  };

  const getTraitIcon = (id) => {
    switch(id) {
      case 'O': return <Brain size={18} />;
      case 'C': return <Shield size={18} />;
      case 'E': return <Zap size={18} />;
      case 'A': return <Heart size={18} />;
      case 'N': return <Activity size={18} />;
      default: return <Activity size={18} />;
    }
  };

  // --- SCREENS ---

  const IntroScreen = () => (
    <div className="max-w-xl mx-auto text-center pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex justify-center">
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-slate-100 dark:bg-slate-100 dark:text-slate-900">
          <Activity size={32} strokeWidth={1.5} />
        </div>
      </div>
      <h1 className="text-4xl font-light text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
        Animal Constellation Map
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
        This system translates your personality traits into a ranked constellation of ecological strategies. 
        Rather than assigning a single fixed identity, we map how you navigate social energy, risk, and exploration 
        across different contexts.
      </p>
      <button 
        onClick={() => setScreen('traits')}
        className="group bg-slate-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Begin Mapping
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const TraitScreen = () => (
    <div className="max-w-2xl mx-auto pt-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-2">Trait Input</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Adjust sliders to match your typical patterns.</p>
      </div>

      <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 dark:bg-slate-900/60 dark:border-slate-800 dark:shadow-none">
        {Object.values(TRAITS).map((t) => {
          const band = getBand(inputs[t.id]);
          return (
            <div key={t.id} className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                  {getTraitIcon(t.id)}
                  {t.label}
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-3 dark:text-slate-500">
                    {band.label}
                  </span>
                  <span className="font-mono text-slate-500 dark:text-slate-400 w-8 inline-block text-right">
                    {inputs[t.id]}
                  </span>
                </div>
              </div>
              
              <input 
                type="range" min="0" max="100" 
                value={inputs[t.id]}
                onChange={(e) => setInputs({...inputs, [t.id]: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-slate-100"
              />
              
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                {t.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={handleAnalyze}
          className="w-full md:w-auto bg-slate-900 text-white px-12 py-4 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:shadow-none"
        >
          Generate Constellation
        </button>
      </div>
    </div>
  );

  const ResultsScreen = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-start mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-light text-slate-900 dark:text-slate-100 mb-2">Your Constellation</h2>
          <p className="text-slate-600 dark:text-slate-300">These strategies align with your trait bands.</p>
        </div>
        <button 
          onClick={() => setScreen('traits')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-slate-200"
        >
          <RotateCcw size={16} /> Adjust Traits
        </button>
      </div>

      <div className="grid gap-6">
        {results.map((animal, idx) => (
          <div 
            key={animal.id} 
            className={`
              relative p-8 rounded-xl border transition-all duration-300
              ${idx === 0 ? 'bg-slate-50 border-slate-200 shadow-md dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none' : 'bg-white border-slate-100 hover:border-slate-300 dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-slate-700'}
            `}
          >
            {/* Rank Badge */}
            <div className="absolute top-8 left-8 w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 font-mono text-sm dark:border-slate-700 dark:text-slate-500">
              0{idx + 1}
            </div>

            <div className="pl-16">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h3 className="text-2xl font-medium text-slate-900 dark:text-slate-100">{animal.name}</h3>
                <div className="flex gap-2">
                  {Object.entries(animal.traits).map(([k, v]) => (
                    <span key={k} className="text-[10px] uppercase tracking-widest bg-slate-200 text-slate-600 px-2 py-1 rounded-sm dark:bg-slate-800 dark:text-slate-300">
                      {k}:{v.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-200 text-lg mb-6 leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-4">
                {animal.description}
              </p>

              {/* Dynamic Contextual Explanation */}
              <div className="mb-6 text-sm text-slate-600 dark:text-slate-300 italic bg-white/50 dark:bg-slate-900/50 p-3 rounded">
                "Aligns with your 
                {animal.topMatches.map((m, i) => (
                  <span key={i} className="font-medium text-slate-800 dark:text-slate-100">
                    {i === 0 ? ' ' : ' and '} 
                    {m.trait}
                  </span>
                ))}
                {' '}tendencies."
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Effective Strengths</h4>
                  <ul className="space-y-2">
                    {animal.strengths.map(s => (
                      <li key={s} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Potential Limitations</h4>
                  <ul className="space-y-2">
                    {animal.limitations.map(l => (
                      <li key={l} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-slate-50 dark:bg-slate-900/70 p-6 rounded-lg flex gap-4 items-start text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        <Info className="shrink-0 mt-1" size={18} />
        <p>
          This constellation is non-deterministic. Animals represent ecological strategies—ways of solving problems in an environment—not fixed identities or moral categories. Your results reflect your current self-reported tendencies.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-slate-200 dark:selection:bg-slate-700">
      <main className="container mx-auto px-6 py-12">
        {screen === 'intro' && <IntroScreen />}
        {screen === 'traits' && <TraitScreen />}
        {screen === 'results' && <ResultsScreen />}
      </main>
    </div>
  );
}
