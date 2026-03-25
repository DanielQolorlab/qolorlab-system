# Pack: Remotion Motion System

**Use this when:** animating element entrances/exits, sequencing beats, working with spring physics, 3D pose interpolation, or building timeline-driven compositions.

---

## What to import

```ts
import { fadeIn, riseIn, scaleIn } from "@qolorlab/motion";          // 2D animation primitives
import { easePose, type Pose3D } from "@qolorlab/motion";            // 3D pose interpolation
import { crossfade, slideX, TransitionSequence } from "@qolorlab/motion"; // scene transitions
import { makeTimeline, progressEnter, progressExit } from "@qolorlab/motion"; // orchestrator
import { type Beat, validateBeats, totalBeatsFrames } from "@qolorlab/motion"; // beats DSL
import { MOTION_PRESETS, type MotionPresetName } from "@qolorlab/motion"; // preset tokens
```

All exports are available from the single `@qolorlab/motion` entry point.

---

## Core animation pattern

Always read `fps` from Remotion — never hardcode it.

```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const opacity = fadeIn(frame, 0, 0.67, fps);
const y       = riseIn(frame, 0, 0.67, px(40), fps);
const s       = scaleIn(frame, 0, 0.67, fps);
```

**Spring mode** — pass `"spring"` and a preset for a physics-driven feel:
```ts
fadeIn(frame, 0, 0.67, fps, "spring", "smooth")
// presets: "smooth" (default) | "snappy" | "soft"
```

---

## Stagger pattern

Use `startFrame` offset to stagger elements:
```ts
fadeIn(frame, i * 6, 0.5, fps)   // each element starts 6 frames after the previous
```

---

## Motion presets

Three named presets govern timing across templates:
```
calm        slow, ambient — for background elements
structural  default — measured, architectural
hero        slightly faster — for key reveal moments
```

Use `MOTION_PRESETS["structural"]` to read frame durations, stagger gaps, and overlap frames. Do not hardcode these numbers.

---

## Orchestrator (enter/exit timeline)

For elements with both enter and exit animations:
```ts
const tl = makeTimeline({ startFrame: 0, durationFrames: 90, preset: "structural" });
const enterP = progressEnter(frame, tl, "structural"); // 0→1
const exitP  = progressExit(frame, tl, "structural");  // 1→0
```

---

## 3D pose interpolation

```ts
const FROM: Pose3D = { position: [4, 0, 0], rotation: [0, -0.5, 0], scale: 0.8 };
const TO:   Pose3D = { position: [0, 0, 0], rotation: [0,  0,   0], scale: 1.0 };

const pose = easePose(frame, 0, 30, FROM, TO, "smooth");
// pass pose.position, pose.rotation, pose.scale to <group> in R3F
```

---

## Beats DSL

A `Beat` is one scene unit for the AI → video pipeline:
```ts
const beats: Beat[] = validateBeats([
  { templateId: "TitleCard", durationFrames: 120, motionPreset: "structural", props: { title: "..." } },
  { templateId: "PromptCard", durationFrames: 150, transition: { type: "crossfade", durationFrames: 12 }, props: { ... } },
]);
```

Pass the array to `<BeatsPlayer beats={beats} />`.

---

## What NOT to do

- Do not import from `../system/motion`, `../system/ease`, `../system/transitions`, etc. — those files no longer exist
- Do not hardcode `fps = 30` — always read from `useVideoConfig()`
- Do not use elastic or bouncy spring configs — all presets are overdamped (zero bounce)
- Do not mix raw `interpolate` calls with `fadeIn`/`riseIn` for the same element

---

## AI assistant instructions

- Always import motion utilities from `@qolorlab/motion`
- Always destructure `fps` from `useVideoConfig()` and pass it to motion functions
- Use `"spring"` mode with `"smooth"` preset for organic-feeling entrances; `"ease"` for quick deterministic ones
- Motion identity: calm, intentional, architectural. No bounces, no elastic overshoots
- Default duration is `0.67` seconds (20 frames at 30fps). Do not go shorter than `0.4s` without a reason
- When building staggered lists, increment `startFrame` by 6–8 frames per item
