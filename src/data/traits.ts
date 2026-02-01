import type { TraitKey } from '../types/traits';

export const traitDescriptions: Record<TraitKey, string[]> = {
  E: [
    'Solitary, Reserved',
    'Selective, Quiet',
    'Balanced Socially',
    'Outgoing, Talkative',
    'High Density Signaling',
  ],
  A: [
    'Competitive, Skeptical',
    'Direct, Guarded',
    'Negotiator',
    'Cooperative, Warm',
    'Selfless, Trusting',
  ],
  C: [
    'Spontaneous, Improvising',
    'Flexible, Casual',
    'Organized',
    'Diligent, Focused',
    'Rigidly Disciplined',
  ],
  O: [
    'Pragmatic, Routine',
    'Traditional',
    'Balanced',
    'Curious, Creative',
    'Abstract, Experimental',
  ],
  N: [
    'Unshakeable, Calm',
    'Resilient',
    'Responsive',
    'Alert, Cautious',
    'Hyper-Vigilant',
  ],
};

export const traitNames: Record<TraitKey, string> = {
  E: 'Social Energy (Extraversion)',
  A: 'Cooperation Strategy (Agreeableness)',
  C: 'Investment Focus (Conscientiousness)',
  O: 'Adaptability (Openness)',
  N: 'Threat Sensitivity (Neuroticism)',
};

export const traitRanges: Record<TraitKey, [string, string]> = {
  E: ['Solitary / Reserved', 'High Density / Signaling'],
  A: ['Competitive / Direct', 'Harmonizing / Diplomatic'],
  C: ['Spontaneous / Flexible', 'Planned / Disciplined'],
  O: ['Routine / Pragmatic', 'Novelty / Abstract'],
  N: ['Resilient / Stable', 'Reactive / Alert'],
};

export const sliderTraitOrder: TraitKey[] = ['N', 'E', 'O', 'A', 'C'];

export const manualEntryTraitOrder: [TraitKey, string][] = [
  ['N', 'Neuroticism'],
  ['E', 'Extraversion'],
  ['O', 'Openness'],
  ['A', 'Agreeableness'],
  ['C', 'Conscientiousness'],
];
