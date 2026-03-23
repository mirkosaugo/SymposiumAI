---
name: architecture-scalability
description: Always use shared utils/hooks/components and keep the app well-organized architecturally when creating new components
type: feedback
---

When creating new components, always reuse and extend the existing shared architecture:

**Why:** The user wants a scalable, well-organized codebase. No duplicated patterns — extract shared logic.

**How to apply:**
- `src/config/constants.ts` — shared constants (NODE_COLORS, GLASS_CONTAINER_CLASS, ICON_BTN_CLASS, DEFAULT_EDGE_STYLE, SNAP_GRID)
- `src/lib/node-style.ts` — node style utilities (getCardStyle, getRunStyle, tintBg, getBestHandle)
- `src/hooks/use-node-data.ts` — type-safe hook for accessing/updating node data
- `src/components/canvas/node-header.tsx` — shared node header with icon + label
- `src/components/canvas/node-handles.tsx` — shared handles for all node types
- `src/components/canvas/node-actions.tsx` — shared toolbar (connect, edit, delete)
- `src/components/canvas/editable-field.tsx` — reusable inline editable text/textarea

When adding a new node type: compose from NodeHandles + NodeActions + NodeHeader + EditableField + getCardStyle/getRunStyle. When adding a new UI overlay: use GLASS_CONTAINER_CLASS + ICON_BTN_CLASS.
