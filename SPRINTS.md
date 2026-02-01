# Sprints — Architecture & Best Practices

## Sprint 1 — Architecture Baseline & Repo Hygiene
Goal: Establish conventions and clean the file/folder layout.

Tasks
- Decide on source structure: `src/features`, `src/components`, `src/data`, `src/styles`, `src/assets`, `src/lib`, `src/types`
- Move `images/*` into `src/assets/animals/` or `public/assets/animals/` and update imports
- Decide what to do with `docs/` (keep as deploy artifact or move to `dist/` + add to `.gitignore`)
- Archive `OldVersion/` into `archive/` or remove if no longer needed
- Remove unused deps after confirming no hidden usage

Acceptance
- Clear top-level structure with minimal root clutter
- Assets live in one canonical location
- No unused deps

---

## Sprint 2 — Modularize Domain + UI Components
Goal: Break the monolith into composable modules.

Tasks
- Extract domain types into `src/types/traits.ts`, `src/types/animals.ts`
- Move animal definitions into `src/data/animals.ts`
- Move trait labels/ranges/desc into `src/data/traits.ts`
- Extract scoring into `src/lib/scoring.ts` and trait helpers into `src/lib/traits.ts`
- Split UI into components:
  - `src/features/constellation/` (container + view routing)
  - `src/components/traits/TraitSlider.tsx`
  - `src/components/results/ResultsPanel.tsx`
  - `src/components/modals/ScienceModal.tsx`
  - `src/components/layout/BackgroundParticles.tsx`
- Replace `document.querySelector` with refs or component state

Acceptance
- `src/SpiritAnimal.tsx` becomes a small feature container or is retired
- Domain logic is reusable and testable without UI dependencies
- UI components are isolated and easier to iterate

---

## Sprint 3 — Align Product Logic & Documentation
Goal: Ensure code and docs match, reduce cognitive drift.

Tasks
- Pick one scoring model (band-based vs Euclidean) and align the other
- Normalize trait ranges to a single canonical scale (0–100 or 0–120)
- Update README + `documentation/` to reflect actual behavior
- Add a short `ARCHITECTURE.md` describing folder structure, ownership, and data flow

Acceptance
- README and implementation describe the same scoring and input ranges
- New contributors can understand structure in <5 minutes

---

## Sprint 4 — Ergonomics & DX Cleanup
Goal: Improve developer experience without changing behavior.

Tasks
- Add TS path aliases (e.g., `@/components`) in `tsconfig` + `vite.config.ts`
- Add lint/format rules for import ordering and file organization
- Normalize file naming/casing (e.g., `beaver.png` vs `Beaver.png`)
- Consider a `src/index.ts` barrel for shared exports

Acceptance
- Consistent imports, easier refactors, clearer ownership boundaries
