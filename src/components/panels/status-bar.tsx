"use client";

import { ZoomIn, ZoomOut, Maximize, Settings, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
}

const btnClass =
  "flex h-8 w-8 items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-muted active:scale-95 text-foreground";

export function StatusBar({ zoom, onZoomIn, onZoomOut, onFitView }: StatusBarProps) {
  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="absolute bottom-4 right-4 z-40 flex flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-2xl shadow-[0_0_15px_0_rgb(0_0_0/0.25)] p-1.5">
        <Tooltip>
          <TooltipTrigger className={btnClass} onClick={onZoomIn}>
            <ZoomIn className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="left">Zoom in</TooltipContent>
        </Tooltip>

        <button
          onClick={onFitView}
          className="text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {zoomPercent}%
        </button>

        <Tooltip>
          <TooltipTrigger className={btnClass} onClick={onZoomOut}>
            <ZoomOut className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="left">Zoom out</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className={btnClass} onClick={onFitView}>
            <Maximize className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="left">Fit to screen</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-2xl shadow-[0_0_15px_0_rgb(0_0_0/0.25)] p-1.5">
        <Tooltip>
          <TooltipTrigger className={btnClass}>
            <Settings className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="left">Settings</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className={btnClass}>
            <HelpCircle className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="left">Help</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
