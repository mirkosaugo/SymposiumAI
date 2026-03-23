"use client";

import { memo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noop = () => () => {};
const getTrue = () => true;
const getFalse = () => false;
function useIsMounted() {
  return useSyncExternalStore(noop, getTrue, getFalse);
}

const waves = [
  // Top edge
  { color: "#A78BFA", edge: "top" as const, dur: 6, delay: 0 },
  { color: "#38BDF8", edge: "top" as const, dur: 8, delay: -2 },
  { color: "#34D399", edge: "top" as const, dur: 10, delay: -5 },
  // Bottom edge
  { color: "#FF6B9D", edge: "bottom" as const, dur: 7, delay: -1 },
  { color: "#A78BFA", edge: "bottom" as const, dur: 9, delay: -4 },
  { color: "#38BDF8", edge: "bottom" as const, dur: 11, delay: -6 },
  // Left edge
  { color: "#34D399", edge: "left" as const, dur: 7, delay: -1.5 },
  { color: "#FF6B9D", edge: "left" as const, dur: 9, delay: -3 },
  { color: "#A78BFA", edge: "left" as const, dur: 11, delay: -7 },
  // Right edge
  { color: "#38BDF8", edge: "right" as const, dur: 8, delay: -2 },
  { color: "#34D399", edge: "right" as const, dur: 10, delay: -5 },
  { color: "#FF6B9D", edge: "right" as const, dur: 6, delay: -1 },
];

function WaveSvg({
  index,
  edge,
  color,
  dur,
  delay,
  active,
}: {
  index: number;
  edge: "top" | "bottom" | "left" | "right";
  color: string;
  dur: number;
  delay: number;
  active: boolean;
}) {
  const isHorizontal = edge === "top" || edge === "bottom";
  const gradId = `wave-grad-${index}`;

  const pos: React.CSSProperties = {
    position: "absolute",
    filter: "blur(24px)",
    ...(edge === "top" && { top: -4, left: 0, width: "100%", height: 40 }),
    ...(edge === "bottom" && {
      bottom: -4,
      left: 0,
      width: "100%",
      height: 40,
    }),
    ...(edge === "left" && { top: 0, left: -4, width: 40, height: "100%" }),
    ...(edge === "right" && { top: 0, right: -4, width: 40, height: "100%" }),
  };

  const animStyle: React.CSSProperties = {
    animationName: active
      ? isHorizontal
        ? "ambient-morph-h"
        : "ambient-morph-v"
      : "none",
    animationDuration: `${dur}s`,
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDelay: `${delay}s`,
  };

  if (isHorizontal) {
    // Gradient: edge → transparent (top: top-to-bottom, bottom: bottom-to-top)
    const gradDir =
      edge === "top"
        ? { x1: "0", y1: "0", x2: "0", y2: "1" }
        : { x1: "0", y1: "1", x2: "0", y2: "0" };

    return (
      <svg
        style={pos}
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={gradId} {...gradDir}>
            <stop offset="0%" stopColor={color} stopOpacity="0.42" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,16 C120,4 240,28 360,16 C480,4 600,28 720,16 C840,4 960,28 1080,16 C1200,4 1320,28 1440,16 L1440,0 L0,0 Z"
          fill={`url(#${gradId})`}
          transform={
            edge === "bottom" ? "scale(1,-1) translate(0,-32)" : undefined
          }
          style={animStyle}
        />
      </svg>
    );
  }

  // Vertical
  const gradDir =
    edge === "left"
      ? { x1: "0", y1: "0", x2: "1", y2: "0" }
      : { x1: "1", y1: "0", x2: "0", y2: "0" };

  return (
    <svg
      style={pos}
      viewBox="0 0 32 900"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} {...gradDir}>
          <stop offset="0%" stopColor={color} stopOpacity="0.42" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M16,0 C4,75 28,150 16,225 C4,300 28,375 16,450 C4,525 28,600 16,675 C4,750 28,825 16,900 L0,900 L0,0 Z"
        fill={`url(#${gradId})`}
        transform={
          edge === "right" ? "scale(-1,1) translate(-32,0)" : undefined
        }
        style={animStyle}
      />
    </svg>
  );
}

interface AmbientGlowProps {
  active: boolean;
}

function AmbientGlowComponent({ active }: AmbientGlowProps) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return createPortal(
    <div
      id="ambient-glow"
      className="pointer-events-none fixed inset-0 transition-opacity duration-1000"
      style={{ opacity: active ? 1 : 0, zIndex: 9998 }}
    >
      {waves.map((w, i) => (
        <WaveSvg
          key={i}
          index={i}
          edge={w.edge}
          color={w.color}
          dur={w.dur}
          delay={w.delay}
          active={active}
        />
      ))}
    </div>,
    document.body,
  );
}

export const AmbientGlow = memo(AmbientGlowComponent);
