# Pack: Qolorlab Brand

**Use this when:** working on visual design — colors, typography, backgrounds, layout containers, or any file that renders pixels.

---

## What to import

```ts
import { Q, CONFIG, px } from "@qolorlab/brand";        // tokens + scale
import { Scene, SafeArea } from "@qolorlab/brand";       // layout wrappers
import { Text } from "@qolorlab/brand";                  // typography
```

All exports are available from the single `@qolorlab/brand` entry point.

---

## Key rules

**Colors** — always use `Q.color.*`. Never hardcode hex values.
```
Q.color.black2    background (primary)
Q.color.black1    surfaces, cards
Q.color.white     primary text
Q.color.gray1     secondary text
Q.color.gray2     muted / captions
Q.color.gray3–5   borders, dividers, fills
Q.color.red       accent only — thin usage, never fills
```

**Pixels** — always call `px(n)` where `n` is the 1080p value. Never multiply by `CONFIG.scale` yourself.
```ts
px(24)      // → 24 at HD, 48 at UHD
```

**Typography** — use `<Text kind="...">` for all text. Available kinds: `h1 h2 h3 body label`.

**Layout** — wrap every composition in `<Scene>` and content in `<SafeArea>`. Never hand-roll padding.
```tsx
<Scene variant="dark">          // "dark" | "transparent" | "glow"
  <SafeArea style={{ justifyContent: "center" }}>
    <Text kind="h1">Headline</Text>
  </SafeArea>
</Scene>
```

**Font** — `Q.font.family.display` for headings, `Q.font.family.text` for body, `Q.font.family.mono` for code/prompt UI.

**Stroke widths** — `Q.stroke.hairline` (thinnest), `Q.stroke.thin`, `Q.stroke.base`.

**Radius** — `Q.radius.sm`, `Q.radius.md`, `Q.radius.lg`.

---

## What NOT to do

- Do not import from `../system/tokens`, `../system/config`, `../system/scene`, or `../system/Text` — those files no longer exist
- Do not use bright colors, gradients, or loud backgrounds
- Do not hardcode `1920`, `1080`, or pixel values without `px()`
- Do not use `CONFIG.scale` directly — use `px()` instead

---

## AI assistant instructions

- Always import brand tokens from `@qolorlab/brand`
- All colors must come from `Q.color.*`
- All pixel values must go through `px()`
- Use `<Scene>` + `<SafeArea>` as the layout root — never `<AbsoluteFill>` with manual padding
- Brand identity is: structured, architectural, minimal. No playful, neon, or chaotic elements
- When in doubt about a color, default to `Q.color.gray1` for text, `Q.color.black1` for surfaces
