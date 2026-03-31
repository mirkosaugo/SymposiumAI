"use client";

import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import { ImagePlus } from "lucide-react";
import type { ImageUploadData } from "@/types/canvas";
import { useNodeData } from "@/hooks/use-node-data";
import { useConnectMode } from "@/hooks/use-connect-mode";
import { getCardStyle, getConnectHoverShadow } from "@/lib/node-style";
import { NodeHandles } from "./node-handles";
import { NodeActions } from "./node-actions";
import { NodeHeader } from "./node-header";

function ImageNodeComponent({ id, data, selected }: NodeProps) {
  const [nodeData] = useNodeData<ImageUploadData>(id, data);
  const { hoveringNode } = useConnectMode();
  const isConnectHover = hoveringNode === id;

  return (
    <div
      className="group relative w-64 rounded-2xl overflow-hidden shadow-lg transition-shadow bg-[var(--node-bg)]"
      style={{
        ...getCardStyle(nodeData.color, selected),
        ...(isConnectHover ? getConnectHoverShadow(nodeData.color) : {}),
      }}
    >
      <NodeHandles />
      <NodeActions nodeId={id} />
      <NodeHeader icon={ImagePlus} label="Image" color={nodeData.color} />

      {/* Image area */}
      {nodeData.src ? (
        <div className="px-3 py-2">
          <img
            src={nodeData.src}
            alt={nodeData.caption || "uploaded"}
            className="w-full rounded-xl object-cover max-h-40"
          />
        </div>
      ) : (
        <div className="mx-3 my-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--node-border)] py-6">
          <ImagePlus className="h-8 w-8 text-muted-foreground/40 mb-2" />
          <span className="text-[10px] text-muted-foreground/60">Click edit to upload</span>
        </div>
      )}

      {/* Caption */}
      {nodeData.caption && (
        <div className="px-4 pb-3">
          <p className="text-xs text-muted-foreground">{nodeData.caption}</p>
        </div>
      )}
    </div>
  );
}

export const ImageNodeComponent_ = memo(ImageNodeComponent);
