"use client";

import type { LucideIcon } from "lucide-react";
import { darkenColor } from "@/lib/node-style";

interface NodeHeaderProps {
  icon: LucideIcon;
  label: string;
  color: string;
  children?: React.ReactNode;
}

export function NodeHeader({ icon: Icon, label, color, children }: NodeHeaderProps) {
  const iconColor = darkenColor(color, 0.35);

  return (
    <div
      className="flex items-center gap-2 px-4 py-3"
      style={{ background: color }}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-xl"
        style={{ background: "rgba(0,0,0,0.15)" }}
      >
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <h3 className="flex-1 text-sm font-semibold text-white">{label}</h3>
      {children}
    </div>
  );
}
