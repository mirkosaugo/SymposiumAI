"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AgentLogProps {
  logs: string[];
}

export function AgentLog({ logs }: AgentLogProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-20 left-4 z-40">
      <div
        className={cn(
          "rounded-2xl bg-card border border-border/15 backdrop-blur-3xl shadow-[0_0_15px_0_rgb(0_0_0/0.25)] transition-all",
          open ? "w-80" : "w-auto"
        )}
      >
        <Button
          variant="ghost"
          className="flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-medium"
          onClick={() => setOpen(!open)}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Agent log
          {logs.length > 0 && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground/10 text-[9px]">
              {logs.length}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform",
              open && "rotate-180"
            )}
          />
        </Button>

        {open && (
          <div className="max-h-48 overflow-y-auto border-t border-border px-3 py-2 space-y-1">
            {logs.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No activity yet.
              </p>
            ) : (
              logs.map((log, i) => (
                <p key={i} className="text-xs text-muted-foreground">
                  <span className="text-muted-foreground/50 mr-1.5">{String(i + 1).padStart(2, "0")}</span>
                  {log}
                </p>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
