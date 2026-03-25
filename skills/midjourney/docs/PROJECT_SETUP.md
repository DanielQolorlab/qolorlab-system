# Basin Navigation System
## PROJECT_SETUP — v1.0

---

## Folder Structure

Two locations. One is shared system infrastructure. One is per-project.

### System (shared, do not copy per project)

```
skills/midjourney/
  docs/                       ← spec — read-only reference
    SYSTEM_OVERVIEW.md
    DECISION_LAYERS.md
    PROMPT_TEMPLATE.md
    ITERATION_AND_LOGGING.md
    DATA_SCHEMA.md
    V1_SCOPE.md
    PROJECT_SETUP.md
  templates/                  ← blank YAML templates — copy per use
    project.yaml
    session.yaml
    iteration.yaml
    result.yaml
    token.yaml
    sref.yaml
```

### Project (one instance per project)

```
[project-name]/
  prompt-system/
    project.yaml              ← system lock + basin anchors for this project
    sessions/                 ← one .yaml file per session
    results/                  ← one .yaml file per promoted result
    registry/
      tokens.yaml             ← cumulative token registry for this project
      srefs.yaml              ← cumulative sref registry for this project
```

The `prompt-system/` subfolder lives inside whatever project folder structure already exists. It makes no assumptions about what surrounds it.

---

## Files and Their Purpose

### System-level (in `skills/midjourney/`)

| File | Purpose |
|---|---|
| `docs/` | The system specification. Read before using. Do not modify during active projects |
| `templates/project.yaml` | Blank project config. Copy to `[project]/prompt-system/project.yaml` and fill in once per project |
| `templates/session.yaml` | Blank session header. Copy to `sessions/` and fill in at the start of each session |
| `templates/iteration.yaml` | Blank iteration entry. Append to the active session file for each generation |
| `templates/result.yaml` | Blank result record. Copy to `results/` when an iteration verdict is `keep` |
| `templates/token.yaml` | Blank token record. Append to `registry/tokens.yaml` when a new token enters the project |
| `templates/sref.yaml` | Blank sref record. Append to `registry/srefs.yaml` when a new sref enters the project |

### Project-level (in `[project]/prompt-system/`)

| File | Purpose |
|---|---|
| `project.yaml` | Holds the Layer 0 system lock and Layer 1 basin anchors. This is the stable identity of the project's visual system |
| `sessions/[date]-[id].yaml` | One file per working session. Contains the session header followed by all iteration entries from that session |
| `results/[result-id].yaml` | One file per promoted result. Contains the result record with full prompt and system lock snapshots |
| `registry/tokens.yaml` | Accumulates all token records for this project across sessions |
| `registry/srefs.yaml` | Accumulates all sref records for this project |

---

## What Stays in `skills/` vs What Lives in the Project

| Item | Location | Reason |
|---|---|---|
| All six spec docs | `skills/midjourney/docs/` | System-level reference. Shared across all projects. Not copied |
| All six templates | `skills/midjourney/templates/` | Reusable blanks. Never edited in place — always copied |
| `project.yaml` (filled) | `[project]/prompt-system/` | Project-specific. One instance per project |
| Session files | `[project]/prompt-system/sessions/` | Project-specific. Generated during use |
| Result files | `[project]/prompt-system/results/` | Project-specific. Promoted outputs only |
| Token registry | `[project]/prompt-system/registry/` | Project-specific. Builds up over sessions |
| Sref registry | `[project]/prompt-system/registry/` | Project-specific. Builds up over sessions |

The docs are never copied into a project. Reference them from `skills/`. If the spec is updated, all projects benefit automatically.

---

## First User Flow

### Step 1 — Read the spec (once)

Read in this order before the first session:

1. `SYSTEM_OVERVIEW.md` — understand what the system is and its core model
2. `DECISION_LAYERS.md` — understand all required inputs
3. `PROMPT_TEMPLATE.md` — understand how a prompt is assembled
4. `ITERATION_AND_LOGGING.md` — understand how to run and record a session

`DATA_SCHEMA.md` and `V1_SCOPE.md` can be read after the first session.

---

### Step 2 — Set up the project (once per project)

1. Create `[project-name]/prompt-system/` with `sessions/`, `results/`, and `registry/` subfolders
2. Copy `templates/project.yaml` → `prompt-system/project.yaml`
3. Fill in `project.yaml`:
   - Layer 0: model version, aspect ratio, stylize, seed
   - Layer 1A: subject anchor, medium anchor
   - Layer 1B: sref (or declare `null: building`)
   - Layer 1C: cref (or declare `null: [reason]`)
4. Copy `templates/sref.yaml` → `registry/srefs.yaml` if sref is already defined. Fill in what is known.

`project.yaml` is the project's system lock. It should not change between sessions unless a Layer 0 parameter test is underway.

---

### Step 3 — Start a session

1. Copy `templates/session.yaml` → `sessions/[YYYY-MM-DD]-[nn].yaml`
2. Fill in the session header: session ID, date, project name, goal (one sentence)
3. Confirm the system lock matches `project.yaml` — or note any intentional overrides

---

### Step 4 — Run an iteration

For each generation:

1. Copy `templates/iteration.yaml` and append it to the active session file
2. Fill in every layer field — no field left blank without a `null: [reason]` or `delegated` declaration
3. Run the validation checklist in `PROMPT_TEMPLATE.md`
4. Submit the prompt to Midjourney verbatim from `full_prompt_string`
5. Record the result: output URL, variant, verdict, basin assessment, dimension failures

If verdict is `iterate`: fill in `next_variable` before closing the entry.

---

### Step 5 — Promote a result

When verdict is `keep`:

1. Copy `templates/result.yaml` → `results/[result-id].yaml`
2. Copy the full `prompt` block from the iteration entry into `prompt_snapshot`
3. Copy the session `system_lock` block into `system_lock_snapshot`
4. Fill in quality score, use case, tags

---

### Step 6 — Update the registry (end of session)

1. For each new token used in the session: append a filled `templates/token.yaml` entry to `registry/tokens.yaml`
2. For each new sref encountered: append a filled `templates/sref.yaml` entry to `registry/srefs.yaml`
3. For existing tokens and srefs: increment counts and update outcomes

---

*Basin Navigation System v1.0 — Qolorlab / Internal Systems*
