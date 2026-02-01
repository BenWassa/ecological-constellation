# Ecological Constellation

Ecological Constellation is a personality mapping system that translates Big Five trait patterns into a ranked constellation of animal-based ecological strategies.

Rather than assigning a single personality type or “spirit animal,” the system produces a Top 3 constellation that reflects how an individual tends to navigate social energy, cooperation, planning, exploration, and threat sensitivity across contexts.

Animals are used as symbolic representations of adaptive strategies, not fixed identities or moral categories.

---

## Conceptual Foundation

This project is grounded in two principles:

1. Personality traits are continuous, not categorical
2. Animals represent ecological solutions, not personalities

The system is based on the Big Five model and translates each trait into a biologically interpretable axis:

| Big Five Trait    | Ecological Interpretation                    |
| ----------------- | -------------------------------------------- |
| Openness          | Exploratory adaptation and niche flexibility |
| Conscientiousness | Future investment and delay tolerance        |
| Extraversion      | Social signaling density and energy          |
| Agreeableness     | Cooperation and conflict resolution          |
| Neuroticism       | Threat sensitivity and vigilance             |

Outputs are interpretive and contextual. They describe tendencies, not destiny.

---

## How the System Works

### 1. Trait Input

Users input Big Five traits on a 0–120 scale using sliders.

Values are displayed numerically for clarity and treated as continuous inputs.

---

### 2. Animal Profiles

Each animal is defined as an ecological strategy with trait targets, strengths, and limitations.

Animals are stored in an extensible data structure and can be added or modified without changing core logic.

Example trait profile:

```ts
traits: {
  O: 108,
  C: 84,
  E: 50,
  A: 50,
  N: 72
}
```

---

### 3. Matching Algorithm

Trait matching uses Euclidean distance between the user trait vector and each animal trait vector.

Animals are ranked by closest distance (lower is a better match).

Only the Top 3 matches are returned.

---

### 4. Output

Results are presented as a constellation:

- Ranked Top 3 animals
- Each with a short ecological description
- Effective strengths
- Potential limitations
- A dynamic explanation of alignment

Language emphasizes strategies and contexts rather than identity claims.

---

## Design Principles

- No single personality type
- No gamification
- No moral framing
- No diagnostic or therapeutic claims
- No mystical or horoscope language

The system is designed to feel reflective, grounded, and intellectually honest.

---

## Tech Stack

- React (functional components)
- Tailwind CSS
- No backend required for MVP

Core logic is isolated and easily testable.

---

## Extensibility

You can:

- Add new animals by extending the animal data array
  - Adjust trait targets centrally
  - Modify description thresholds
  - Enhance or swap visual representations

The architecture is designed for iteration and tuning.

---

## Disclaimer

Ecological Constellation is a self-reported exploratory tool.
It does not diagnose personality, predict behavior, or define identity.

Results may shift across time, context, and self-understanding.

---

## License

TBD
