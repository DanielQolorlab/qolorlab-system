# Basin Navigation System
## SYSTEM_OVERVIEW — v1.0

---

## What This System Is

This is a decision system for navigating latent space in image generation tools. It is not a prompt-writing guide.

A prompt is a coordinate. The system's job is to compute that coordinate with precision — basin first, then dimensions, then controls. Every field has a definite state. No field is optional. No field may be left undefined without an explicit declaration.

**Current target:** Midjourney (manual operation)
**Future targets:** Additional tools via separate adapter specs. This document defines the tool-agnostic conceptual model.

---

## Core Concepts

### Prompts Are Coordinates

A model's latent space contains high-dimensional regions associated with visual patterns. Prompts do not instruct the model — they activate regions of that space. Semantic vagueness and structural redundancy produce coordinates in high-variance regions: unpredictable results.

Precision = a coordinate in a low-variance region.

---

### Attractor Basins

A **basin** is a region of latent space with a dominant visual attractor — a cluster of related images the model gravitates toward when activated by specific token patterns.

| Property | Definition |
|---|---|
| Anchor | The token(s) that activate the basin. Subject + medium define the content basin. `--sref` defines the style basin |
| Radius | How tightly constrained the visual output is within the basin |
| Overlap | Adjacent basins bleed into each other when anchors are compatible |
| Conflict | Incompatible anchors do not average — they produce noise |

Basin targeting rules:
1. The first 3–5 tokens carry disproportionate weight (attention front-loading)
2. Subject and medium jointly define the **content basin** — they must appear first and must be compatible
3. `--sref` defines the **style basin** — it operates as a hard visual constraint, not a suggestion
4. Conflicting basin signals do not average — they produce basin noise
5. Cross-basin blending is only valid when explicitly intended and both anchors are weighted

---

### Dimension Separation

Each visual property occupies a separate dimension in latent space. Conflating dimensions produces weak or undefined control.

| Dimension | Controls |
|---|---|
| Subject | What exists in the frame |
| Medium | What the image materially is |
| Lighting | How light behaves — quality and direction |
| Colour | Palette, saturation, temperature |
| Era | Historical/temporal period of the aesthetic |
| Mood | Emotional register of the scene |
| Camera | Focal length, depth of field |
| Composition | Spatial arrangement and framing |

Each dimension has exactly one assignment per prompt. An unassigned dimension must be either declared null (with a reason) or explicitly delegated to the model.

---

### Token Redundancy

Token redundancy is a prompt defect. The model distributes attention across the full token count. Synonyms, emphasis words, and restatements increase noise without increasing control.

Prohibited patterns:
- Restating subject properties in different words
- Quality amplifiers: `highly detailed`, `stunning`, `beautiful`, `masterpiece`
- Mood synonyms in the same prompt
- Naming a style and an artist of that style simultaneously, unless cross-weighting is the explicit intent
- Using `--no` without a corresponding positive specification in the prompt body

---

### Dimension State

Every dimension has exactly one of three states. This is enforced at the prompt validation step.

| State | Meaning | How to declare |
|---|---|---|
| `assigned` | Dimension is explicitly specified with a token | Token present in the prompt |
| `null` | Dimension is not relevant to this image | Declared in the prompt record with a reason |
| `delegated` | Dimension is intentionally handed to the model | Listed in Layer 6 (Model Delegation) |

An unspecified dimension with no declaration is an error state.

---

### The Control Stack

```
Content Basin:   subject_anchor + medium_anchor     ← defines what the image is
Style Basin:     --sref [url or seed]               ← defines visual DNA
Character Lock:  --cref [url]                       ← locks identity across images (if applicable)
System Lock:     --v --ar --stylize --seed           ← defines execution environment
Prompt Body:     dimensions 2–5                     ← refines within the basin
Exclusions:      --no [tokens]                      ← weak suppression
```

All components must be explicitly set. Any component left out without a declaration is an error.

---

## System Integrity Rules

Non-negotiable. Violations produce unattributable results that cannot inform future decisions.

1. **No undocumented generations.** Every generation outside the logging format is lost data.
2. **One variable per iteration.** Multi-variable iterations must be discarded from the learning record.
3. **All Layer 0 parameters must be set before the first iteration.** A session without a locked stylize, seed, and model version is not a controlled experiment.
4. **`--sref` is not optional for style-consistent projects.** If style consistency is a goal and sref is not set, the goal cannot be met. Declare `null: building` and establish a sref before production use.
5. **Every unassigned dimension requires a declaration.** Undefined dimensions are errors, not defaults.
6. **Token redundancy is a defect.** A prompt with synonyms, quality amplifiers, or restated properties must be revised before execution.
7. **`iterate` verdicts require a declared next variable.** An incomplete verdict produces an incomplete iteration chain.

---

*Basin Navigation System v1.0 — Qolorlab / Internal Systems*
