# Basin Navigation System
## DECISION_LAYERS — v1.0

---

## How Layers Work

Layers are completed in order. A later layer cannot compensate for an undefined earlier layer.

Every field is required. Fields with no relevant value require a `null` entry with a stated reason. Fields explicitly handed to the model require a `delegated` entry in Layer 6.

---

## Layer 0: System Lock

Set once per project. Held constant across all iterations unless a parameter-level variable test is underway. A change to any Layer 0 parameter resets the iteration sequence.

| Parameter | Required | Notes |
|---|---|---|
| `model_version` | Yes | `--v 6.1` is current stable. Basin behaviour differs significantly between versions |
| `aspect_ratio` | Yes | `--ar 16:9`, `1:1`, `2:3`, `3:4`, etc. Affects composition basin |
| `stylize` | Yes | `0` = prompt-literal. `1000` = maximum model autonomy. Must be set intentionally |
| `seed` | Yes | Required for reproducibility. Generate randomly, then lock. `--seed [int]` |

---

## Layer 1: Basin Anchors

Defines which regions of latent space are activated. These are the highest-weight tokens in the system. All three sub-layers must be completed before proceeding.

### 1A — Content Basin

| Slot | Required | Notes |
|---|---|---|
| `subject_anchor` | Yes | `portrait of a woman`, `abandoned factory`, `glass of water` |
| `medium_anchor` | Yes | `oil painting`, `35mm photograph`, `pencil sketch`, `3D render` |

Rules:
- Subject and medium are written as a combined phrase: `[subject] [medium]`
- The phrase must appear at the start of the prompt — before all other tokens
- Medium must name a specific material or photographic process. `art`, `image`, and `picture` are invalid
- One medium per prompt. Conflicting medium signals are prohibited

### 1B — Style Basin

| Slot | Required | Notes |
|---|---|---|
| `sref` | Yes | URL or MJ style seed. Primary visual DNA anchor. If no sref exists yet, declare `null: building` and establish one before production use |

Rules:
- When `--sref` is active, style dimension tokens in the prompt (era, colour, mood) carry reduced weight. Reduce them or delegate them in Layer 6
- `--sref` is not decoration — it is the primary mechanism for visual consistency across images
- A project without a locked sref cannot produce a consistent visual system

### 1C — Character Anchor

| Slot | Required | Notes |
|---|---|---|
| `cref` | Yes | URL. Required if the same character identity must be consistent across generations. If not applicable: `null: no character consistency required` |

---

## Layer 2: Subject Specification

Precise description of what exists in the frame. Fills in the subject anchor with detail. No metaphors, no emotional language, no abstract terms.

| Slot | Required | Notes |
|---|---|---|
| `subject_detail` | Yes | Physical properties only: age, material, clothing, surface state, expression, posture |
| `action_or_state` | Yes | What the subject is doing or its physical state: `standing`, `crumbling`, `lit from within`, `in motion` |

Rules:
- Describe what is physically visible in the image only
- Do not restate properties already present in the subject_anchor

---

## Layer 3: Environment

Defines the spatial context of the subject. All fields require a value or an explicit null declaration.

| Slot | Required | Notes |
|---|---|---|
| `environment` | Yes | `interior`, `exterior urban`, `exterior natural`, `abstract void`, `studio` |
| `time_of_day` | Yes | Assign a value, or `null: lighting controlled independently via lighting_quality` |
| `weather_or_atmosphere` | Yes | Assign a value, or `null: not visible in frame` |

---

## Layer 4: Style Dimensions

Each slot accepts exactly one term. A phrase is not valid here. Assign one term or declare null/delegated.

| Slot | Required | Valid form |
|---|---|---|
| `lighting_quality` | Yes | Single term: `soft diffused`, `hard`, `chiaroscuro`, `overexposed`, `neon backlit` |
| `lighting_direction` | Yes | Single term: `top-down`, `front-lit`, `side-lit`, `backlit`, `under-lit` |
| `colour_palette` | Yes | Single term: `desaturated`, `monochrome`, `warm amber`, `cool teal`, `high contrast BW` |
| `colour_temperature` | Yes | One of: `warm`, `neutral`, `cold` |
| `era` | Yes | Single term: `1970s`, `Victorian`, `contemporary`, `futuristic`. If no era target: `null: timeless` |
| `mood_register` | Yes | One word only: `melancholic`, `clinical`, `tense`, `serene`, `aggressive`. If sref is authoritative for mood: `delegated` |

Rules:
- If `--sref` is active and style-authoritative, colour and mood may be declared `delegated`
- Lighting must always be assigned — sref does not reliably control lighting geometry

---

## Layer 5: Camera and Composition

| Slot | Required | Notes |
|---|---|---|
| `focal_length` | Yes | `wide angle`, `35mm`, `85mm portrait`, `macro`, `telephoto` |
| `depth_of_field` | Yes | `shallow`, `deep`, `fully sharp` |
| `composition_type` | Yes | `rule of thirds`, `centered`, `symmetrical`, `diagonal`, `negative space` |
| `framing` | Yes | `full body`, `medium shot`, `close-up`, `extreme close-up`, `aerial` |

---

## Layer 6: Model Delegation

Explicit declaration of which dimensions have been handed to the model. A dimension listed here must not have a token assigned in the prompt. All other dimensions must be assigned or null.

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

## Layer 7: Exclusions

| Parameter | Required | Notes |
|---|---|---|
| `no_tokens` | Yes | List of tokens to suppress. If nothing to exclude: `no_tokens: []` |

Rules:
- `--no` is a weak exclusion — it reduces probability, does not eliminate
- Every token in `no_tokens` must have a corresponding positive specification already present in the prompt body
- Maximum 3–4 exclusion tokens. Beyond this, the positive specification is insufficient
- `--no` is not a substitute for strong positive anchoring

---

*Basin Navigation System v1.0 — Qolorlab / Internal Systems*
