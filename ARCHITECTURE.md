# Architecture

This project is a single-page React app built with Vite and Tailwind CSS. The codebase is organized to separate data, domain logic, UI components, and feature wiring.

## Layout

- `src/features/constellation/`
  - Primary feature container (`ConstellationApp.tsx`) that orchestrates views and state.
- `src/data/`
  - Static data and configuration (animals, trait labels, ordering).
- `src/lib/`
  - Domain helpers and scoring logic.
- `src/types/`
  - Shared TypeScript types for traits and animals.
- `src/components/`
  - Reusable UI pieces and layout helpers.
- `src/assets/`
  - Static assets such as animal images.

## Data flow

1. User input updates local trait state in `ConstellationApp`.
2. Trait state is passed to the scoring function in `src/lib/scoring.ts`.
3. Top results are rendered by `ResultsPanel`.

## Conventions

- Trait values use a 0–120 range.
- The app is intentionally client-only (no backend).
- View state is internal (no routing).
