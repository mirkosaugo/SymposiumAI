"use client";

import { memo, useState, useCallback, useRef } from "react";
import { type NodeProps } from "@xyflow/react";
import { ImagePlus, X } from "lucide-react";
import type { ImageUploadData } from "@/types/canvas";
import { useNodeData } from "@/hooks/use-node-data";
import { useConnectMode } from "@/hooks/use-connect-mode";
import { getCardStyle, getConnectHoverShadow } from "@/lib/node-style";
import { NodeHandles } from "./node-handles";
import { NodeActions } from "./node-actions";
import { NodeHeader } from "./node-header";
import { EditableField } from "./editable-field";

function ImageNodeComponent({ id, data, selected }: NodeProps) {
  const [nodeData, update] = useNodeData<ImageUploadData>(id, data);
  const { hoveringNode } = useConnectMode();
  const isConnectHover = hoveringNode === id;
  const [dragging, setDragging] = useState(false);
  const [editingCaption, setEditingCaption] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => update({ src: e.target?.result as string });
      reader.readAsDataURL(file);
    },
    [update]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      className="group relative w-64 rounded-2xl overflow-hidden shadow-lg transition-shadow bg-[var(--node-bg)]"
      style={{
        ...getCardStyle(nodeData.color, selected),
        ...(isConnectHover ? getConnectHoverShadow(nodeData.color) : {}),
      }}
    >
      <NodeHandles />
      <NodeActions nodeId={id} onEdit={() => setEditingCaption(true)} />

      <NodeHeader icon={ImagePlus} label="Image" color={nodeData.color}>
        {nodeData.src && (
          <button
            onClick={() => update({ src: null })}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </NodeHeader>

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
        <div
          className="mx-3 my-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-8 cursor-pointer transition-colors"
          style={{
            borderColor: dragging ? nodeData.color : "var(--node-border)",
            background: dragging ? `${nodeData.color}10` : "transparent",
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <ImagePlus className="h-8 w-8 text-muted-foreground/40 mb-2" />
          <span className="text-[10px] text-muted-foreground/60">Drop or click to upload</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </div>
      )}

      {/* Caption */}
      <div className="px-4 pb-3">
        <EditableField
          value={nodeData.caption}
          placeholder="Double click for caption..."
          onSave={(caption) => update({ caption })}
          editing={editingCaption}
          onEditEnd={() => setEditingCaption(false)}
          className="text-xs text-muted-foreground min-h-4"
        />
      </div>
    </div>
  );
}

export const ImageNodeComponent_ = memo(ImageNodeComponent);
