"use client";

import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import { Play, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { RunNodeData } from "@/types/canvas";
import { useNodeData } from "@/hooks/use-node-data";
import { useConnectMode } from "@/hooks/use-connect-mode";
import { getRunStyle, getConnectHoverShadow } from "@/lib/node-style";
import { cn } from "@/lib/utils";
import { NodeHandles } from "./node-handles";
import { NodeActions } from "./node-actions";
import { NodeHeader } from "./node-header";

const statusConfig = {
  idle: { icon: Play, label: "Ready", iconClass: "text-emerald-400" },
  running: { icon: Loader2, label: "Processing...", iconClass: "text-amber-400 animate-spin" },
  done: { icon: CheckCircle2, label: "Completed", iconClass: "text-emerald-400" },
  error: { icon: AlertCircle, label: "Error", iconClass: "text-red-400" },
};

function RunNodeComponent({ id, data, selected }: NodeProps) {
  const [nodeData] = useNodeData<RunNodeData>(id, data);
  const { hoveringNode } = useConnectMode();
  const isConnectHover = hoveringNode === id;
  const { icon: StatusIcon, label: statusLabel, iconClass } = statusConfig[nodeData.status];

  return (
    <div
      className={cn(
        "group relative w-72 rounded-2xl border shadow-lg overflow-hidden transition-all bg-[var(--node-bg)] border-[var(--node-border)]",
        nodeData.status === "running" && "ring-2 ring-amber-400/30"
      )}
      style={{
        ...getRunStyle(nodeData.color, selected),
        ...(isConnectHover ? getConnectHoverShadow(nodeData.color) : {}),
      }}
    >
      <NodeHandles />
      <NodeActions nodeId={id} />

      <NodeHeader icon={Play} label={nodeData.label} color={nodeData.color}>
        {nodeData.status !== "idle" && (
          <div className="flex items-center gap-1.5">
            <StatusIcon className={cn("h-3 w-3", iconClass)} />
            <span className="text-[10px] text-muted-foreground">{statusLabel}</span>
          </div>
        )}
      </NodeHeader>

      {nodeData.result && (
        <div className="px-4 py-3 border-t border-border/10">
          <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap max-h-48 overflow-y-auto">
            {nodeData.result}
          </p>
        </div>
      )}

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
