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
  disabledColors?: string[];
}

export function ColorSwatchPicker({ value, onChange, disabledColors = [] }: ColorSwatchPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_OPTIONS.map((opt) => {
        const isDisabled = disabledColors.includes(opt.hex);
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => !isDisabled && onChange(opt.hex)}
            disabled={isDisabled}
            className={cn(
              "h-7 w-7 rounded-full transition-all",
              isDisabled
                ? "opacity-20 cursor-not-allowed"
                : value === opt.hex
                  ? "ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110 cursor-pointer"
                  : "hover:scale-110 cursor-pointer"
            )}
            style={{ backgroundColor: opt.hex }}
          />
        );
      })}
    </div>
  );
}
