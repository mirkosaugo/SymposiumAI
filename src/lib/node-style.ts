import type { CSSProperties } from "react";

/**
 * Darken a hex color by mixing it toward black.
 * amount = 0 → original, amount = 1 → black.
 */
export function darkenColor(hex: string, amount = 0.35): string {
  const h = hex.replace("#", "");
  const r = Math.round(parseInt(h.substring(0, 2), 16) * (1 - amount));
  const g = Math.round(parseInt(h.substring(2, 4), 16) * (1 - amount));
  const b = Math.round(parseInt(h.substring(4, 6), 16) * (1 - amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Returns the inline style for a standard card node (no borders).
 */
export function getCardStyle(_color: string, selected?: boolean): CSSProperties {
  return {
    boxShadow: selected ? "0 0 0 2px var(--foreground)" : undefined,
  };
}

/**
 * Returns the inline style for the Run node (no borders).
 */
export function getRunStyle(_color: string, selected?: boolean): CSSProperties {
  return {
    boxShadow: selected ? "0 0 0 2px var(--foreground)" : undefined,
  };
}

/**
 * Returns a tinted background for node headers.
 */
export function tintBg(color: string, opacity = "15"): CSSProperties {
  return { background: `${color}${opacity}` };
}

/**
 * Picks the best source/target handle sides based on relative node positions.
 */
export function getBestHandle(
  source: { x: number; y: number; w: number; h: number },
  target: { x: number; y: number; w: number; h: number }
) {
  const dx = target.x + target.w / 2 - (source.x + source.w / 2);
  const dy = target.y + target.h / 2 - (source.y + source.h / 2);

  if (Math.abs(dx) > Math.abs(dy)) {
    return {
      sourceHandle: dx > 0 ? "right" : "left",
      targetHandle: dx > 0 ? "left" : "right",
    };
  }
  return {
    sourceHandle: dy > 0 ? "bottom" : "top",
    targetHandle: dy > 0 ? "top" : "bottom",
  };
}
