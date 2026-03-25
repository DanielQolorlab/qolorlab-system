# Pack: Full Template Development

**Use this when:** building a complete Remotion template or composition from scratch — anything that combines brand, motion, and visual primitives.

Combine with `PACK_BRAND.md` and `PACK_MOTION.md` for the full rules.

---

## Standard import block

```tsx
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Scene, SafeArea, Text, Q, CONFIG, px } from "@qolorlab/brand";
import { fadeIn, riseIn, scaleIn } from "@qolorlab/motion";
```

Add as needed:
```tsx
import { Node, FlowArrow, layoutGraph } from "@qolorlab/primitives";   // diagrams
import { easePose, type Pose3D, crossfade } from "@qolorlab/motion";   // 3D / transitions
```

---

## Template skeleton

```tsx
type Props = { title: string; subtitle?: string };

export const MyCard: React.FC<Props> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = fadeIn(frame, 0, 0.67, fps, "spring", "smooth");
  const y       = riseIn(frame, 0, 0.67, px(32), fps, "spring", "smooth");

  return (
    <Scene>
      <SafeArea style={{ justifyContent: "center" }}>
        <div style={{ opacity, transform: `translateY(${y}px)`, maxWidth: CONFIG.safe.maxTextWidth }}>
          <Text kind="h1">{title}</Text>
          {subtitle && <div style={{ marginTop: px(18) }}><Text kind="h3">{subtitle}</Text></div>}
        </div>
      </SafeArea>
    </Scene>
  );
};
```

---

## Registering a template

Add an entry to `src/templates/registry.ts`:
```ts
{
  meta: {
    id: "MyCard",
    name: "My Card",
    description: "...",
    defaultDurationInFrames: 150,
  },
  component: MyCard,
  defaultProps: { title: "Default Title" },
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
  }),
}
```

The composition will be auto-registered in Root.jsx — no manual `<Composition>` entries needed.

---

## SVG diagram pattern (primitives)

```tsx
const layout = layoutGraph(nodes, edges);   // nodes: LayoutNodeDef[], edges: LayoutEdgeDef[]

<svg width={layout.totalWidth} height={layout.totalHeight} style={{ overflow: "visible" }}>
  {layout.edges.map((edge, i) => (
    <FlowArrow
      x1={edge.fromNode.x + edge.fromNode.width} y1={edge.fromNode.y + edge.fromNode.height / 2}
      x2={edge.toNode.x}                          y2={edge.toNode.y  + edge.toNode.height  / 2}
      startFrame={nodes.length * 6 + i * 5} durationFrames={18}
      active={edge.active}
    />
  ))}
  {layout.nodes.map((node, i) => (
    <Node key={node.id} {...node} startFrame={i * 6} durationFrames={15} />
  ))}
</svg>
```

---

## Composition timing reference

```
Default fps:     30
Default duration: 150 frames (5s)
Enter ramp:      ~20 frames (structural preset)
Exit ramp:       ~15 frames (structural preset)
Crossfade:       12–15 frames between adjacent scenes
Stagger step:    6–8 frames per element
```

---

## Project-local files (keep relative imports)

These files are project-specific — import them with relative paths, not package names:

| File | Import |
|---|---|
| `src/templates/registry.ts` | `"../templates/registry"` |
| `src/system/renderPlan.ts` | `"../system/renderPlan"` |
| `src/system/timeline.ts` | `"../system/timeline"` |
| `src/system/Stage3D.tsx` | `"../system/Stage3D"` |
| `src/primitives3d/Phone.tsx` | `"../primitives3d/Phone"` |
| `src/compositions/systemQualify.beats.ts` | relative |

---

## AI assistant instructions

- All new templates go in `src/components/`. File name = component name.
- All pixel values: `px(n)` from `@qolorlab/brand`
- All colors: `Q.color.*` from `@qolorlab/brand`
- All animation: `fadeIn / riseIn / scaleIn` from `@qolorlab/motion`, with `fps` from `useVideoConfig()`
- All layout: `<Scene>` + `<SafeArea>` root from `@qolorlab/brand`
- Diagrams: `layoutGraph` + `Node` + `FlowArrow` from `@qolorlab/primitives`
- After adding a template, register it in `src/templates/registry.ts`
- Do not create standalone `<Composition>` entries — the registry handles registration
- Brand identity: structured, architectural, minimal. No bounce, no neon, no chaos
