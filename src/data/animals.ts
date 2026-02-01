import type { Animal } from '../types/animals';

import wolfImg from '../assets/animals/Wolf.png';
import elephantImg from '../assets/animals/Elephant.png';
import octopusImg from '../assets/animals/Octopus.png';
import ravenImg from '../assets/animals/Raven.png';
import beaverImg from '../assets/animals/beaver.png';
import dolphinImg from '../assets/animals/Dolphin.png';
import capybaraImg from '../assets/animals/Capybara.png';
import owlImg from '../assets/animals/Owl.png';
import antImg from '../assets/animals/Ant.png';
import tigerImg from '../assets/animals/Tiger.png';

export const animals: Animal[] = [
  {
    id: 'wolf',
    name: 'The Wolf',
    tagline: 'Coordinated Cooperation',
    image: wolfImg,
    traits: { E: 96, A: 90, C: 90, O: 60, N: 60 },
    desc: 'You thrive in structured social groups where clear communication and loyalty are paramount. Like the wolf, you balance individual capability with a deep understanding of hierarchy and cooperation. Your strategy relies on endurance and coordinated effort to achieve goals larger than yourself.',
    keywords: ['Pack Oriented', 'Resilient', 'Communicative'],
  },
  {
    id: 'elephant',
    name: 'The Elephant',
    tagline: 'Matriarchal Wisdom',
    image: elephantImg,
    traits: { E: 84, A: 120, C: 120, O: 55, N: 50 },
    desc: 'Your strategy is built on long-term memory, emotional depth, and rock-solid reliability. Like the elephant, you act as a stabilizer in your social network, protecting others and maintaining traditions. You are not easily rattled, preferring a calm, deliberate path through life.',
    keywords: ['Protective', 'Stable', 'Empathetic'],
  },
  {
    id: 'octopus',
    name: 'The Octopus',
    tagline: 'Solitary Intelligence',
    image: octopusImg,
    traits: { E: 50, A: 50, C: 84, O: 108, N: 72 },
    desc: 'Independent, resourceful, and highly adaptive. You do not need a crowd to function; in fact, you perform best when left to your own devices to solve complex problems. Like the octopus, you rely on camouflage, tool use, and rapid adaptation rather than brute force or social signaling.',
    keywords: ['Innovative', 'Independent', 'Problem Solver'],
  },
  {
    id: 'raven',
    name: 'The Raven',
    tagline: 'Analytical Opportunist',
    image: ravenImg,
    traits: { E: 72, A: 55, C: 72, O: 114, N: 60 },
    desc: 'Curiosity drives your world. You are a puzzle-solver who watches, learns, and exploits new opportunities. Like the raven, you are playful yet calculating, able to use abstract thinking to navigate complex environments. You are social, but on your own terms.',
    keywords: ['Curious', 'Strategic', 'Playful'],
  },
  {
    id: 'beaver',
    name: 'The Beaver',
    tagline: 'Ecosystem Engineer',
    image: beaverImg,
    traits: { E: 50, A: 72, C: 114, O: 50, N: 50 },
    desc: 'You are defined by your work and what you build. Industrious and family-oriented, you focus on creating a secure, stable environment. Like the beaver, you have the patience to tackle massive projects step-by-step, reshaping your surroundings to fit your needs.',
    keywords: ['Industrious', 'Home-Builder', 'Diligent'],
  },
  {
    id: 'dolphin',
    name: 'The Dolphin',
    tagline: 'Social Innovation',
    image: dolphinImg,
    traits: { E: 108, A: 96, C: 55, O: 96, N: 72 },
    desc: 'High energy, high social connectivity, and a love for novelty. You use social bonds not just for safety, but for creative play and exploration. Like the dolphin, you are communicative and emotionally attuned, though you may struggle with rigid routines.',
    keywords: ['Sociable', 'Creative', 'Energetic'],
  },
  {
    id: 'capybara',
    name: 'The Capybara',
    tagline: 'Universal Tolerance',
    image: capybaraImg,
    traits: { E: 72, A: 114, C: 50, O: 50, N: 50 },
    desc: 'The ultimate peacekeeper. Your strategy is radical chill. You diffuse tension simply by being present. Like the capybara, you are comfortable in almost any group, demanding little and offering a calming, non-judgmental presence that draws others to you.',
    keywords: ['Calm', 'Accepting', 'Peaceful'],
  },
  {
    id: 'owl',
    name: 'The Owl',
    tagline: 'Silent Observer',
    image: owlImg,
    traits: { E: 50, A: 60, C: 72, O: 72, N: 50 },
    desc: 'You prefer to watch from the periphery before acting. Your strategy is efficiency—why waste energy on noise? Like the owl, you strike with precision when the moment is right, valuing silence, solitude, and acute awareness over social climbing.',
    keywords: ['Observant', 'Precise', 'Efficient'],
  },
  {
    id: 'ant',
    name: 'The Ant',
    tagline: 'Collective Duty',
    image: antImg,
    traits: { E: 108, A: 108, C: 108, O: 50, N: 50 },
    desc: 'Selfless, tireless, and hyper-cooperative. You find purpose in serving the greater good of your community. Like the ant, you are never idle, and you understand that the success of the group is the only success that matters. You excel in systems and logistics.',
    keywords: ['Dutiful', 'Selfless', 'Organized'],
  },
  {
    id: 'tiger',
    name: 'The Tiger',
    tagline: 'Solitary Power',
    image: tigerImg,
    traits: { E: 50, A: 50, C: 96, O: 84, N: 50 },
    desc: 'You are a specialist who controls your own territory. You do not rely on others for your success. Like the tiger, you are fiercely independent, disciplined, and capable of handling high-stakes situations alone. You respect strength and boundaries.',
    keywords: ['Independent', 'Powerful', 'Territorial'],
  },
];
