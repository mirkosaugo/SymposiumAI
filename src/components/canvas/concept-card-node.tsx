"use client";

import { memo, useState, useCallback } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { Lightbulb, X, Plus } from "lucide-react";
import type { ConceptCardData } from "@/types/canvas";

function ConceptCardNodeComponent({ id, data, selected }: NodeProps) {
  const nodeData = data as unknown as ConceptCardData;
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const { updateNodeData } = useReactFlow();

  const handleFieldBlur = useCallback(
    (field: string, value: string) => {
      setEditingField(null);
      updateNodeData(id, { [field]: value });
    },
    [id, updateNodeData]
  );

  const addTag = useCallback(() => {
    const tag = tagInput.trim();
    if (tag && !nodeData.tags.includes(tag)) {
      updateNodeData(id, { tags: [...nodeData.tags, tag] });
    }
    setTagInput("");
  }, [id, tagInput, nodeData.tags, updateNodeData]);

  const removeTag = useCallback(
    (tag: string) => {
      updateNodeData(id, { tags: nodeData.tags.filter((t: string) => t !== tag) });
    },
    [id, nodeData.tags, updateNodeData]
  );

  return (
    <div
      className="group relative w-64 rounded-2xl border shadow-lg overflow-hidden transition-shadow bg-[var(--node-bg)] border-[var(--node-border)]"
      style={{
        borderTopColor: selected ? nodeData.color : undefined,
        borderRightColor: selected ? nodeData.color : undefined,
        borderBottomColor: selected ? nodeData.color : undefined,
        borderLeftWidth: 4,
        borderLeftColor: nodeData.color,
        borderRadius: "4px 16px 16px 4px",
        boxShadow: selected ? `0 0 20px ${nodeData.color}40` : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-neutral-500 !border-2 !border-neutral-700" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-neutral-500 !border-2 !border-neutral-700" />
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-neutral-500 !border-2 !border-neutral-700" style={{ left: -2 }} />
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-neutral-500 !border-2 !border-neutral-700" />

      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-1">
        <Lightbulb className="h-4 w-4 shrink-0" style={{ color: nodeData.color }} />
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Concept
        </span>
      </div>

      {/* Title */}
      <div className="px-4 pt-1 pb-1">
        {editingField === "title" ? (
          <input
            autoFocus
            defaultValue={nodeData.title}
            onBlur={(e) => handleFieldBlur("title", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
            className="w-full bg-transparent text-sm font-semibold text-foreground outline-none"
          />
        ) : (
          <h3
            className="text-sm font-semibold text-foreground cursor-text"
            onDoubleClick={() => setEditingField("title")}
          >
            {nodeData.title || "Untitled concept"}
          </h3>
        )}
      </div>

      {/* Description */}
      <div className="px-4 pb-2">
        {editingField === "description" ? (
          <textarea
            autoFocus
            defaultValue={nodeData.description}
            onBlur={(e) => handleFieldBlur("description", e.target.value)}
            className="w-full min-h-10 resize-none bg-transparent text-xs leading-relaxed text-muted-foreground outline-none"
          />
        ) : (
          <p
            className="text-xs leading-relaxed text-muted-foreground cursor-text min-h-5"
            onDoubleClick={() => setEditingField("description")}
          >
            {nodeData.description || "Double click to add description..."}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="px-4 pb-4 flex flex-wrap gap-1.5 items-center">
        {nodeData.tags.map((tag: string) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{ background: `${nodeData.color}20`, color: nodeData.color }}
          >
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:opacity-70">
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
        <div className="inline-flex items-center gap-1">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
            placeholder="+ tag"
            className="w-12 bg-transparent text-[10px] text-muted-foreground outline-none placeholder:text-muted-foreground/40"
          />
          {tagInput && (
            <button onClick={addTag} className="text-muted-foreground hover:text-foreground">
              <Plus className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export const ConceptCardNodeComponent_ = memo(ConceptCardNodeComponent);
