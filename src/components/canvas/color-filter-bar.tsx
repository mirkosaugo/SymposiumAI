"use client";

import { useMemo, useCallback, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GLASS_CONTAINER_CLASS } from "@/config/constants";
import type { CanvasNode } from "@/types/canvas";

interface ColorFilterBarProps {
  nodes: CanvasNode[];
}

export function ColorFilterBar({ nodes }: ColorFilterBarProps) {
  const { fitView } = useReactFlow();
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const colorEntries = useMemo(() => {
    const map = new Map<string, number>();
    for (const node of nodes) {
      const color = (node.data as { color?: string }).color;
      if (color) {
        map.set(color, (map.get(color) || 0) + 1);
      }
    }
    return Array.from(map.entries()).map(([hex, count]) => ({ hex, count }));
  }, [nodes]);

  const handleClick = useCallback(
    (hex: string) => {
      if (activeColor === hex) {
        setActiveColor(null);
        fitView({ padding: 0.2, duration: 400 });
        return;
      }

      setActiveColor(hex);
      const matchingIds = nodes
        .filter((n) => (n.data as { color?: string }).color === hex)
        .map((n) => n.id);

      if (matchingIds.length > 0) {
        fitView({
          nodes: matchingIds.map((id) => ({ id })),
          padding: 0.15,
          duration: 400,
        });
      }
    },
    [nodes, fitView, activeColor]
  );

  if (colorEntries.length <= 1) return null;

  return (
    <div className="absolute top-4 left-1/2 z-100 -translate-x-1/2">
      <div
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 ${GLASS_CONTAINER_CLASS}`}
      >
        {colorEntries.map(({ hex, count }) => (
          <button
            key={hex}
            type="button"
            onClick={() => handleClick(hex)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer text-white",
              activeColor === hex
                ? "scale-105 ring-2 ring-white/40"
                : "hover:scale-105",
              activeColor && activeColor !== hex && "opacity-50"
            )}
            style={{ backgroundColor: hex }}
          >
            {count}
          </button>
        ))}

        {activeColor && (
          <button
            type="button"
            onClick={() => {
              setActiveColor(null);
              fitView({ padding: 0.2, duration: 400 });
            }}
            className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
