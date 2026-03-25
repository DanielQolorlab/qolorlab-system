# Template Library

All templates follow the same conventions: `<Scene>` + `<SafeArea>` layout, `Q.color.*` tokens, `px()` scaling, spring-smooth motion from `@qolorlab/motion`. Default duration is 150 frames (5s at 30fps).

---

## Templates

### TestCard
**Purpose:** Minimal title + subtitle card for testing compositions and validating the pipeline.
**Typical content:** A short headline and an optional descriptor line.
**Strengths:** Fastest to set up. No secondary animation layer or visual elements to distract.
**When to use:** Placeholder during development; first card in a new render plan to verify timing.
**Related:** ChapterCard (same structure, more deliberate pacing and full-screen centering).

---

### FeatureCard
**Purpose:** Introduce a named feature, concept, or argument with a brief explanation.
**Typical content:** A topic title (h2) and one to two sentences of body text. Red accent bar marks the opening.
**Strengths:** Two-layer stagger (title at 0, body at 6) gives content room to settle. Accent bar signals a new idea without decoration.
**When to use:** After a chapter opener or stat to explain what was just stated. Works well in series when covering multiple features.
**Related:** StepCard (sequential multi-item variant), CompareCard (when the idea needs contrast).

---

### StatCard
**Purpose:** Present a single metric or number as the primary statement.
**Typical content:** A number or percentage (e.g. `"94%"`), a label explaining it, and an optional source line.
**Strengths:** Large stat text dominates the frame with nothing competing. Hierarchy is unambiguous. Centered layout gives it visual weight.
**When to use:** Opening a section to establish stakes, closing a section to prove a point, or punctuating an argument mid-sequence.
**Related:** QuoteCard (same centered, high-impact format — use Stat for data, Quote for language).

---

### CompareCard
**Purpose:** Place two things side by side to highlight contrast or trade-offs.
**Typical content:** Optional framing title (h3), two labelled columns each with a short body paragraph. Thin vertical divider separates them.
**Strengths:** Equal-weight columns make the contrast structural, not editorial. Staggered entrance (left → right +6 frames) draws the eye across the divide.
**When to use:** Directly after a chapter opener that names a tension. Works as a pivot card before diving into detail.
**Related:** FeatureCard (use when one side clearly wins and needs more explanation).

---

### StepCard
**Purpose:** Present a short sequential process or methodology.
**Typical content:** Optional card title, 2–4 numbered steps each with a short title and optional subline.
**Strengths:** Monospace red step numbers create a strong visual rhythm. Steps stagger in at 6-frame intervals so the sequence reads as progression, not a dump.
**When to use:** When a concept has a clear order of operations. After a CompareCard that argued for an approach, StepCard shows how to do it.
**Related:** FeatureCard (use for a single step that needs more explanation), ChapterCard (use before StepCard to frame the process).

---

### QuoteCard
**Purpose:** Deliver a thesis statement, principle, or pull quote as the emotional anchor of a section.
**Typical content:** One to two lines of bold declarative text (h1). Optional attribution line below.
**Strengths:** No competing elements — just the rule, the statement, and space. The red rule bar above the quote signals authority without decoration. Calm pacing lets the statement land.
**When to use:** To open a video with a thesis, to close a section with a conclusion, or to punctuate between two dense cards. Avoid using consecutively.
**Related:** ChapterCard (structural sibling — Chapter divides, Quote declares), StatCard (use Stat when the anchor is a number).

---

### ChapterCard
**Purpose:** Mark the boundary between major sections of a longer video.
**Typical content:** Optional chapter or section label (e.g. `"Chapter 01"`, `"Part II"`) and one short title as the section name.
**Strengths:** Full-screen centering and a 10-frame stagger between label and title create a cinematic pause. Nothing else competes. Functions as a visual breath.
**When to use:** At the start of each major section in any video longer than 60 seconds. Pairs with a crossfade transition from the previous scene.
**Related:** QuoteCard (ChapterCard names a section, QuoteCard makes a claim — they often appear in sequence).

---

## Narrative Flow Examples

### Essay / Thought Leadership
Opening → argument → proof → method → close.

```
ChapterCard   "The Problem"
QuoteCard     Core thesis statement
CompareCard   Old approach vs new approach
FeatureCard   Key idea #1
FeatureCard   Key idea #2
StatCard      Supporting data point
ChapterCard   "The Solution"
StepCard      How to apply it
QuoteCard     Closing principle
```

---

### Product or Tool Explainer
Orient → differentiate → show how it works → prove it.

```
TitleCard     Product name + tagline
ChapterCard   "What It Does"
CompareCard   Without it vs with it
FeatureCard   Core capability #1
FeatureCard   Core capability #2
StepCard      Setup or usage flow
StatCard      Result or benchmark
QuoteCard     Closing statement
```

---

### Tutorial or Process Walkthrough
Frame → steps → reinforce.

```
ChapterCard   Section name
FeatureCard   Concept to understand before starting
StepCard      The step-by-step process
StatCard      What successful completion looks like
QuoteCard     Principle that explains why it works
```

---

### Single-Point Argument (short format, < 60s)
Claim → evidence → implication.

```
QuoteCard     Opening claim
StatCard      The number that makes it real
CompareCard   Why the current approach fails
FeatureCard   The better alternative
ChapterCard   Closing section title (optional)
```

---

## Quick Reference

| Template     | Primary prop     | Layout     | Typical position      |
|--------------|-----------------|------------|-----------------------|
| TestCard     | title           | left       | dev / placeholder     |
| FeatureCard  | title           | left       | middle of section     |
| StatCard     | stat            | centered   | opener or punctuation |
| CompareCard  | left + right    | split      | pivot / contrast      |
| StepCard     | steps[]         | left list  | after concept intro   |
| QuoteCard    | quote           | left       | opener or closer      |
| ChapterCard  | title           | centered   | section boundary      |
