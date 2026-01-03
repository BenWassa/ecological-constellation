Current User Flow (Streamlined - January 2026)

Scope
This document describes the streamlined runtime flow and UI states implemented in `src/SpiritAnimal.tsx`.
This is the canonical simplified flow optimized for minimal user friction.

High-level state machine

- Single-page app with in-memory view state.
- **Streamlined flow**: `intro` -> `assessment` -> `processing` -> `results`.
- The intro screen now includes direct "Begin Test" CTA to skip method selection.
- Navigation is controlled by local React state, not routing.

Entry point

- App mounts `SpiritAnimal` via `src/App.tsx` and `src/main.tsx`.
- Initial state: `view = 'intro'` with direct path to assessment.

Global UI elements

- Top nav bar:
  - Logo button labeled "ARCHETYPE MAP".
  - Clicking logo sets `view = 'intro'` (no confirmation or persistence).
  - "The Science" button opens a modal overlay (`isAboutOpen = true`).
- Background:
  - Particle animation rendered by `src/components/Particles.tsx`.
  - Two animated glow blobs, purely decorative.

View: Intro (`view === 'intro'`)

- Purpose: landing/hero with direct test access.
- Content:
  - Title: "Discover Your Ecological Constellation".
  - Description of Big Five translation to ecological strategies.
- **Primary CTA: "Begin Test"** (previously "Begin Mapping").
- Action:
  - Clicking "Begin Test" directly sets `view = 'assessment'` (skips method-select).
  - Users can access advanced options (manual entry, external test) via secondary UI if needed.

**REMOVED VIEW: Method Select** 
- The `method-select` view is no longer part of the primary flow.
- Users go directly from intro to the slider-based assessment for optimal UX.

View: Assessment (`view === 'assessment'`)

- Purpose: **PRIMARY INPUT METHOD** - slider-based trait input.
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
- **This is the default and recommended entry point for all users.**

**OPTIONAL VIEWS** (for advanced users):

View: External Test Info (`view === 'external-test-info'`)

- Purpose: explain external test and data ownership (advanced option only).
- Content includes:
  - "This site does not administer personality tests."
  - "You will receive numeric scores for O C E A N."
  - "Save your Test ID or results page for future use."
- Actions:
  - "Go to Big Five Test" opens `https://bigfive-test.com` in a new tab.
  - "I already have my results" sets `view = 'manual-entry'`.
  - "Back to method selection" sets `view = 'method-select'`.
- **Note**: This view is accessible via secondary navigation only, not part of primary flow.

View: Manual Entry (`view === 'manual-entry'`)

- Purpose: numeric Big Five input (advanced option only).
- Inputs:
  - Number fields for O, C, E, A, N (0-100).
  - Optional "Test ID (for your reference)".
- CTA: "Reveal Constellation" triggers `handleCalculate()`.
- **Note**: This view is accessible via secondary navigation only, not part of primary flow.

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
  - "Refine Traits": returns to `assessment` or `manual-entry` based on last selected input method.
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
- Intro -> Method Select (Begin Mapping).
- Method Select -> Assessment or Manual Entry or External Test Info.
- External Test Info -> Manual Entry or Method Select.
- Assessment/Manual Entry -> Processing -> Results (Reveal Constellation).
- Results -> Assessment or Manual Entry (Refine Traits).
- Any view -> Intro (logo click).
- Any view -> Science modal (nav button).

Non-implemented paths (not present in current code)

- No "Load Saved Result" flow.
- No explicit save prompt, Result ID, or local storage persistence.
