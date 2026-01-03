Ecological Constellation

Canonical User Flow (v1.0)

This flow supports three user intents, preserves scientific credibility, and avoids dead ends.

⸻

GLOBAL ENTRY POINT

Landing / Intro Screen

Purpose: Orientation + trust + choice

Primary messaging:
• What this is
• What it is not
• Why animals are used
• That results are strategies, not identities

Primary actions (clear fork): 1. Estimate My Traits 2. Enter Existing Big Five Scores 3. Take a Full Big Five Test 4. (Secondary) Load Saved Result

This screen is always reachable via logo click.

⸻

PATH A: ESTIMATE MY TRAITS (Fast, Intuitive)

Screen A1: Trait Estimation (Sliders)
• Uses current slider-based UI
• Descriptive anchors only (no test framing)
• Framed as approximation

Actions:
• Adjust sliders
• CTA: Reveal Constellation

⸻

Screen A2: Processing
• Short animation
• Messaging: “Mapping ecological strategies…”

⸻

Screen A3: Results
• Primary / Secondary / Tertiary animals
• Trait explanations
• Keywords
• Educational framing

Persistence prompt (critical):
• “Save this result?”
• Generates Result ID
• Auto-saves to localStorage
• Copy Result ID button

Exit options:
• Refine traits
• Save / Print
• Return to intro

⸻

PATH B: ENTER EXISTING BIG FIVE SCORES (Precise, Respectful)

Screen B1: Score Entry

Purpose: Honor users who already did the work

Inputs:
• Numeric inputs or sliders (0–100)
• Clear labels: O C E A N
• Tooltip: “Compatible with IPIP / BigFive-Test / NEO-style outputs”

Optional helper:
• “Where do I find these scores?”

Actions:
• Paste / enter values
• CTA: Generate Constellation

⸻

Screen B2: Processing

Same as A2

⸻

Screen B3: Results

Same as A3

Persistence behavior identical to Path A

⸻

PATH C: TAKE FULL BIG FIVE TEST (Measured, External)

Screen C1: Test Explanation

Purpose: Set expectations and authority

Messaging:
• “Standardized, research-based Big Five assessment”
• “External tool used for measurement”
• “You will receive numeric scores”

Actions:
• Begin Test
• Cancel / Go Back

⸻

Screen C2: Embedded Test (iframe)
• Hosted externally
• Clearly visually separated
• No constellation logic yet

Non-negotiable UI note:
• “When finished, record your Result ID or scores”

⸻

Screen C3: Post-Test Instruction

Shown immediately after iframe completion

Content:
• “You’ve completed the assessment”
• “You now have O C E A N scores”
• Instruction to:
• Enter scores manually or
• Apply automatically (future)

Actions:
• Enter Scores
• Back to Intro

⸻

Screen B1 → B3

From here, user joins Path B

⸻

PATH D: LOAD SAVED RESULT (Continuity)

Entry Points:
• Landing screen
• Nav menu
• Results footer

⸻

Screen D1: Load Result

Options:
• Select from locally saved results
• Enter Result ID manually

Validation:
• Friendly error if not found

⸻

Screen D2: Results
• Direct render
• Banner: “Loaded saved constellation”

⸻

RESULT PERSISTENCE RULES (LOCKED)

When results are generated (any path):
• Generate Result ID
• Save:
• Traits
• Animal results
• Timestamp
• Store in localStorage
• Prompt user explicitly:
“Save this Result ID to revisit later”

Result ID must be:
• Visible
• Copyable
• Human-readable

⸻

USER PROMISES (EXPLICIT)

The system guarantees:
• No forced test-taking
• No forced account creation
• Results are portable
• Strategies are contextual, not labels

⸻

NON-GOALS (v1)

Explicitly out of scope:
• Accounts
• Cloud sync
• Social sharing
• Comparative scoring
• “Type” assignment

⸻
