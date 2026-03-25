# SYSTEM RULES — Qolorlab

## Scope

### Figma
- Only work in this file:
  https://www.figma.com/design/dIbH9dQkVuueRGaQro5GeG/Qolorlab-Design-System-2.0
- Allowed pages:
  - 01_FOUNDATIONS
  - 02_COMPONENTS
  - 04_SYSTEM_OVERVIEW
- Do NOT modify:
  - 00_MOODBOARD
  - 03_EXPERIMENTAL (unless explicitly asked)

### Code
- Only modify files inside the current project folder
- Do NOT create parallel systems outside existing structure

---

## Source of Truth

- Code = canonical system (tokens, rules, structure)
- Figma = visual representation and controlled editing layer

---

## Component Domains

Use naming structure:

QOLORLAB / [DOMAIN] / [TYPE] / [VARIANT] / [STATE]

Domains:
- SHARED → usable across app + motion
- UI → app/web only
- MOTION → video/remotion only

---

## Locking System

Component states:

- [SYS] → system-critical (never modify unless explicitly forced)
- [LOCK] → do not modify
- [REV] → propose changes only
- [EDIT] → free to modify

Rules:
- Never modify [SYS] or [LOCK]
- Never unlock without explicit instruction
- If locked, ask before proceeding

---

## Figma Rules

- Always use existing styles
- Do NOT create new styles unless explicitly asked
- Do NOT use raw values if styles exist
- Always place components on correct page:
  - Components → 02_COMPONENTS
  - System overview → 04_SYSTEM_OVERVIEW

---

## Generation Rules

- Prefer modifying or extending existing components
- Keep layouts minimal and structured
- Follow brand principles:
  - dark UI
  - minimal
  - controlled red (#FD0611)
  - thin strokes
  - subtle glow

---

## Safety Rules

- If unsure → ask before acting
- Do not overwrite existing work without instruction
- Do not restructure files or pages without instruction

---

## Behavior

- You may execute edits without confirmation
- But MUST follow all rules above strictly
