"use client";

import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import { Type } from "lucide-react";
import type { TextNodeData } from "@/types/canvas";
import { useNodeData } from "@/hooks/use-node-data";
import { useConnectMode } from "@/hooks/use-connect-mode";
import { getCardStyle, getConnectHoverShadow } from "@/lib/node-style";
import { NodeHandles } from "./node-handles";
import { NodeActions } from "./node-actions";
import { NodeHeader } from "./node-header";

function TextNodeComponent({ id, data, selected }: NodeProps) {
  const [nodeData] = useNodeData<TextNodeData>(id, data);
  const { hoveringNode } = useConnectMode();
  const isConnectHover = hoveringNode === id;

  return (
    <div
      className="group relative w-72 rounded-2xl overflow-hidden shadow-lg transition-shadow bg-[var(--node-bg)]"
      style={{
        ...getCardStyle(nodeData.color, selected),
        ...(isConnectHover ? getConnectHoverShadow(nodeData.color) : {}),
      }}
    >
      <NodeHandles />
      <NodeActions nodeId={id} />
      <NodeHeader icon={Type} label="Text" color={nodeData.color} />

      <div className="px-4 py-3">
        <p className="text-sm text-foreground whitespace-pre-wrap">
          {nodeData.text || <span className="text-muted-foreground/40 italic">Empty note</span>}
        </p>
      </div>
    </div>
  );
}

export const TextNodeComponent_ = memo(TextNodeComponent);
