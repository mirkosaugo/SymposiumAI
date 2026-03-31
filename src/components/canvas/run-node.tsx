"use client";

import { memo, useCallback } from "react";
import { type NodeProps } from "@xyflow/react";
import { Play, Loader2, CheckCircle2, AlertCircle, GitBranch } from "lucide-react";
import type { RunNodeData, StructuredOutput } from "@/types/canvas";
import { useNodeData } from "@/hooks/use-node-data";
import { useConnectMode } from "@/hooks/use-connect-mode";
import { useChainFlow } from "@/hooks/use-chain-flow";
import { getRunStyle, getConnectHoverShadow } from "@/lib/node-style";
import { cn } from "@/lib/utils";
import { NodeHandles } from "./node-handles";
import { NodeActions } from "./node-actions";
import { NodeHeader } from "./node-header";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const statusConfig = {
  idle: { icon: Play, label: "Ready", iconClass: "text-emerald-400" },
  running: { icon: Loader2, label: "Processing...", iconClass: "text-amber-400 animate-spin" },
  done: { icon: CheckCircle2, label: "Completed", iconClass: "text-emerald-400" },
  error: { icon: AlertCircle, label: "Error", iconClass: "text-red-400" },
};

const PRIORITY_BADGE: Record<string, string> = {
  high: "bg-rose-500/15 text-rose-500",
  medium: "bg-amber-500/15 text-amber-500",
  low: "bg-slate-500/15 text-slate-400",
};

function StructuredView({ output }: { output: StructuredOutput }) {
  return (
    <div className="space-y-3">
      {output.synthesis && (
        <div>
          <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {output.synthesis}
          </p>
        </div>
      )}

      {output.conflicts.length > 0 && (
        <div>
          <h4 className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-foreground mb-1.5">
            <span>⚡</span> Conflicts
          </h4>
          <ul className="space-y-1.5">
            {output.conflicts.map((c, i) => (
              <li key={i} className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{c.between}</span>
                <span className="mx-1">—</span>
                {c.tension}
              </li>
            ))}
          </ul>
        </div>
      )}

      {output.openQuestions.length > 0 && (
        <div>
          <h4 className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-foreground mb-1.5">
            <span>❓</span> Open Questions
          </h4>
          <ul className="space-y-1.5">
            {output.openQuestions.map((q, i) => (
              <li key={i} className="text-xs">
                <span className={cn("text-muted-foreground", q.isBlocking && "text-rose-400 font-medium")}>
                  {q.question}
                  {q.isBlocking && <span className="ml-1 text-[9px]">⚠ BLOCKING</span>}
                </span>
                {q.suggestedApproach && (
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5 pl-2 border-l border-border/30">
                    {q.suggestedApproach}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {output.nextSteps.length > 0 && (
        <div>
          <h4 className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-foreground mb-1.5">
            <span>→</span> Next Steps
          </h4>
          <ul className="space-y-1.5">
            {output.nextSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase", PRIORITY_BADGE[s.priority] ?? PRIORITY_BADGE.medium)}>
                  {s.priority}
                </span>
                <div>
                  <span className="text-foreground font-medium">{s.action}</span>
                  {s.rationale && (
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">{s.rationale}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {output.goalAlignment && (
        <div>
          <h4 className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-foreground mb-1.5">
            <span>🎯</span> Goal Alignment
          </h4>
          <p className="text-xs leading-relaxed text-muted-foreground">{output.goalAlignment}</p>
        </div>
      )}
    </div>
  );
}

function RunNodeComponent({ id, data, selected }: NodeProps) {
  const [nodeData] = useNodeData<RunNodeData>(id, data);
  const { hoveringNode } = useConnectMode();
  const { chainFromRun } = useChainFlow();
  const isConnectHover = hoveringNode === id;
  const { icon: StatusIcon, label: statusLabel, iconClass } = statusConfig[nodeData.status];

  const hasStructured = nodeData.status === "done" && nodeData.structuredOutput;
  const canChain = nodeData.status === "done" && (nodeData.structuredOutput || nodeData.result);

  const handleChain = useCallback(() => {
    chainFromRun(id);
  }, [id, chainFromRun]);

  return (
    <div
      className={cn(
        "group relative rounded-2xl border shadow-lg overflow-hidden transition-all bg-[var(--node-bg)] border-[var(--node-border)]",
        nodeData.status === "running" && "ring-2 ring-amber-400/30",
        hasStructured ? "w-96" : "w-72"
      )}
      style={{
        ...getRunStyle(nodeData.color, selected),
        ...(isConnectHover ? getConnectHoverShadow(nodeData.color) : {}),
        ...(hasStructured ? { minHeight: 300 } : {}),
      }}
    >
      <NodeHandles />
      <NodeActions nodeId={id} hideEdit />

      <NodeHeader icon={Play} label={nodeData.label} color={nodeData.color}>
        <div className="flex items-center gap-1.5">
          {nodeData.status !== "idle" && (
            <>
              <StatusIcon className={cn("h-3 w-3", iconClass)} />
              <span className="text-[10px] text-muted-foreground">{statusLabel}</span>
            </>
          )}
          {canChain && (
            <Tooltip>
              <TooltipTrigger
                className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer active:scale-95"
                onClick={handleChain}
              >
                <GitBranch className="h-3.5 w-3.5 text-emerald-400" />
              </TooltipTrigger>
              <TooltipContent>Chain to new flow</TooltipContent>
            </Tooltip>
          )}
        </div>
      </NodeHeader>

      {/* Structured output */}
      {hasStructured && nodeData.structuredOutput && (
        <div className="px-4 py-3 border-t border-border/10 max-h-[400px] overflow-y-auto">
          <StructuredView output={nodeData.structuredOutput} />
        </div>
      )}

      {/* Fallback: raw text result */}
      {nodeData.status === "done" && !nodeData.structuredOutput && nodeData.result && (
        <div className="px-4 py-3 border-t border-border/10">
          <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap max-h-48 overflow-y-auto">
            {nodeData.result}
          </p>
        </div>
      )}

      {/* Error */}
      {nodeData.status === "error" && nodeData.result && (
        <div className="px-4 py-3 border-t border-border/10">
          <p className="text-xs leading-relaxed text-red-400 whitespace-pre-wrap">
            {nodeData.result}
          </p>
        </div>
      )}

      {/* Idle placeholder */}
      {nodeData.status === "idle" && !nodeData.result && (
        <div className="px-4 py-3 border-t border-border/10">
          <p className="text-[10px] text-muted-foreground/50 text-center">
            Connect your content and press Run in the toolbar
          </p>
        </div>
      )}
    </div>
  );
}

export const RunNodeComponent_ = memo(RunNodeComponent);
