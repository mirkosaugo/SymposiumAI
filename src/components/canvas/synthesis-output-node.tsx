"use client";

import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import { Sparkles } from "lucide-react";
import type { SynthesisOutputData } from "@/types/canvas";
import { useNodeData } from "@/hooks/use-node-data";
import { useConnectMode } from "@/hooks/use-connect-mode";
import { getCardStyle, getConnectHoverShadow } from "@/lib/node-style";
import { NodeHandles } from "./node-handles";
import { NodeActions } from "./node-actions";
import { NodeHeader } from "./node-header";

function SynthesisOutputNodeComponent({ id, data, selected }: NodeProps) {
  const [nodeData] = useNodeData<SynthesisOutputData>(id, data);
  const { hoveringNode } = useConnectMode();
  const isConnectHover = hoveringNode === id;

  return (
    <div
      className="group relative w-80 rounded-2xl overflow-hidden shadow-lg transition-shadow bg-[var(--node-bg)]"
      style={{
        ...getCardStyle(nodeData.color, selected),
        ...(isConnectHover ? getConnectHoverShadow(nodeData.color) : {}),
      }}
    >
      <NodeHandles />
      <NodeActions nodeId={id} hideEdit />
      <NodeHeader icon={Sparkles} label={nodeData.label} color={nodeData.color} />

      <div className="px-4 py-3 max-h-[200px] overflow-y-auto">
        <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
          {nodeData.synthesis || <span className="text-muted-foreground/40 italic">No synthesis</span>}
        </p>
      </div>

      <div className="px-4 pb-3">
        <span className="text-[9px] text-muted-foreground/50">
          Generated from Run Flow · {new Date(nodeData.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export const SynthesisOutputNodeComponent_ = memo(SynthesisOutputNodeComponent);
