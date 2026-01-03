Current User Flow (as implemented)

Scope
This document describes the current runtime flow and UI states implemented in `src/SpiritAnimal.tsx`.
It is a technical description of what exists now (not the intended canonical flow).

High-level state machine

- Single-page app with in-memory view state.
- View states: `intro` -> `assessment` -> `processing` -> `results`.
- Navigation is controlled by local React state, not routing.

Entry point

- App mounts `SpiritAnimal` via `src/App.tsx` and `src/main.tsx`.
- Initial state: `view = 'intro'`.

Global UI elements

- Top nav bar:
  - Logo button labeled "ARCHETYPE MAP".
  - Clicking logo sets `view = 'intro'` (no confirmation or persistence).
  - "The Science" button opens a modal overlay (`isAboutOpen = true`).
- Background:
  - Particle animation rendered by `src/components/Particles.tsx`.
  - Two animated glow blobs, purely decorative.

View: Intro (`view === 'intro'`)

- Purpose: landing/hero.
- Content:
  - Title: "Discover Your Ecological Constellation".
  - Description of Big Five translation to ecological strategies.
  - Primary CTA: "Begin Mapping".
- Action:
  - Clicking "Begin Mapping" sets `view = 'assessment'`.

View: Assessment (`view === 'assessment'`)

- Purpose: slider-based trait input.
- UI structure:
  - Header: "Trait Input" with subtext.
  - Sliders for 5 traits: E, A, C, O, N.
  - Each slider shows:
    - Trait name and description.
    - Current numeric value (0-100).
    - Range labels (low/high anchor text).
- Defaults:
  - Trait values are initialized to 50 for all traits.
- Behavior:
  - Slider change updates local `traits` state.
  - CTA: "Reveal Constellation" triggers `handleCalculate()`.

View: Processing (`view === 'processing'`)

- Purpose: loading/transition.
- Behavior:
  - On `handleCalculate()`, `view` is set to `processing`.
  - A `setTimeout` of 900ms is used to simulate processing.
  - After timeout, results are calculated and `view` is set to `results`.
- UI:
  - Spinning ring animation with hub icon.
  - Text: "Mapping ecological strategies...".

View: Results (`view === 'results'`)

- Purpose: show top 3 animal matches.
- Entry condition:
  - `results.length > 0` must be true to render.
- Calculation:
  - Uses Euclidean distance between user trait vector and each animal trait vector.
  - All animals are scored, sorted ascending (lower is closer).
  - Top 3 results are stored in local state.
- Layout:
  - Primary result section:
    - Full-width card with image and "Primary Anchor" badge.
    - Name, tagline, description, and keywords chips.
  - Secondary/Tertiary cards:
    - Two cards for the remaining results with image and description.
    - Labels: "Secondary Influence" and "Tertiary Influence".
- Actions:
  - "Refine Traits": sets `view = 'assessment'` without preserving any history (traits remain as last set).
  - "Save Map": calls `window.print()` for browser print dialog.

Modal: "The Science" (`isAboutOpen === true`)

- Accessible from any view (nav).
- Overlay with:
  - Explanation of the Big Five mapping.
  - External link to `https://bigfive-test.com` (opens new tab).
  - Trait definitions list.
- Close button sets `isAboutOpen = false`.

Data and persistence

- No localStorage usage.
- No Result ID generation.
- No URL routing or deep linking.
- No external API calls.

Navigation summary (current)

- App load -> Intro.
- Intro -> Assessment (Begin Mapping).
- Assessment -> Processing -> Results (Reveal Constellation).
- Results -> Assessment (Refine Traits).
- Any view -> Intro (logo click).
- Any view -> Science modal (nav button).

Non-implemented paths (not present in current code)

- No "Enter Existing Big Five Scores" flow (numeric inputs).
- No "Take Full Big Five Test" flow (iframe or post-test instructions).
- No "Load Saved Result" flow.
- No explicit save prompt, Result ID, or local storage persistence.
