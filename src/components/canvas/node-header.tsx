"use client";

import type { LucideIcon } from "lucide-react";
import { tintBg } from "@/lib/node-style";

interface NodeHeaderProps {
  icon: LucideIcon;
  label: string;
  color: string;
  children?: React.ReactNode;
}

export function NodeHeader({ icon: Icon, label, color, children }: NodeHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3" style={tintBg(color)}>
      <div
        className="flex h-8 w-8 items-center justify-center rounded-xl"
        style={tintBg(color, "25")}
      >
        <Icon className="h-4 w-4" style={{ color }} />
      </div>
      <h3 className="flex-1 text-sm font-semibold text-foreground">{label}</h3>
      {children}
    </div>
  );
}
