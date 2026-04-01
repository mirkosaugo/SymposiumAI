"use client";

import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import { useReactFlow } from "@xyflow/react";
import { X, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { GLASS_CONTAINER_CLASS } from "@/config/constants";
import type { CanvasNode } from "@/types/canvas";
import type { ColorLabels } from "@/hooks/use-canvas-storage";

interface ColorFilterBarProps {
  nodes: CanvasNode[];
  colorLabels: ColorLabels;
  onColorLabelChange: (hex: string, label: string) => void;
}

export function ColorFilterBar({ nodes, colorLabels, onColorLabelChange }: ColorFilterBarProps) {
  const { fitView } = useReactFlow();
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [editingHex, setEditingHex] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingHex && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingHex]);

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
      if (editingHex) return;

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
    [nodes, fitView, activeColor, editingHex]
  );

  const commitLabel = useCallback(
    (hex: string, value: string) => {
      onColorLabelChange(hex, value.trim());
      setEditingHex(null);
    },
    [onColorLabelChange]
  );

  if (colorEntries.length <= 1) return null;

  return (
    <div className="absolute top-4 left-1/2 z-100 -translate-x-1/2">
      <div
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 ${GLASS_CONTAINER_CLASS}`}
      >
        {colorEntries.map(({ hex, count }) => (
          <div key={hex} className="group/pill relative flex items-center">
            <button
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
              {editingHex === hex ? (
                <input
                  ref={inputRef}
                  defaultValue={colorLabels[hex] || ""}
                  placeholder="Label..."
                  className="bg-transparent text-white placeholder:text-white/50 text-[11px] font-semibold outline-none w-16"
                  onBlur={(e) => commitLabel(hex, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitLabel(hex, e.currentTarget.value);
                    if (e.key === "Escape") setEditingHex(null);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                colorLabels[hex] || count
              )}
            </button>

            {/* Edit button on hover */}
            {editingHex !== hex && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingHex(hex);
                }}
                className="absolute -top-2 -right-2 hidden group-hover/pill:flex h-4 w-4 items-center justify-center rounded-full bg-foreground/80 text-background transition-colors cursor-pointer hover:bg-foreground"
              >
                <Pencil className="h-2 w-2" />
              </button>
            )}
          </div>
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
