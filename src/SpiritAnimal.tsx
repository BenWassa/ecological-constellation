import React, { useMemo, useState } from 'react';
import wolfImg from '../images/Wolf.png';
import elephantImg from '../images/Elephant.png';
import octopusImg from '../images/Octopus.png';
import ravenImg from '../images/Raven.png';
import beaverImg from '../images/beaver.png';
import dolphinImg from '../images/Dolphin.png';
import capybaraImg from '../images/Capybara.png';
import owlImg from '../images/Owl.png';
import antImg from '../images/Ant.png';
import tigerImg from '../images/Tiger.png';

type TraitKey = 'E' | 'A' | 'C' | 'O' | 'N';

type Animal = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  traits: Record<TraitKey, number>;
  desc: string;
  keywords: string[];
};

const animals: Animal[] = [
  {
    id: 'wolf',
    name: 'The Wolf',
    tagline: 'Coordinated Cooperation',
    image: wolfImg,
    traits: { E: 80, A: 75, C: 75, O: 50, N: 50 },
    desc: 'You thrive in structured social groups where clear communication and loyalty are paramount. Like the wolf, you balance individual capability with a deep understanding of hierarchy and cooperation. Your strategy relies on endurance and coordinated effort to achieve goals larger than yourself.',
    keywords: ['Pack Oriented', 'Resilient', 'Communicative'],
  },
  {
    id: 'elephant',
    name: 'The Elephant',
    tagline: 'Matriarchal Wisdom',
    image: elephantImg,
    traits: { E: 70, A: 85, C: 85, O: 40, N: 30 },
    desc: 'Your strategy is built on long-term memory, emotional depth, and rock-solid reliability. Like the elephant, you act as a stabilizer in your social network, protecting others and maintaining traditions. You are not easily rattled, preferring a calm, deliberate path through life.',
    keywords: ['Protective', 'Stable', 'Empathetic'],
  },
  {
    id: 'octopus',
    name: 'The Octopus',
    tagline: 'Solitary Intelligence',
    image: octopusImg,
    traits: { E: 20, A: 30, C: 70, O: 90, N: 60 },
    desc: 'Independent, resourceful, and highly adaptive. You do not need a crowd to function; in fact, you perform best when left to your own devices to solve complex problems. Like the octopus, you rely on camouflage, tool use, and rapid adaptation rather than brute force or social signaling.',
    keywords: ['Innovative', 'Independent', 'Problem Solver'],
  },
  {
    id: 'raven',
    name: 'The Raven',
    tagline: 'Analytical Opportunist',
    image: ravenImg,
    traits: { E: 60, A: 40, C: 60, O: 95, N: 50 },
    desc: 'Curiosity drives your world. You are a puzzle-solver who watches, learns, and exploits new opportunities. Like the raven, you are playful yet calculating, able to use abstract thinking to navigate complex environments. You are social, but on your own terms.',
    keywords: ['Curious', 'Strategic', 'Playful'],
  },
  {
    id: 'beaver',
    name: 'The Beaver',
    tagline: 'Ecosystem Engineer',
    image: beaverImg,
    traits: { E: 30, A: 60, C: 95, O: 30, N: 40 },
    desc: 'You are defined by your work and what you build. Industrious and family-oriented, you focus on creating a secure, stable environment. Like the beaver, you have the patience to tackle massive projects step-by-step, reshaping your surroundings to fit your needs.',
    keywords: ['Industrious', 'Home-Builder', 'Diligent'],
  },
  {
    id: 'dolphin',
    name: 'The Dolphin',
    tagline: 'Social Innovation',
    image: dolphinImg,
    traits: { E: 90, A: 80, C: 40, O: 80, N: 60 },
    desc: 'High energy, high social connectivity, and a love for novelty. You use social bonds not just for safety, but for creative play and exploration. Like the dolphin, you are communicative and emotionally attuned, though you may struggle with rigid routines.',
    keywords: ['Sociable', 'Creative', 'Energetic'],
  },
  {
    id: 'capybara',
    name: 'The Capybara',
    tagline: 'Universal Tolerance',
    image: capybaraImg,
    traits: { E: 60, A: 95, C: 30, O: 30, N: 15 },
    desc: 'The ultimate peacekeeper. Your strategy is radical chill. You diffuse tension simply by being present. Like the capybara, you are comfortable in almost any group, demanding little and offering a calming, non-judgmental presence that draws others to you.',
    keywords: ['Calm', 'Accepting', 'Peaceful'],
  },
  {
    id: 'owl',
    name: 'The Owl',
    tagline: 'Silent Observer',
    image: owlImg,
    traits: { E: 20, A: 50, C: 60, O: 60, N: 30 },
    desc: 'You prefer to watch from the periphery before acting. Your strategy is efficiency—why waste energy on noise? Like the owl, you strike with precision when the moment is right, valuing silence, solitude, and acute awareness over social climbing.',
    keywords: ['Observant', 'Precise', 'Efficient'],
  },
  {
    id: 'ant',
    name: 'The Ant',
    tagline: 'Collective Duty',
    image: antImg,
    traits: { E: 90, A: 90, C: 90, O: 10, N: 40 },
    desc: 'Selfless, tireless, and hyper-cooperative. You find purpose in serving the greater good of your community. Like the ant, you are never idle, and you understand that the success of the group is the only success that matters. You excel in systems and logistics.',
    keywords: ['Dutiful', 'Selfless', 'Organized'],
  },
  {
    id: 'tiger',
    name: 'The Tiger',
    tagline: 'Solitary Power',
    image: tigerImg,
    traits: { E: 40, A: 20, C: 80, O: 70, N: 40 },
    desc: 'You are a specialist who controls your own territory. You do not rely on others for your success. Like the tiger, you are fiercely independent, disciplined, and capable of handling high-stakes situations alone. You respect strength and boundaries.',
    keywords: ['Independent', 'Powerful', 'Territorial'],
  },
];

const descriptions: Record<TraitKey, string[]> = {
  E: ['Solitary, Reserved', 'Selective, Quiet', 'Balanced Socially', 'Outgoing, Talkative', 'High Density Signaling'],
  A: ['Competitive, Skeptical', 'Direct, Guarded', 'Negotiator', 'Cooperative, Warm', 'Selfless, Trusting'],
  C: ['Spontaneous, Improvising', 'Flexible, Casual', 'Organized', 'Diligent, Focused', 'Rigidly Disciplined'],
  O: ['Pragmatic, Routine', 'Traditional', 'Balanced', 'Curious, Creative', 'Abstract, Experimental'],
  N: ['Unshakeable, Calm', 'Resilient', 'Responsive', 'Alert, Cautious', 'Hyper-Vigilant'],
};

const traitNames: Record<TraitKey, string> = {
  E: 'Social Energy (Extraversion)',
  A: 'Cooperation Strategy (Agreeableness)',
  C: 'Investment Focus (Conscientiousness)',
  O: 'Adaptability (Openness)',
  N: 'Threat Sensitivity (Neuroticism)',
};

const traitRanges: Record<TraitKey, [string, string]> = {
  E: ['Solitary / Reserved', 'High Density / Signaling'],
  A: ['Competitive / Direct', 'Harmonizing / Diplomatic'],
  C: ['Spontaneous / Flexible', 'Planned / Disciplined'],
  O: ['Routine / Pragmatic', 'Novelty / Abstract'],
  N: ['Resilient / Stable', 'Reactive / Alert'],
};

const Icon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

type SliderProps = {
  trait: TraitKey;
  value: number;
  onChange: (trait: TraitKey, value: number) => void;
  desc: string;
};

const Slider = ({ trait, value, onChange, desc }: SliderProps) => (
  <div className="trait-group group mb-12">
    <div className="flex justify-between mb-4 items-end">
      <div>
        <h3 className="text-lg font-medium text-slate-200">{traitNames[trait]}</h3>
        <p className="text-sm text-slate-500 min-h-[1.25rem] transition-colors duration-300 group-hover:text-indigo-300">
          {desc}
        </p>
      </div>
      <span className="text-2xl serif text-indigo-200 w-12 text-right">{value}</span>
    </div>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(trait, Number(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer slider-thumb focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
    />
    <div className="flex justify-between text-xs text-slate-600 mt-3 uppercase tracking-wider font-medium">
      <span>{traitRanges[trait][0]}</span>
      <span>{traitRanges[trait][1]}</span>
    </div>
  </div>
);

const getDesc = (trait: TraitKey, val: number) => {
  let idx = 0;
  if (val >= 80) idx = 4;
  else if (val >= 60) idx = 3;
  else if (val >= 40) idx = 2;
  else if (val >= 20) idx = 1;
  return descriptions[trait][idx];
};

const calculateResults = (traits: Record<TraitKey, number>) => {
  const scored = animals.map((animal) => {
    let diffSq = 0;
    (Object.keys(traits) as TraitKey[]).forEach((key) => {
      diffSq += Math.pow(animal.traits[key] - traits[key], 2);
    });
    return { ...animal, score: Math.sqrt(diffSq) };
  });

  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, 3);
};

export default function AnimalConstellationApp() {
  const [view, setView] = useState<'intro' | 'assessment' | 'processing' | 'results'>('intro');
  const [traits, setTraits] = useState<Record<TraitKey, number>>({
    E: 50,
    A: 50,
    C: 50,
    O: 50,
    N: 50,
  });
  const [results, setResults] = useState<(Animal & { score: number })[]>([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleTraitChange = (trait: TraitKey, value: number) => {
    setTraits((prev) => ({ ...prev, [trait]: value }));
  };

  const handleCalculate = () => {
    setView('processing');
    window.setTimeout(() => {
      setResults(calculateResults(traits));
      setView('results');
    }, 900);
  };

  const primaryResult = results[0];
  const secondaryResults = useMemo(() => results.slice(1), [results]);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[520px] h-[520px] bg-slate-800/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '1s' }}
        />
      </div>

      <nav className="relative z-10 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setView('intro')}
        >
          <Icon name="hub" className="text-indigo-200" />
          <span className="serif text-xl tracking-wider text-slate-100">ARCHETYPE MAP</span>
        </button>
        <div className="flex gap-6 items-center">
          <button
            className="text-sm text-slate-400 hover:text-white transition-colors"
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
            <p className="text-lg text-slate-400 mb-12 font-light leading-relaxed">
              Beyond simple labels. This system translates your Big Five personality traits into a weighted constellation of
              ecological strategies. Are you a pack-oriented coordinator, a solitary specialist, or an adaptable generalist?
            </p>
            <button
              onClick={() => setView('assessment')}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-200 bg-indigo-900/50 border border-indigo-500/30 rounded-full hover:bg-indigo-800/50 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              <span className="mr-2">Begin Mapping</span>
              <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {view === 'assessment' && (
          <div className="w-full animate-fade-in">
            <div className="w-full flex justify-between items-end mb-12 border-b border-slate-800 pb-4">
              <div>
                <h2 className="serif text-3xl text-white">Trait Input</h2>
                <p className="text-slate-500 text-sm mt-1">Adjust sliders to match your tendencies.</p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs uppercase tracking-widest text-slate-500 block mb-1">Methodology</span>
                <span className="text-sm text-indigo-300">Big Five Model</span>
              </div>
            </div>
            <div className="grid gap-4 md:gap-8">
              {(Object.keys(traits) as TraitKey[]).map((trait) => (
                <Slider
                  key={trait}
                  trait={trait}
                  value={traits[trait]}
                  onChange={handleTraitChange}
                  desc={getDesc(trait, traits[trait])}
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

        {view === 'processing' && (
          <div className="flex flex-col items-center justify-center h-64 w-full">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin" />
              <div
                className="absolute inset-2 border-r-2 border-slate-600 rounded-full animate-spin"
                style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="hub" className="text-indigo-300 text-3xl" />
              </div>
            </div>
            <p className="mt-8 text-slate-400 serif text-xl animate-pulse">Mapping ecological strategies...</p>
          </div>
        )}

        {view === 'results' && results.length > 0 && (
          <div className="w-full animate-slide-up pb-20">
            <div className="text-center mb-12">
              <span className="text-indigo-300 text-sm tracking-[0.2em] uppercase mb-2 block">Your Archetype Map</span>
              <h2 className="serif text-4xl text-white">Ecological Constellation</h2>
            </div>

            {primaryResult && (
              <div className="glass-panel p-1 rounded-2xl mb-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-slate-400 to-indigo-500 opacity-70" />
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-slate-900/50 relative min-h-[400px]">
                    <img
                      src={primaryResult.image}
                      alt={primaryResult.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-xs text-indigo-200 border border-indigo-500/30 backdrop-blur-sm">
                      Primary Anchor
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="serif text-5xl text-white mb-2">{primaryResult.name}</h3>
                    <p className="text-indigo-200 italic text-lg mb-6 serif">{primaryResult.tagline}</p>
                    <div className="h-px w-16 bg-slate-700 mb-6" />
                    <p className="text-slate-300 leading-relaxed mb-6">{primaryResult.desc}</p>
                    <div className="space-y-3">
                      <h4 className="text-sm text-slate-500 uppercase tracking-widest mb-3">Key Strategic Traits</h4>
                      <div className="flex flex-wrap gap-2">
                        {primaryResult.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="px-3 py-1 bg-indigo-900/40 border border-indigo-500/30 rounded text-xs text-indigo-200"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                      <div className="text-xs text-indigo-300 uppercase tracking-wider mb-1">
                        {idx === 0 ? 'Secondary Influence' : 'Tertiary Influence'}
                      </div>
                      <h3 className="serif text-2xl text-white">{animal.name}</h3>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{animal.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setView('assessment')}
                className="px-6 py-3 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-full transition-all"
              >
                Refine Traits
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-full transition-all flex items-center gap-2"
              >
                <Icon name="print" /> Save Map
              </button>
            </div>
          </div>
        )}
      </main>

      {isAboutOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
              onClick={() => setIsAboutOpen(false)}
            >
              <Icon name="close" />
            </button>
            <div className="p-8">
              <h2 className="serif text-3xl text-white mb-2">The Science Behind the Map</h2>
              <p className="text-indigo-300 text-sm mb-6 uppercase tracking-wider">Ecological Strategy vs. Personality</p>
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p>
                  This system uses the <strong className="text-white">Big Five</strong> personality model—the gold standard in
                  modern psychology—and maps it to biological "ecological strategies."
                </p>
                <p>
                  In nature, traits are not "good" or "bad"; they are trade-offs. A <em className="italic">Wolf's</em> high
                  agreeableness is a survival mechanism for pack cohesion. An <em className="italic">Octopus's</em> low extraversion
                  is a necessity for a solitary ambush predator.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  {[
                    ['Extraversion', 'Social Signaling Density & Reward Seeking'],
                    ['Agreeableness', 'Conflict Resolution & Cooperation'],
                    ['Conscientiousness', 'Future Investment & Delay Tolerance'],
                    ['Openness', 'Exploratory Adaptation & Plasticity'],
                    ['Neuroticism', 'Threat Sensitivity & Vigilance'],
                  ].map(([title, desc]) => (
                    <div key={title} className="bg-slate-800/50 p-4 rounded-lg">
                      <strong className="text-indigo-300 block mb-1">{title}</strong>
                      <span className="text-sm">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
