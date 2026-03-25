# Basin Navigation System
## V1_SCOPE — v1.0

---

## Included in v1

| Component | State |
|---|---|
| Core conceptual model (latent space, basins, dimension state) | Complete |
| Decision layers 0–7 with dimension state enforcement | Complete |
| Prompt template, token ordering, weighting rules | Complete |
| Prompt validation checklist | Complete |
| Iteration protocol with ordered perturbation | Complete |
| Session and iteration logging with full attribution fields | Complete |
| Minimal data schema (token, sref, result records) | Complete |
| Flat-file YAML/JSON implementation | Sufficient |

---

## Explicitly Excluded from v1

| Component | Reason |
|---|---|
| Database backend | Not required until token record volume exceeds manual management |
| Automated token performance scoring | Requires ≥50 attributed iterations per token |
| Claude-to-Claude prompt reasoning | Requires structured token knowledge base as input |
| Cross-session basin drift detection | Requires indexed session database |
| Automated sref compatibility scoring | Requires quality-scored result dataset |
| Non-Midjourney tool adapters | Latent space geometry differs per tool — requires a separate adapter spec for each |
| UI or tooling layer | Out of scope for v1 |
| API design | Out of scope for v1 |
| Execution architecture | Out of scope for v1 |

---

## Future Adapter Model

This system is designed to support additional image generation tools. The conceptual model (basins, dimensions, dimension state, iteration protocol, logging format) is tool-agnostic.

Adding a new tool requires:
1. A separate adapter spec defining how that tool's parameters map to the decision layers
2. A tool-specific parameter table for Layer 0 (System Lock)
3. A tool-specific note on which dimensions the tool controls reliably vs. unreliably

The core documents (SYSTEM_OVERVIEW, DECISION_LAYERS, ITERATION_AND_LOGGING, DATA_SCHEMA) do not change when a new tool is added.

---

## Upgrade Triggers

Move to v2 when any of the following thresholds are met:

| Trigger | Threshold |
|---|---|
| Active sref references in rotation | > 10 |
| Concurrent projects using the system | > 5 |
| Unique token records | > 200 |
| Manual log review time per session | > 15 minutes |

---

## Document Index

| File | Contents |
|---|---|
| `SYSTEM_OVERVIEW.md` | Conceptual model, control stack, system integrity rules |
| `DECISION_LAYERS.md` | Layers 0–7 with all required fields |
| `PROMPT_TEMPLATE.md` | Token ordering, weighting syntax, filled example, validation checklist |
| `ITERATION_AND_LOGGING.md` | Iteration protocol, seed and stylize behaviour, session and iteration log formats |
| `DATA_SCHEMA.md` | Token record, style reference record, result record |
| `V1_SCOPE.md` | This file |

---

*Basin Navigation System v1.0 — Qolorlab / Internal Systems*
