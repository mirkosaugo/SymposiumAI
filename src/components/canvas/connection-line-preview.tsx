"use client";

import { useEffect, useState } from "react";
import { useReactFlow } from "@xyflow/react";

interface ConnectionLinePreviewProps {
  sourceNodeId: string;
}

export function ConnectionLinePreview({ sourceNodeId }: ConnectionLinePreviewProps) {
  const { getNode, flowToScreenPosition } = useReactFlow();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const node = getNode(sourceNodeId);
  if (!node) return null;

  // Get the center of the source node in screen coordinates
  const w = node.measured?.width ?? 250;
  const h = node.measured?.height ?? 150;
  const screenPos = flowToScreenPosition({
    x: node.position.x + w / 2,
    y: node.position.y + h / 2,
  });

  return (
    <svg className="pointer-events-none fixed inset-0 z-0" width="100%" height="100%">
      <line
        x1={screenPos.x}
        y1={screenPos.y}
        x2={mouse.x}
        y2={mouse.y}
        stroke="var(--color-foreground)"
        strokeWidth={2}
        strokeDasharray="6 4"
        opacity={0.5}
      />
      <circle cx={mouse.x} cy={mouse.y} r={6} fill="var(--color-foreground)" opacity={0.3} />
    </svg>
  );
}
