import type { Animal } from '../types/animals';
import type { TraitKey, TraitValues } from '../types/traits';

export type ScoredAnimal = Animal & { score: number };

export const calculateResults = (
  traits: TraitValues,
  allAnimals: Animal[]
): ScoredAnimal[] => {
  const scored = allAnimals.map((animal) => {
    let diffSq = 0;
    (Object.keys(traits) as TraitKey[]).forEach((key) => {
      diffSq += Math.pow(animal.traits[key] - traits[key], 2);
    });
    return { ...animal, score: Math.sqrt(diffSq) };
  });

  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, 3);
};
