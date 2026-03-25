# Basin Navigation System
## PROMPT_TEMPLATE — v1.0

---

## Token Ordering

Token order maps to attention weight. Basin anchors front-load. Dimensions refine within the activated basin. Parameter flags follow.

```
[subject_anchor] [medium_anchor], [subject_detail], [action_or_state], [environment],
[lighting_quality] [lighting_direction] light, [colour_palette] [colour_temperature],
[era], [mood_register], [focal_length], [depth_of_field], [framing], [composition_type]
--no [no_tokens]
--ar [ratio] --v [version] --stylize [value] --seed [value] --sref [url] --cref [url]
```

Ordering rules:
- Subject and medium must appear before all descriptive tokens
- Style dimensions (lighting, colour, era, mood) follow environment
- Camera and composition always trail style dimensions
- `--no` goes before all parameter flags
- All parameter flags (`--ar`, `--v`, `--stylize`, `--seed`, `--sref`, `--cref`) go last

---

## Weighting Syntax

Use `::N` only when two basin signals are present and one must dominate.

```
[subject_anchor]::[weight] [medium_anchor]::[weight]
```

| Weight | Effect |
|---|---|
| `::1` | Baseline — no change |
| `::2` | Moderate emphasis |
| `::3` | Strong emphasis |
| `::0.5` | Reduced weight — may cause basin drift, use with caution |

Rules:
- Apply weighting only to Layer 1A anchor tokens
- Never weight mood, colour, or era tokens — they are ambient, not structural
- Do not use weighting when only one anchor is present

---

## Filled Example

Prompt:
```
portrait of a woman oil painting, early 30s sharp expression, seated, interior brick wall,
soft diffused side-lit light, desaturated warm palette neutral, 1970s, melancholic,
85mm portrait, shallow depth of field, close-up, centered
--no painterly brush strokes, visible canvas texture
--ar 2:3 --v 6.1 --stylize 250 --seed 4829103 --sref https://[url]
```

Null and delegation record for this prompt:
```yaml
time_of_day: "null: interior, lighting controlled via lighting_quality"
weather_or_atmosphere: "null: interior scene, not applicable"
cref: "null: no character consistency required"
delegated_dimensions: []
```

---

## Validation Checklist

Run before every execution. A prompt with any unchecked item must be revised before submission.

- [ ] Subject and medium are the first tokens, written as a combined phrase
- [ ] No dimension has more than one token assigned
- [ ] No quality amplifiers present (`stunning`, `beautiful`, `ultra-detailed`, `masterpiece`)
- [ ] `--sref` is set, or `null: building` is declared in the prompt record
- [ ] `--seed` is set
- [ ] `--stylize` value is intentional — not left at default without a decision
- [ ] Every `--no` token has a corresponding positive specification in the prompt body
- [ ] Every unassigned dimension is either `null` (declared with reason) or `delegated` (listed in Layer 6)
- [ ] Aspect ratio is consistent with the intended framing and composition type

---

*Basin Navigation System v1.0 — Qolorlab / Internal Systems*
