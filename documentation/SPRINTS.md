Sprint — Decoupled Big Five Interpretation (v1)

Sprint Goal
Enable users to use external Big Five results with Ecological Constellation by:
	•	Clearly directing them to an external test
	•	Letting them return and interpret results
	•	Optionally tagging interpretations with a user-held Test ID

This sprint explicitly avoids technical integration.

⸻

Scope (In)
	•	UX copy for external test handoff
	•	“I already have results” path
	•	Manual Big Five score entry
	•	Optional Test ID annotation (user-held)
	•	Clear scientific positioning

⸻

Scope (Out)
	•	iframe embedding
	•	Score ingestion or validation
	•	Backend or accounts
	•	Test verification
	•	Automation of any kind

⸻

Sprint Tasks

Task 1: Add Method Selection Screen

New view: method-select

Options (exact wording can be refined later):
	•	Estimate my traits (quick)
	•	I already have Big Five results
	•	Take a full Big Five test

Acceptance
	•	Intro CTA routes here
	•	Existing “Estimate traits” path remains intact
	•	User choice is explicit and respected

⸻

Task 2: External Test Handoff Screen

New view: external-test-info

Content requirements
	•	Explain that the test is external and standardized
	•	Emphasize user responsibility for saving results
	•	Provide a single clear outbound link

Required copy elements
	•	“This site does not administer personality tests.”
	•	“You will receive numeric scores for O C E A N.”
	•	“Save your Test ID or results page for future use.”

CTA
	•	“Go to Big Five Test” (opens new tab)
	•	“I already have my results” (returns to app)

Acceptance
	•	No iframe
	•	No data coupling
	•	Clear user expectations

⸻

Task 3: Manual Big Five Score Entry

New view: manual-entry

Inputs
	•	Five numeric fields or sliders (0–100)
	•	Labels: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
	•	Optional field: “Test ID (for your reference)”

Behavior
	•	Validation: numbers only, 0–100
	•	On submit → existing processing + results pipeline

Acceptance
	•	User can generate constellation without estimation
	•	Test ID is optional and user-controlled

⸻

Task 4: Attach Test ID to Results (Non-Authoritative)

Results screen update
	•	If Test ID provided:
	•	Display as “Associated Test ID”
	•	Clarify: “User-supplied reference”

Important
	•	No verification
	•	No assumptions
	•	No dependency

Acceptance
	•	ID persists with result locally (if persistence exists)
	•	App never relies on ID for logic

⸻

Task 5: Update Science / About Copy

Add clarification
	•	Distinguish measurement vs interpretation
	•	State that Ecological Constellation is a meaning layer

Key language
	•	“Interpretive framework”
	•	“Non-diagnostic”
	•	“Contextual strategies”

Acceptance
	•	No ambiguity about what your app does
	•	Strong scientific posture

⸻

Definition of Done
	•	Users can choose to:
	•	Estimate traits
	•	Use existing Big Five results
	•	Take an external test
	•	External test is linked, not embedded
	•	Users are explicitly told to save their Test ID
	•	Manual score entry works end-to-end
	•	No new technical dependencies introduced

⸻

Success Criteria (Product-Level)
	•	Users understand the relationship between the test and the constellation
	•	No confusion about data ownership
	•	No friction that blocks interpretation
	•	App remains lightweight and stable

⸻

---

Sprint — Streamlined User Flow (v2) — January 2026

Sprint Goal
Reduce user friction and eliminate unnecessary navigation steps by:
	•	Making slider-based trait estimation the default and primary entry point
	•	Removing the method selection screen from the main flow
	•	Providing direct "Begin Test" access from the home page
	•	Moving advanced options (manual entry, external test) to secondary navigation

⸻

Problem Statement
The previous sprint introduced a method-select screen that added an extra click between the landing page and the actual assessment. User testing and analysis revealed:
	•	The slider-based estimation is the best UI for input
	•	Most users don't need to choose between multiple methods upfront
	•	The extra navigation step creates unnecessary friction
	•	Users want immediate access to the test from the home page

⸻

Scope (In)
	•	Direct routing from intro to assessment (slider view)
	•	Updated CTA language: "Begin Test" instead of "Begin Mapping"
	•	Slider assessment becomes the canonical primary path
	•	Advanced options remain available but not in primary flow
	•	Updated documentation reflecting streamlined flow

⸻

Scope (Out)
	•	Removing manual entry or external test features (kept as advanced options)
	•	Backend changes
	•	New features beyond flow simplification

⸻

Sprint Tasks

Task 1: Remove Method Selection from Primary Flow

Update navigation logic:
	•	Intro "Begin Test" button now routes directly to `view = 'assessment'`
	•	Remove `view = 'method-select'` from primary user journey
	•	Keep method-select view in codebase for potential secondary access

Acceptance:
	•	User clicks "Begin Test" on home page → goes directly to sliders
	•	No intermediate selection screen in primary flow
	•	Flow is: intro → assessment → processing → results

⸻

Task 2: Update Home Page CTA

Content changes:
	•	Change button text from "Begin Mapping" to "Begin Test"
	•	Ensure messaging emphasizes immediate access to assessment
	•	Maintain existing intro copy describing the constellation concept

Acceptance:
	•	CTA clearly signals direct access to the test
	•	User expectations aligned with actual behavior

⸻

Task 3: Reposition Advanced Options

Implementation:
	•	Manual entry and external test options remain functional
	•	Access via secondary navigation (e.g., footer link, settings menu, or "Advanced Options" link)
	•	Not presented as equals to slider estimation in primary flow

Acceptance:
	•	Power users can still access manual entry and external test
	•	These options don't clutter the main user journey
	•	Clear signaling that sliders are the recommended method

⸻

Task 4: Update Documentation

Files to update:
	•	`CURRENT_USERFLOW.md`: Reflect new streamlined flow
	•	`SPRINTS.md`: Add this sprint documentation
	•	Update flow diagrams if they exist

Content requirements:
	•	Document removal of method-select from primary flow
	•	Mark assessment view as "PRIMARY INPUT METHOD"
	•	Clearly indicate manual-entry and external-test-info as "OPTIONAL/ADVANCED"

Acceptance:
	•	Documentation accurately reflects implemented flow
	•	Future developers understand the simplified UX intent

⸻

Definition of Done
	•	Home page "Begin Test" button routes directly to slider assessment
	•	Method selection screen removed from primary user journey
	•	Advanced options (manual entry, external test) remain accessible via secondary navigation
	•	Documentation updated to reflect streamlined flow
	•	No regressions in existing functionality

⸻

Success Criteria (Product-Level)
	•	Reduced friction: users access test in fewer clicks
	•	Higher engagement with slider-based assessment
	•	Clearer user mental model: "this is a personality test with ecological interpretation"
	•	Maintained flexibility for advanced users who have external results

⸻

Rationale
The slider-based trait estimation provides:
	•	Immediate engagement (no choice paralysis)
	•	Best UI/UX for exploration and adjustment
	•	Clear visual feedback as users interact
	•	Lowest barrier to entry for new users

By making it the default path, we optimize for 90% of users while keeping power-user options available for the 10% who need them.

⸻
