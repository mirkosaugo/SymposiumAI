"use client";

import { ZoomIn, ZoomOut, Maximize, Settings, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GLASS_CONTAINER_CLASS, ICON_BTN_CLASS } from "@/config/constants";

interface StatusBarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
}

export function StatusBar({ zoom, onZoomIn, onZoomOut, onFitView }: StatusBarProps) {
  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="absolute bottom-4 right-4 z-40 flex flex-col items-center gap-2">
      <div className={`flex flex-col items-center gap-2 rounded-full p-1.5 ${GLASS_CONTAINER_CLASS}`}>
        <Tooltip>
          <TooltipTrigger className={ICON_BTN_CLASS} onClick={onZoomIn}>
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
          <TooltipTrigger className={ICON_BTN_CLASS} onClick={onZoomOut}>
            <ZoomOut className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="left">Zoom out</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className={ICON_BTN_CLASS} onClick={onFitView}>
            <Maximize className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="left">Fit to screen</TooltipContent>
        </Tooltip>
      </div>

      <div className={`flex flex-col items-center gap-2 rounded-full p-1.5 ${GLASS_CONTAINER_CLASS}`}>
        <Tooltip>
          <TooltipTrigger className={ICON_BTN_CLASS}>
            <Settings className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="left">Settings</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className={ICON_BTN_CLASS}>
            <HelpCircle className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="left">Help</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
