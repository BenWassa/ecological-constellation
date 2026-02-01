import type { TraitKey } from './traits';

export type Animal = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  traits: Record<TraitKey, number>;
  desc: string;
  keywords: string[];
};
