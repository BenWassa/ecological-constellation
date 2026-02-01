Current User Flow (Streamlined - February 2026)

Scope
This document describes the streamlined runtime flow and UI states implemented in `src/features/constellation/ConstellationApp.tsx`.
`src/SpiritAnimal.tsx` re-exports the feature for `src/App.tsx`.

High-level state machine

- Single-page app with in-memory view state.
- **Streamlined flow**: `intro` -> `assessment` -> `processing` -> `results`.
- Navigation is controlled by local React state, not routing.

Entry point

- App mounts `SpiritAnimal` via `src/App.tsx` and `src/main.tsx`.
- Initial state: `view = 'intro'` with direct path to assessment.

Global UI elements

- Top nav bar:
  - Logo button labeled "ARCHETYPE MAP".
  - Clicking logo sets `view = 'intro'`.
  - "The Science" button opens a modal overlay (`isAboutOpen = true`).
- Background:
  - Particle animation rendered by `src/components/Particles.tsx` via `BackgroundParticles`.
  - Two animated glow blobs, purely decorative.

View: Intro (`view === 'intro'`)

- Purpose: landing/hero with direct test access.
- Content:
  - Title: "Discover Your Ecological Constellation".
  - Description of Big Five translation to ecological strategies.
- Primary CTA: "Begin Mapping".
- Action:
  - Clicking "Begin Mapping" sets `view = 'assessment'`.
- External link:
  - "Take the Big Five test" opens `https://bigfive-test.com` in a new tab.

View: Assessment (`view === 'assessment'`)

- Purpose: primary input method (slider-based trait input).
- UI structure:
  - Header: "Trait Input" with subtext.
  - Sliders for 5 traits in this order: N, E, O, A, C.
  - Each slider shows:
    - Trait name and description.
    - Current numeric value (0–120).
    - Range labels (low/high anchor text).
- Defaults:
  - Trait values are initialized to 60 for all traits.
- Behavior:
  - Slider change updates local `traits` state.
- CTA: "Reveal Constellation" triggers `handleCalculate()`.

Optional views (present in code, not wired in primary nav)

View: External Test Info (`view === 'external-test-info'`)

- Purpose: explain external test and data ownership.
- Content includes:
  - "This site does not administer personality tests."
  - "You will receive numeric scores for O C E A N."
  - "Save your Test ID or results page for future use."
- Actions:
  - "Go to Big Five Test" opens `https://bigfive-test.com` in a new tab.
  - "I already have my results" sets `view = 'manual-entry'`.
  - "Back to home" sets `view = 'intro'`.

View: Manual Entry (`view === 'manual-entry'`)

- Purpose: numeric Big Five input.
- Inputs:
  - Number fields for O, C, E, A, N (0–120).
  - Optional "Test ID (for your reference)".
- CTA: "Reveal Constellation" triggers `handleCalculate()`.

View: Processing (`view === 'processing'`)

- Purpose: loading/transition.
- Behavior:
  - On `handleCalculate()`, `view` is set to `processing`.
  - A `setTimeout` of 900ms simulates processing.
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
    - Name, tagline, description, and keyword chips.
  - Secondary/Tertiary cards:
    - Two cards for the remaining results with image and description.
    - Labels: "Secondary Influence" and "Tertiary Influence".
- Actions:
  - "Save Map": calls `window.print()` for browser print dialog.
- Optional display:
  - If Test ID was entered, it appears as "Associated Test ID" with "User-supplied reference".

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
- Assessment/Manual Entry -> Processing -> Results (Reveal Constellation).
- Results -> Intro (logo click).
- Any view -> Science modal (nav button).
