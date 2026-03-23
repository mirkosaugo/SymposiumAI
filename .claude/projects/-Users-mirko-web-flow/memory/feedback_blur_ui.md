---
name: blur-effect-all-ui-elements
description: All app UI overlays (toolbar, prompt bar, status bar, panels) must use backdrop-blur glassmorphism — canvas nodes are exempt
type: feedback
---

All app-level UI elements (prompt bar, toolbars, status bar, panels, menus) must have the glassmorphic backdrop-blur effect. Canvas node components are exempt — they have their own style.

**Why:** The user wants a consistent glassmorphic design system across all overlay UI. Only the top-left menu had it initially; the rest were inconsistent.

**How to apply:** When creating or modifying any app overlay element (not canvas nodes), always use `bg-popover/80 border border-border/15 backdrop-blur-3xl shadow-[0_0_15px_0_rgb(0_0_0/0.25)]`. The key is `bg-popover/80` (80% opacity) — using `bg-card` looks solid because the card color is nearly identical to the background in dark mode.
