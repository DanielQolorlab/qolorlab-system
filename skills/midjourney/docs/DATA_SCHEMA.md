# Basin Navigation System
## DATA_SCHEMA — v1.0

---

## Overview

This schema captures the minimum required to support future token performance analysis and database-backed guidance.

v1 implementation: flat YAML or JSON files, one record per file or batched by session.

The schema is designed for direct import into a relational database without restructuring when v2 is reached.

Three record types:
1. **Token Record** — tracks individual token performance across sessions
2. **Style Reference Record** — tracks sref sources and their observed basin effects
3. **Result Record** — canonical promoted outputs

---

## Token Record

Tracks individual token performance across sessions. One file per token, or tokens batched into a single registry.

```yaml
token:
  value: "[token string, e.g. 'chiaroscuro']"
  dimension: "[lighting_quality | colour_palette | era | mood_register | lighting_direction | focal_length | composition_type | framing | environment | medium]"
  first_used: "[ISO 8601]"
  usage_count: 0
  context:
    subject_types: []   # subject anchor categories this token appears with, e.g. ['portrait', 'architecture']
    medium_types: []    # medium anchor types this token appears with, e.g. ['photography', 'oil painting']
  sessions: []          # [session_id, ...]
  outcomes:
    keep_count: 0
    discard_count: 0
    iterate_count: 0
  dimension_conflicts: []  # other tokens this one has produced conflicts with in multi-variable iterations
  notes: ""
```

**Context fields are required, not optional.** A token's keep/discard rate is uninterpretable without the subject and medium context it was used in. `chiaroscuro` at 60% keep means nothing without knowing it only appeared in photography contexts.

---

## Style Reference Record

Tracks sref sources and their observed effects on basin output. One record per sref in active rotation.

```yaml
sref_record:
  id: "[sref_id]"
  url: "[url or MJ style seed integer]"
  source: "[origin — e.g. 'MJ explore', 'own generation', 'external reference']"
  first_used: "[ISO 8601]"
  observed_basin_pull: "[description of the dominant visual effect this sref imposes on output]"
  compatible_subjects: []     # subject anchors this sref works with
  incompatible_subjects: []   # subject anchors where this sref causes conflict or noise
  recommended_stylize_range: "[e.g. '200–400']"
  sessions: []                # [session_id, ...]
  notes: ""
```

---

## Result Record

Canonical record for promoted outputs. Created when an iteration verdict is `keep`.

```yaml
result:
  id: "[result_id]"
  session_id: "[session_id]"
  iteration_id: "[session_id]-[nn]"
  output_url: ""
  prompt_snapshot: {}         # full prompt block from the iteration entry — verbatim
  system_lock_snapshot: {}    # full system lock at time of generation — verbatim
  quality_score: 0            # 1–5, manual assessment
  use_case: ""                # what this result is for
  tags: []
  promoted_to_library: false
```

`prompt_snapshot` and `system_lock_snapshot` must be copied verbatim from the iteration log. They are the reproducibility record for that result.

---

*Basin Navigation System v1.0 — Qolorlab / Internal Systems*
