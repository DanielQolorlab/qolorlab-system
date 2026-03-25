# Basin Navigation System — Midjourney
## Specification v1.1

---

## 0. What This System Is

This is a decision system for navigating latent space in Midjourney. It is not a prompt-writing guide.

A prompt is a coordinate. The system's job is to compute that coordinate with precision — basin first, then dimensions, then controls. Every field in this system has a definite state. No field is optional. No field may be left undefined without an explicit declaration.

---

## 1. Core Conceptual Model

### 1.1 Prompts Are Coordinates

Midjourney's model contains a high-dimensional latent space. Prompts do not instruct the model — they activate regions of that space. Semantic vagueness and structural redundancy produce coordinates in high-variance regions: unpredictable results.

Precision = a coordinate in a low-variance region.

### 1.2 Attractor Basins

A **basin** is a region of latent space with a dominant visual attractor — a cluster of related images the model gravitates toward when activated by specific token patterns.

Basin properties:

| Property | Definition |
|---|---|
| Anchor | The token(s) that activate the basin. Subject + medium define the content basin. sref defines the style basin |
| Radius | How tightly constrained the visual output is within the basin |
| Overlap | Adjacent basins bleed into each other when anchors are compatible |
| Conflict | Incompatible anchors (e.g. `photograph` + `oil painting`) do not average — they produce noise |

Basin targeting rules:
1. The first 3–5 tokens carry disproportionate weight (attention front-loading)
2. Subject and medium jointly define the **content basin** — they must appear first and must be compatible
3. sref defines the **style basin** — it operates as a hard visual constraint, not a suggestion
4. Conflicting basin signals do not average — they produce basin noise
5. Cross-basin blending is only valid when explicitly intended and both anchors are weighted

### 1.3 Dimension Separation

Each visual property occupies a separate dimension in latent space. Conflating dimensions produces weak or undefined control.

The controlled dimensions in this system:

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

Each dimension has exactly one assignment per prompt. An unassigned dimension must be either explicitly delegated to the model (see Section 1.5) or declared null with a reason.

### 1.4 Token Redundancy

Token redundancy is a prompt defect. The model distributes attention across the full token count. Synonyms, emphasis words, and restatements increase noise without increasing control.

Prohibited patterns:

- Restating subject properties in different words
- Quality amplifiers (`highly detailed`, `stunning`, `beautiful`, `masterpiece`)
- Mood synonyms in the same prompt
- Naming a style and naming an artist of that style, unless cross-weighting is the explicit intent
- Using `--no` without a corresponding positive specification

### 1.5 Dimension State

Every dimension in a prompt has exactly one of three states. This is enforced at the prompt validation step.

| State | Meaning | How to declare |
|---|---|---|
| `assigned` | Dimension is explicitly specified with a token | Token is present in the prompt |
| `null` | Dimension is not relevant to this image | Declared in the prompt record with a reason |
| `delegated` | Dimension is intentionally handed to the model | Declared in Layer 6 (Model Delegation) |

An unspecified dimension with no declaration is an error state.

### 1.6 The Control Stack

```
Content Basin:   subject_anchor + medium_anchor     ← defines what the image is
Style Basin:     --sref [url or seed]               ← defines visual DNA
Character Lock:  --cref [url] (if applicable)       ← locks identity across images
System Lock:     --v --ar --stylize --seed           ← defines execution environment
Prompt Body:     dimensions 2–5                     ← refines within the basin
Exclusions:      --no [tokens]                      ← weak suppression
```

A locked visual system requires all components to be explicitly set. Any component left out without a declaration is an error.

---

## 2. Decision Layers

Layers are completed in order. A later layer cannot compensate for an undefined earlier layer.

Every field is required. Fields with no relevant value require a `null` entry with a stated reason. Fields explicitly handed to the model require a `delegated` entry in Layer 6.

---

### Layer 0: System Lock

Set once per project. Held constant across all iterations unless a parameter-level variable test is underway. Changes to Layer 0 parameters reset the iteration sequence.

| Parameter | Required | Notes |
|---|---|---|
| `model_version` | Yes | `--v 6.1` is current stable. Basin behaviour differs significantly between versions |
| `aspect_ratio` | Yes | `--ar 16:9`, `1:1`, `2:3`, `3:4`, etc. Affects composition basin |
| `stylize` | Yes | `0` = prompt-literal. `1000` = maximum model autonomy. Must be set intentionally |
| `seed` | Yes | Required for reproducibility. Generate randomly, then lock. `--seed [int]` |

---

### Layer 1: Basin Anchors

Defines which regions of latent space are activated. These are the highest-weight tokens in the system. All three sub-layers must be completed before proceeding.

#### 1A — Content Basin

| Slot | Required | Notes |
|---|---|---|
| `subject_anchor` | Yes | `portrait of a woman`, `abandoned factory`, `glass of water` |
| `medium_anchor` | Yes | `oil painting`, `35mm photograph`, `pencil sketch`, `3D render` |

Rules:
- Subject and medium are written as a combined phrase: `[subject] [medium]`
- The phrase must appear at the start of the prompt — before all other tokens
- Medium must name a specific material or photographic process, not a category (`art`, `image`, `picture` are invalid)
- Conflicting medium signals in a single prompt are prohibited (one medium per prompt)

#### 1B — Style Basin

| Slot | Required | Notes |
|---|---|---|
| `sref` | Yes | URL or MJ style seed. Primary visual DNA anchor. If no sref exists yet, declare `null: building` and establish one before production use |

Rules:
- When `--sref` is active, style dimension tokens in the prompt (era, colour, mood) carry reduced weight. Reduce them or delegate them to the model
- `--sref` is not decoration — it is the primary mechanism for visual consistency across images
- A project without a locked sref cannot produce a consistent visual system

#### 1C — Character Anchor

| Slot | Required | Notes |
|---|---|---|
| `cref` | Conditional | Required if the same character identity must be consistent across generations. If not applicable, declare `null: no character consistency required` |

---

### Layer 2: Subject Specification

Precise description of what exists in the frame. Fills in the subject anchor with detail. No metaphors, no emotional language, no abstract terms.

| Slot | Required | Notes |
|---|---|---|
| `subject_detail` | Yes | Physical properties only: age, material, clothing, surface state, expression, posture |
| `action_or_state` | Yes | What the subject is doing or its physical state: `standing`, `crumbling`, `lit from within`, `in motion` |

Rules:
- Describe what is physically visible in the image only
- No abstract or metaphorical descriptions at this layer
- Do not restate properties already present in the subject_anchor

---

### Layer 3: Environment

Defines the spatial context of the subject. All fields require a value or an explicit null declaration.

| Slot | Required | Notes |
|---|---|---|
| `environment` | Yes | `interior`, `exterior urban`, `exterior natural`, `abstract void`, `studio` |
| `time_of_day` | Yes | Assign a value, or `null: lighting controlled independently via lighting_quality` |
| `weather_or_atmosphere` | Yes | Assign a value, or `null: not visible in frame` |

---

### Layer 4: Style Dimensions

Each slot accepts exactly one term. A phrase is not valid here. Assign one term or declare null/delegated.

| Slot | Required | Valid form |
|---|---|---|
| `lighting_quality` | Yes | Single term: `soft diffused`, `hard`, `chiaroscuro`, `overexposed`, `neon backlit` |
| `lighting_direction` | Yes | Single term: `top-down`, `front-lit`, `side-lit`, `backlit`, `under-lit` |
| `colour_palette` | Yes | Single term or short descriptor: `desaturated`, `monochrome`, `warm amber`, `cool teal`, `high contrast BW` |
| `colour_temperature` | Yes | One of: `warm`, `neutral`, `cold` |
| `era` | Yes | Single term: `1970s`, `Victorian`, `contemporary`, `futuristic`. If no era target: `null: timeless` |
| `mood_register` | Yes | One word only: `melancholic`, `clinical`, `tense`, `serene`, `aggressive`. If sref is authoritative for mood: `delegated` |

Rules:
- If `--sref` is active and style-authoritative, colour and mood may be declared `delegated` rather than assigned
- Lighting must always be assigned — sref does not reliably control lighting geometry

---

### Layer 5: Camera and Composition

| Slot | Required | Notes |
|---|---|---|
| `focal_length` | Yes | `wide angle`, `35mm`, `85mm portrait`, `macro`, `telephoto` |
| `depth_of_field` | Yes | `shallow`, `deep`, `fully sharp` |
| `composition_type` | Yes | `rule of thirds`, `centered`, `symmetrical`, `diagonal`, `negative space` |
| `framing` | Yes | `full body`, `medium shot`, `close-up`, `extreme close-up`, `aerial` |

---

### Layer 6: Model Delegation

Explicit declaration of which dimensions have been handed to the model. If a dimension is `delegated`, it must be listed here with a reason. All other dimensions must be assigned or null.

| Slot | Default | Notes |
|---|---|---|
| `delegated_dimensions` | `[]` | List of dimension names delegated to the model, each with a reason |

Example:
```yaml
delegated_dimensions:
  - dimension: colour_palette
    reason: sref is authoritative for colour — prompt token would conflict
  - dimension: mood_register
    reason: sref controls mood — token assignment redundant
```

---

### Layer 7: Exclusions

| Parameter | Required | Notes |
|---|---|---|
| `no_tokens` | Conditional | Required when a specific artifact, style bleed, or element must be suppressed. If nothing to exclude: `no_tokens: []` |

Rules:
- `--no` is a weak exclusion — it reduces probability, does not eliminate
- Every token in `no_tokens` must have a corresponding positive specification already present in the prompt
- Maximum 3–4 exclusion tokens — beyond this, the positive specification is insufficient
- `--no` is not a substitute for strong positive anchoring

---

## 3. Prompt Template Format

### 3.1 Token Ordering

Token order maps to attention weight. Basin anchors front-load. Dimensions refine. Controls follow.

```
[subject_anchor] [medium_anchor], [subject_detail], [action_or_state], [environment],
[lighting_quality] [lighting_direction] light, [colour_palette] [colour_temperature],
[era], [mood_register], [focal_length], [depth_of_field], [framing], [composition_type]
--no [no_tokens]
--ar [ratio] --v [version] --stylize [value] --seed [value] --sref [url] --cref [url]
```

Notes on ordering:
- Subject and medium must appear before all descriptive tokens
- Style dimensions (lighting, colour, era, mood) follow environment
- Camera and composition always trail style dimensions
- `--no` goes before all parameter flags
- All parameter flags (`--ar`, `--v`, etc.) go last

### 3.2 Weighting Syntax

Use `::N` only when two basin signals are present and one must dominate. Do not weight detail tokens.

```
[subject_anchor]::[weight] [medium_anchor]::[weight]
```

Weighting reference:

| Weight | Effect |
|---|---|
| `::1` | Baseline (no change) |
| `::2` | Moderate emphasis |
| `::3` | Strong emphasis |
| `::0.5` | Reduced weight — use with caution, may cause basin drift |

Rules:
- Apply weighting only to anchor tokens (Layer 1)
- Never weight mood, colour, or era tokens — they are ambient, not structural
- Do not use weighting when only one anchor is present

### 3.3 Filled Template Example

```
portrait of a woman oil painting, early 30s sharp expression, seated, interior brick wall,
soft diffused side-lit light, desaturated warm palette neutral, 1970s, melancholic,
85mm portrait, shallow depth of field, close-up, centered
--no painterly brush strokes, visible canvas texture
--ar 2:3 --v 6.1 --stylize 250 --seed 4829103 --sref https://[url]
```

Null and delegation record for this prompt:
```yaml
time_of_day: null  # reason: interior, lighting controlled independently
weather_or_atmosphere: null  # reason: interior scene, not applicable
cref: null  # reason: no character consistency required
delegated_dimensions: []
```

### 3.4 Prompt Validation Checklist

Run before every execution. A prompt with any unchecked item must be revised before submission.

- [ ] Subject and medium are the first tokens, written as a combined phrase
- [ ] No dimension has more than one token assigned
- [ ] No quality amplifiers present (`stunning`, `beautiful`, `ultra-detailed`, `masterpiece`)
- [ ] `--sref` is set, or `null: building` is declared in the prompt record
- [ ] `--seed` is set
- [ ] `--stylize` value is intentional (not left at default without a decision)
- [ ] Every `--no` token has a corresponding positive specification in the prompt body
- [ ] Every unassigned dimension is either `null` (declared) or `delegated` (listed in Layer 6)
- [ ] Aspect ratio is consistent with the intended composition type and framing

---

## 4. Iteration Protocol

### 4.1 Perturbation Principle

One variable changes per iteration. All other parameters are held constant. This is the only valid method for attributing observed changes to a specific input.

Multi-variable iterations produce unattributable results. Results from multi-variable iterations must be discarded for the purposes of system learning.

### 4.2 Iteration Order

When results are not correct, iterate in this order. Do not skip layers.

1. **Basin (Layer 1A)** — If the result is in the wrong content basin, change subject or medium anchor first. No other change is useful until the basin is correct.
2. **Stylize (Layer 0)** — If the prompt is being overridden by the model's aesthetics, adjust `--stylize` down. If the result is too literal, adjust up.
3. **sref (Layer 1B)** — If the visual DNA is wrong and stylize is already calibrated, change or establish the sref.
4. **Individual dimensions (Layer 4)** — One at a time. Order: lighting → colour → era → mood.
5. **Camera and composition (Layer 5)** — One at a time after style dimensions are stable.
6. **Weighting (3.2)** — Only after individual dimensions are tested.
7. **Exclusions (Layer 7)** — Only after positive specification is insufficient on its own.

### 4.3 Seed Behaviour

| Operation | Seed state |
|---|---|
| Lock a found composition | Set `--seed` to the value that produced it |
| Test style variants on a fixed composition | Hold seed, change `--sref` |
| Explore new compositions | Remove `--seed` |
| Reproduce a previous result exactly | Seed is necessary but not sufficient — full system lock required |

A seed locks the composition noise floor (local minima), not the style. A changed prompt with a fixed seed will shift output. Seed stability is highest when the prompt body is unchanged.

### 4.4 Stylize Behaviour

| Range | Behaviour |
|---|---|
| `0` | Literal prompt fidelity. Low model aesthetic contribution |
| `100` | MJ default. Light model expression |
| `200–400` | Recommended range for dimension-controlled work |
| `500–700` | Strong model aesthetic expression. Use when sref is primary and prompt is a guide only |
| `800–1000` | Maximum model autonomy. Prompt is directional, not prescriptive |

When `--sref` is the primary style authority, higher stylize values reinforce it. When the prompt is the primary style authority, lower stylize values reinforce it.

---

## 5. Logging Format

Every generation set must produce a log entry. Results without log entries are not part of the system.

### 5.1 Session Header

```yaml
session_id: "[uuid]"
date: "[ISO 8601]"
project: "[project name]"
goal: "[one sentence — what specific visual output is the target of this session]"
system_lock:
  model_version: "v6.1"
  stylize: 250
  aspect_ratio: "2:3"
  seed: "[int or 'unlocked']"
  sref: "[url or 'null: building']"
  cref: "[url or 'null: [reason]']"
```

### 5.2 Iteration Entry

```yaml
iteration:
  id: "[session_id]-[nn]"
  model_version: "[v6.1 — must match or override session system_lock]"
  seed: "[int]"
  variable_changed: "[layer and parameter name changed from previous iteration]"
  change_description: "[what changed, the specific new value, and why]"

  prompt:
    # Layer 1 — Basin Anchors
    subject_anchor: ""
    medium_anchor: ""
    sref: ""
    cref: ""
    # Layer 2 — Subject Specification
    subject_detail: ""
    action_or_state: ""
    # Layer 3 — Environment
    environment: ""
    time_of_day: ""           # value or "null: [reason]"
    weather_or_atmosphere: "" # value or "null: [reason]"
    # Layer 4 — Style Dimensions
    lighting_quality: ""
    lighting_direction: ""
    colour_palette: ""
    colour_temperature: ""
    era: ""                   # value or "null: timeless"
    mood_register: ""         # value or "delegated"
    # Layer 5 — Camera and Composition
    focal_length: ""
    depth_of_field: ""
    framing: ""
    composition_type: ""
    # Layer 6 — Model Delegation
    delegated_dimensions: []
    # Layer 7 — Exclusions
    no_tokens: []

  full_prompt_string: "[exact string submitted to MJ — verbatim]"

  result:
    output_url: ""
    selected_variant: ""      # A / B / C / D / none
    upscaled: false
    verdict: ""               # keep / discard / iterate
    basin_assessment: ""      # correct / drifted / wrong
    dimension_failures: []    # list of dimension names that did not match intent
    next_variable: ""         # required if verdict is "iterate" — which variable changes next
    notes: ""
```

### 5.3 Verdict Definitions

| Verdict | Meaning | Required follow-up |
|---|---|---|
| `keep` | Result matches intent. Promote to result set | Complete the result record (Section 6.3) |
| `discard` | Wrong basin or unfixable dimension failures | Document which dimensions failed and why |
| `iterate` | Result is in the correct basin but dimensions need adjustment | `next_variable` field must be filled |

`iterate` without a declared `next_variable` is an incomplete log entry.

---

## 6. Data Schema (v1 — Minimal)

Minimum schema to support future token performance analysis and database-backed guidance. v1 implementation: flat YAML or JSON files. Schema is designed for direct import into a relational database without restructuring.

### 6.1 Token Record

```yaml
token:
  value: "[token string, e.g. 'chiaroscuro']"
  dimension: "[lighting_quality | colour_palette | era | mood_register | ...]"
  first_used: "[ISO 8601]"
  usage_count: 0
  context:
    subject_types: []   # e.g. ['portrait', 'architecture'] — subject anchor categories this token appears with
    medium_types: []    # e.g. ['photography', 'oil painting']
  sessions: []          # [session_id, ...]
  outcomes:
    keep_count: 0
    discard_count: 0
    iterate_count: 0
  dimension_conflicts: []  # other tokens this one has conflicted with in multi-variable iterations
  notes: ""
```

Context fields are required for future performance analysis. A token's keep rate is only interpretable relative to the subject type and medium it was used with. Without `subject_types` and `medium_types`, aggregated outcome counts are unattributable.

### 6.2 Style Reference Record

```yaml
sref_record:
  id: "[sref_id]"
  url: "[url or MJ style seed integer]"
  source: "[origin — e.g. 'MJ explore', 'own generation', 'external reference']"
  first_used: "[ISO 8601]"
  observed_basin_pull: "[description of dominant visual effect this sref imposes]"
  compatible_subjects: []     # subject anchors this sref works with
  incompatible_subjects: []   # subject anchors where this sref causes conflict
  recommended_stylize_range: "[e.g. '200–400']"
  sessions: []                # [session_id, ...]
  notes: ""
```

### 6.3 Result Record

```yaml
result:
  id: "[result_id]"
  session_id: "[session_id]"
  iteration_id: "[iteration_id]"
  output_url: ""
  prompt_snapshot: {}         # full prompt block from iteration entry
  system_lock_snapshot: {}    # full system lock at time of generation
  quality_score: 0            # 1–5, manual assessment
  use_case: ""                # what this result is for
  tags: []
  promoted_to_library: false
```

---

## 7. v1 Scope Boundary

### Included in v1

| Component | State |
|---|---|
| Core conceptual model | Complete |
| Decision layers 0–7 with dimension state enforcement | Complete |
| Prompt template, token ordering, weighting rules | Complete |
| Prompt validation checklist | Complete |
| Iteration protocol with ordered perturbation | Complete |
| Session and iteration logging with attribution fields | Complete |
| Minimal data schema (token, sref, result records) | Complete |
| Flat-file YAML/JSON implementation | Sufficient |

### Explicitly Excluded from v1

| Component | Reason |
|---|---|
| Database backend | Not required until token record volume exceeds manual management |
| Automated token performance scoring | Requires ≥50 attributed iterations per token |
| Claude-to-Claude prompt reasoning | Requires structured token knowledge base as input |
| Cross-session basin drift detection | Requires indexed session database |
| Automated sref compatibility scoring | Requires quality-scored result dataset |
| Non-Midjourney tool support | Latent space geometry differs — requires separate spec |
| UI or tooling layer | Out of scope for v1 |

### Upgrade Triggers

Move to v2 when any of the following thresholds are met:

| Trigger | Threshold |
|---|---|
| Active sref references | > 10 |
| Concurrent projects using the system | > 5 |
| Unique token records | > 200 |
| Manual log review time per session | > 15 minutes |

---

## 8. System Integrity Rules

Non-negotiable. Violations produce unattributable results that cannot inform future decisions.

1. **No undocumented generations.** Every generation outside the logging format is lost data.
2. **One variable per iteration.** Multi-variable iterations must be discarded from the learning record.
3. **All Layer 0 parameters must be set before the first iteration.** A session without a locked stylize, seed, and model version is not a controlled experiment.
4. **--sref is not optional for style-consistent projects.** If style consistency is a goal and sref is not set, the goal cannot be met. Declare `null: building` and establish a sref before production use.
5. **Every unassigned dimension requires a declaration.** Undefined dimensions are errors, not defaults.
6. **Token redundancy is a defect.** A prompt with synonyms, quality amplifiers, or restated properties must be revised before execution.
7. **`iterate` verdicts require a declared next variable.** An incomplete verdict produces an incomplete iteration chain.

---

*Basin Navigation System v1.1 — Qolorlab*
*Classification: Internal Systems*
