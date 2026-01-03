Sprint 1 — Identity, Persistence, and Recovery

Theme: From “quiz” to “tool”
Duration: 1–2 days
Risk: Low
Goal: Introduce continuity without changing core flow

---

Sprint 1 Goal

Enable users to:
	-	Preserve results across sessions
	-	Revisit prior constellations
	-	Understand that results are not ephemeral

No new measurement paths yet. No external test integration yet.

---

Scope (In)
	-	Result ID generation
	-	Local persistence (localStorage)
	-	Load saved results
	-	Explicit save messaging
	-	Minimal UI additions

---

Scope (Out)
	-	Big Five test embedding
	-	Method selection screen
	-	Numeric score entry
	-	Backend or accounts

---

Tasks

Task 1: Define Result Identity Model

Add a Result object shape:
	-	resultId (short, human-readable)
	-	traits snapshot (E A C O N)
	-	top 3 animals
	-	timestamp

Acceptance
	-	Result object is serializable
	-	Stored and retrievable as JSON

---

Task 2: Generate Result ID

Implementation
	-	Generate on transition to results
	-	Format example: EC-7F3A9Q
	-	Deterministic randomness not required yet

Acceptance
	-	Every results screen shows a Result ID
	-	ID is stable for that result

---

Task 3: Persist to localStorage

Implementation
	-	Save result automatically on generation
	-	Store array of results (append-only for now)
	-	Key example: ecological-constellation:results

Acceptance
	-	Reloading the page does not lose saved results
	-	Multiple results can coexist

---

Task 4: Display Save & Recovery UI

Results screen additions
	-	“Your Result ID” display
	-	Copy button
	-	Subtext: “Save this ID to revisit later”

Intro screen addition
	-	Secondary CTA: “Load saved result”

Acceptance
	-	User can copy ID
	-	User understands persistence without instructions

---

Task 5: Load Saved Result Flow (Minimal)

Implementation
	-	Simple modal or inline panel
	-	Show list of saved results (timestamp + primary animal)
	-	Allow selection → sets view = 'results'

Acceptance
	-	User can return to previous constellation
	-	No crashes if storage is empty

---

Definition of Done (Sprint 1)
	-	Results persist across refresh
	-	Users can recover prior results
	-	Result ID is visible and copyable
	-	Existing flow still works end-to-end

---

Sprint 2 — User Choice & Measurement Paths

Theme: Respect user intent
Duration: 2–3 days
Risk: Medium (UI branching)
Goal: Add multiple valid paths into the constellation

---

Sprint 2 Goal

Allow users to:
	-	Estimate traits (current behavior)
	-	Enter known Big Five scores
	-	Prepare for full test integration

No forced path. No loss of simplicity.

---

Scope (In)
	-	Method Selection screen
	-	Manual score entry flow
	-	External test placeholder
	-	Flow wiring

---

Scope (Out)
	-	Automated score ingestion
	-	Tight iframe-to-state coupling
	-	Backend storage

---

Tasks

Task 1: Add Method Selection Screen

New view: method-select

Options
	-	Estimate my traits
	-	Enter existing Big Five scores
	-	Take full Big Five test
	-	Load saved result

Acceptance
	-	Intro CTA routes here
	-	Each option is explicit and readable

---

Task 2: Wire Existing Flow to “Estimate Traits”

Implementation
	-	“Estimate traits” → current assessment view
	-	No behavioral changes

Acceptance
	-	Zero regression in existing UX

---

Task 3: Add “Enter Existing Scores” Flow

New view: manual-entry

UI
	-	Numeric inputs or sliders (0–100)
	-	Labels: O C E A N
	-	Helper text: “Compatible with IPIP / BigFive-Test outputs”

Behavior
	-	On submit → same processing + results pipeline

Acceptance
	-	User can bypass estimation
	-	Results match manual input

---

Task 4: Add “Take Full Big Five Test” Placeholder

New view: external-test

For now
	-	Clear explanation screen
	-	Button linking or embedding external test
	-	“Return to enter scores” CTA

Acceptance
	-	Flow is visible but optional
	-	No broken states

---

Task 5: Navigation Hardening

Add guardrails
	-	Confirm before discarding unsaved changes (optional)
	-	Preserve traits when navigating backward

Acceptance
	-	No accidental data loss
	-	Navigation feels intentional

---

Definition of Done (Sprint 2)
	-	Users can choose how to generate their constellation
	-	Existing users are not forced into testing
	-	App supports informed users gracefully
	-	Flow matches the canonical user flow doc

---

