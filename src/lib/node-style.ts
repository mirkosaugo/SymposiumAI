import type { CSSProperties } from "react";

/**
 * Returns the inline style for a node with a colored left border.
 * Used by Text, Concept Card, and Image nodes.
 */
export function getCardStyle(color: string, selected?: boolean): CSSProperties {
  return {
    borderWidth: 1,
    borderTopColor: selected ? color : "var(--node-border)",
    borderRightColor: selected ? color : "var(--node-border)",
    borderBottomColor: selected ? color : "var(--node-border)",
    borderLeftWidth: 4,
    borderLeftColor: color,
    borderRadius: "4px 16px 16px 4px",
    boxShadow: selected ? `0 0 8px ${color}15` : undefined,
  };
}

/**
 * Returns the inline style for the Run node (uniform border, no left accent).
 */
export function getRunStyle(color: string, selected?: boolean): CSSProperties {
  return {
    borderColor: selected ? color : undefined,
    boxShadow: selected ? `0 0 8px ${color}15` : undefined,
  };
}

/**
 * Returns a tinted background for node headers.
 */
export function tintBg(color: string, opacity = "15"): CSSProperties {
  return { background: `${color}${opacity}` };
}

/**
 * Returns a strong glow box-shadow for connect-mode hover.
 */
export function getConnectHoverShadow(color: string): CSSProperties {
  return { boxShadow: `0 0 20px ${color}50, 0 0 40px ${color}25` };
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
