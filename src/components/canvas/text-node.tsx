"use client";

import { memo, useState, useCallback } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { Type } from "lucide-react";
import type { TextNodeData } from "@/types/canvas";

function TextNodeComponent({ id, data, selected }: NodeProps) {
  const nodeData = data as unknown as TextNodeData;
  const [editing, setEditing] = useState(false);
  const { updateNodeData } = useReactFlow();

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setEditing(false);
      updateNodeData(id, { text: e.target.value });
    },
    [id, updateNodeData]
  );

  return (
    <div
      className="group relative min-w-48 max-w-72 rounded-2xl border shadow-lg transition-shadow bg-[var(--node-bg)] border-[var(--node-border)]"
      style={{
        borderColor: selected ? nodeData.color : undefined,
        boxShadow: selected ? `0 0 20px ${nodeData.color}40` : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-neutral-500 !border-2 !border-neutral-700" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-neutral-500 !border-2 !border-neutral-700" />
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-neutral-500 !border-2 !border-neutral-700" />
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-neutral-500 !border-2 !border-neutral-700" />

      <div className="flex items-center gap-2 px-4 pt-3 pb-1">
        <Type className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Text
        </span>
      </div>

      <div className="px-4 pb-4 pt-1">
        {editing ? (
          <textarea
            autoFocus
            defaultValue={nodeData.text}
            onBlur={handleBlur}
            className="w-full min-h-16 resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/50"
            placeholder="Write your ideas here..."
          />
        ) : (
          <p
            className="min-h-8 cursor-text text-sm leading-relaxed text-foreground whitespace-pre-wrap"
            onDoubleClick={() => setEditing(true)}
          >
            {nodeData.text || "Double click to write..."}
          </p>
        )}
      </div>
    </div>
  );
}

export const TextNodeComponent_ = memo(TextNodeComponent);
