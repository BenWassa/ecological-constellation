import { traitDescriptions } from '../data/traits';
import type { TraitKey } from '../types/traits';

export const TRAIT_MIN = 0;
export const TRAIT_MAX = 120;

export const clampTraitValue = (value: number) =>
  Math.min(TRAIT_MAX, Math.max(TRAIT_MIN, value));

export const getTraitDescription = (trait: TraitKey, value: number) => {
  let idx = 0;
  if (value >= 96) idx = 4;
  else if (value >= 72) idx = 3;
  else if (value >= 48) idx = 2;
  else if (value >= 24) idx = 1;
  return traitDescriptions[trait][idx];
};
