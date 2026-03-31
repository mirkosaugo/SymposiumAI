"use client";

import { NODE_COLORS } from "@/config/constants";
import { cn } from "@/lib/utils";

const COLOR_OPTIONS = Object.entries(NODE_COLORS).map(([key, hex]) => ({
  key,
  hex,
}));

interface ColorSwatchPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorSwatchPicker({ value, onChange }: ColorSwatchPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_OPTIONS.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.hex)}
          className={cn(
            "h-7 w-7 rounded-full cursor-pointer transition-all",
            value === opt.hex
              ? "ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110"
              : "hover:scale-110"
          )}
          style={{ backgroundColor: opt.hex }}
        />
      ))}
    </div>
  );
}
