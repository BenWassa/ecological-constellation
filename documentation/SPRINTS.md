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
