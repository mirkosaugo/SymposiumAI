"use client";

import { MousePointer2, Hand } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ToolMode } from "@/types/canvas";
import { cn } from "@/lib/utils";

interface CanvasToolbarProps {
  activeTool: ToolMode;
  onToolChange: (tool: ToolMode) => void;
}

const tools: { id: ToolMode; icon: typeof MousePointer2; label: string }[] = [
  { id: "select", icon: MousePointer2, label: "Select (V)" },
  { id: "hand", icon: Hand, label: "Hand tool (H)" },
];

export function CanvasToolbar({ activeTool, onToolChange }: CanvasToolbarProps) {
  return (
    <div className="absolute right-4 top-1/2 z-40 -translate-y-1/2">
      <div className="flex flex-col items-center gap-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-2xl shadow-[0_0_15px_0_rgb(0_0_0/0.25)] p-1.5">
        {tools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-colors cursor-pointer",
                "hover:bg-muted active:scale-95",
                activeTool === tool.id
                  ? "bg-foreground text-background"
                  : "text-foreground"
              )}
              onClick={() => onToolChange(tool.id)}
            >
              <tool.icon className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent side="left">{tool.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
