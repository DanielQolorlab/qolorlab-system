# Basin Navigation System
## ITERATION_AND_LOGGING — v1.0

---

## Iteration Protocol

### Perturbation Principle

One variable changes per iteration. All other parameters are held constant. This is the only valid method for attributing observed changes to a specific input.

Multi-variable iterations produce unattributable results. Results from multi-variable iterations must be discarded from the learning record.

---

### Iteration Order

When results are not correct, iterate in this order. Do not skip layers.

1. **Basin (Layer 1A)** — If the result is in the wrong content basin, change subject or medium anchor first. No other change is useful until the basin is correct.
2. **Stylize (Layer 0)** — If the prompt is being overridden by the model's aesthetics, adjust `--stylize` down. If the result is too literal, adjust up.
3. **sref (Layer 1B)** — If the visual DNA is wrong and stylize is already calibrated, change or establish the sref.
4. **Individual style dimensions (Layer 4)** — One at a time. Order: lighting → colour → era → mood.
5. **Camera and composition (Layer 5)** — One at a time, after style dimensions are stable.
6. **Weighting** — Only after individual dimensions are tested.
7. **Exclusions (Layer 7)** — Only after positive specification is insufficient on its own.

---

### Seed Behaviour

| Operation | Seed state |
|---|---|
| Lock a found composition | Set `--seed` to the value that produced it |
| Test style variants on a fixed composition | Hold seed, change `--sref` |
| Explore new compositions | Remove `--seed` |
| Reproduce a previous result exactly | Seed is necessary but not sufficient — full system lock required |

A seed locks the composition noise floor (local minima), not the style. A changed prompt with a fixed seed will still shift output. Seed stability is highest when the prompt body is unchanged.

---

### Stylize Behaviour

| Range | Behaviour |
|---|---|
| `0` | Literal prompt fidelity. Low model aesthetic contribution |
| `100` | MJ default. Light model expression |
| `200–400` | Recommended range for dimension-controlled work |
| `500–700` | Strong model aesthetic expression. Use when sref is primary and prompt is a guide only |
| `800–1000` | Maximum model autonomy. Prompt is directional, not prescriptive |

When `--sref` is the primary style authority, higher stylize values reinforce it.
When the prompt is the primary style authority, lower stylize values reinforce it.

---

## Logging Format

Every generation set must produce a log entry. Results without log entries are not part of the system.

---

### Session Header

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

---

### Iteration Entry

```yaml
iteration:
  id: "[session_id]-[nn]"
  model_version: "[must match or explicitly override session system_lock.model_version]"
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

  full_prompt_string: "[exact string submitted — verbatim]"

  result:
    output_url: ""
    selected_variant: ""      # A / B / C / D / none
    upscaled: false
    verdict: ""               # keep / discard / iterate
    basin_assessment: ""      # correct / drifted / wrong
    dimension_failures: []    # list of dimension names that did not match intent
    next_variable: ""         # required if verdict is "iterate"
    notes: ""
```

---

### Verdict Definitions

| Verdict | Meaning | Required follow-up |
|---|---|---|
| `keep` | Result matches intent. Promote to result set | Complete the result record in DATA_SCHEMA |
| `discard` | Wrong basin or unfixable dimension failures | Document which dimensions failed and why in `dimension_failures` |
| `iterate` | Correct basin, dimensions need adjustment | `next_variable` must be filled — an empty field is an incomplete entry |

---

*Basin Navigation System v1.0 — Qolorlab / Internal Systems*
