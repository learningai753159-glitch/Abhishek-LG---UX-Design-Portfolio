# Prompt for Claude Design: "03 — The Process" (storytelling section)

## How to use
Upload this file together with `pre-bind-intake.html` and paste this line:

> Add a new section "03 — The Process" to this page, exactly as described in the attached prompt. Do not change sections 01 and 02. Use placeholders wherever I need to add content. Never invent research, quotes, metrics or artefacts.

---

## 1. Task
Add one new section to `pre-bind-intake.html`, directly after "02 — The Strategy". It shows HOW I worked, not just the result, told as a short visual story. A hiring manager should read it in about two minutes and come away knowing how I discover, explore, decide and validate.

The section has a bridge, five chapters and a closing handoff. It must feel fresh and warm, not like a corporate process diagram.

## 2. Look and feel (match the existing page)
- Reuse the page's existing CSS variables, fonts and components. Do not introduce new fonts or a new palette.
- Continue the existing visual language: cream background, dark and light green accents, rounded cards, the small pill label style ("01 — The Problem"), the serif numerals used in the stat pills, and the handwritten script accent used for "What it added up to".
- Keep the section pill: **03 — The Process**.
- **Concept: "the project wall."** Section 01 already uses sticky notes. Continue that world: the process is shown as artefacts pinned to a wall, such as taped sketches, index cards, polaroid-style frames, paper clips and handwritten margin notes. Slightly imperfect rotation and tape make artefacts feel real. Keep them tidy enough to read.
- A thin green "thread" runs down the left side of the section, connecting the five chapters, with a small progress marker that fills as the reader scrolls.
- Motion: gentle fade and slide-in as each chapter enters. Respect `prefers-reduced-motion`.

## 3. Placeholder system
Every place I must add something is a placeholder block:
- Dashed green border, pale green tint, rounded corners, styled to sit naturally on the wall.
- Top-left mono pill: `ADD · IMAGE`, `ADD · TEXT`, `ADD · QUOTE`, `ADD · DIAGRAM` or `ADD · NUMBER`.
- One line stating exactly what goes there, plus a grey line with the recommended format (for example "4:3, PNG, redacted").
- Add a page-level toggle, "Hide placeholders", so I can preview the finished section.
- Draft copy that you can safely pre-fill (chapter titles, sentence frames) appears in normal text with an amber `REWRITE` pill.

## 4. Structure

### Bridge (top of section)
- One line: "The strategy above came out of this work. Here is how I got there."
- A five-step trail strip: Understand → Frame → Explore → Decide → Validate. Each step is clickable and scrolls to its chapter. The current step highlights while scrolling.
- Placeholder: `ADD · TEXT` for one sentence on the timeline and my role ("Over [X weeks], I worked with [who]").

### Chapter 1: "I started by listening" (Understand)
**Scene:** a wall of raw discovery material.
- `ADD · IMAGE`: one discovery artefact (redacted workflow sketch, shadowing notes, or a list of real submissions reviewed). 4:3.
- `ADD · QUOTE`: one real line from an underwriter or stakeholder, presented as a large handwritten-style pull-quote card. Redact names.
- `ADD · TEXT` in this frame: "I [interviewed / shadowed / reviewed] [N] underwriters across [LOBs]. The finding that changed my approach: [one sentence]."
- Small source tag component: "From: [shadowing / interviews / submission review]". Also reuse this tag component on the sticky notes in section 01 if straightforward, with placeholder text.

### Chapter 2: "Then I drew the whole day" (Frame)
**Scene:** a before/after workflow map on one wide card with a toggle: Before / After.
- Before: the old flow as connected stops (email → 5 separate files → manual assembly → assessment), with the biggest time sinks marked by red circles.
- After: the new flow with the same stops collapsed.
- `ADD · DIAGRAM`: my actual workflow map, if I have one. If not, build a clean editable version using the flow above and the labels "ADD · TEXT" on each stop for time spent.
- `ADD · TEXT` in this frame: "The biggest break in the old flow was [X]. I removed it by [Y]."
- Small caption: "How the 40% was estimated: [ADD · TEXT]".

### Chapter 3: "I tried three ways to solve it" (Explore)
**Scene:** three rough layout cards fanned out on the wall; the chosen one lifts forward, the others stay slightly dimmed and tilted.
- Three `ADD · IMAGE` slots (rough sketch or low-fi of each alternative workbench layout, for example table + drawer, tabs, three-column). 4:3 each.
- Under each card: a handwritten-style note, `ADD · TEXT`: "Why it won" or "Why it lost".
- Clicking a card brings it forward and shows its note.
- Mark the winner with a small green "Chosen" tag.
- `ADD · TEXT` in this frame: "I chose [option] because [reason]. I dropped [option] because [reason]."

### Chapter 4: "One version, then a better one" (Decide)
**Scene:** a before/after comparison slider on one screen, v1 left and v2 right (draggable divider; on mobile, two stacked images with a toggle).
- Two `ADD · IMAGE` slots: v1 and v2 of the same screen. 16:10.
- A "What triggered the change" note card: `ADD · TEXT`, with a tag chosen from: user feedback, engineering constraint, stakeholder review, testing.
- `ADD · TEXT` in this frame: "V1 failed when [feedback or constraint]. In V2 I changed [X]."

### Chapter 5: "Then I tested it, and negotiated it" (Validate)
**Scene:** two side-by-side cards on the wall, "What I tested" and "What I negotiated".
- Left card: `ADD · TEXT`: how I tested (who, how many, what format) and one thing I changed because of it.
- Right card: `ADD · TEXT`: the hardest trade-off I negotiated with product or engineering, shown as a small tug-of-war graphic: [X] on one side, [Y] on the other, and the resolution in the middle.
- Optional strip: up to 3 `ADD · IMAGE` thumbnails (whiteboard photo, Figma version history, redacted spec) that open in a lightbox with captions.
- Small label on any redrawn artefact: "Reconstructed from memory".

### Closing handoff
- One line: "This is what led to the solution below."
- A soft arrow leading into the next existing section.
- `ADD · TEXT`: one-sentence takeaway ("What this process taught me: [X]").

## 5. Copy rules
- Plain English, short sentences, first person, past tense. No emojis, no superlatives, no marketing language.
- Chapter headlines may be slightly warmer and more human than the rest of the page, but stay specific.
- Every chapter has at most 40 words of body text. The visuals carry the story.

## 6. Responsive and accessibility
- Below tablet width: chapters stack, the thread moves to a thin line above each chapter, the fanned cards become a horizontally scrollable row, and the comparison slider becomes a two-tab toggle.
- Wide diagrams scroll inside their own container. The page must never scroll sideways.
- Keyboard operable toggles, sliders and lightbox, with visible focus and alt text on every image slot.
- Sufficient contrast for all text, including on tinted placeholder blocks.

## 7. Technical
- Static HTML, CSS and vanilla JS inside `pre-bind-intake.html`. No new libraries.
- Use semantic markup: `section`, `article` per chapter, `figure` and `figcaption` for artefacts.
- Keep the existing navigation, and add "The Process" to the sticky section nav if one exists.

## 8. Deliverable
- The updated `pre-bind-intake.html`.
- At the end, a short list of every placeholder created, in chapter order, so I can work through them.
