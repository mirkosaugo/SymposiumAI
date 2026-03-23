"use client";

import { memo, useState, useCallback } from "react";
import { type NodeProps } from "@xyflow/react";
import { Lightbulb, X, Plus } from "lucide-react";
import type { ConceptCardData } from "@/types/canvas";
import { useNodeData } from "@/hooks/use-node-data";
import { useConnectMode } from "@/hooks/use-connect-mode";
import { getCardStyle, getConnectHoverShadow } from "@/lib/node-style";
import { NodeHandles } from "./node-handles";
import { NodeActions } from "./node-actions";
import { NodeHeader } from "./node-header";
import { EditableField } from "./editable-field";

function ConceptCardNodeComponent({ id, data, selected }: NodeProps) {
  const [nodeData, update] = useNodeData<ConceptCardData>(id, data);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const { hoveringNode } = useConnectMode();
  const isConnectHover = hoveringNode === id;

  const addTag = useCallback(() => {
    const tag = tagInput.trim();
    if (tag && !nodeData.tags.includes(tag)) {
      update({ tags: [...nodeData.tags, tag] });
    }
    setTagInput("");
  }, [tagInput, nodeData.tags, update]);

  const removeTag = useCallback(
    (tag: string) => update({ tags: nodeData.tags.filter((t: string) => t !== tag) }),
    [nodeData.tags, update]
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
      <NodeActions nodeId={id} onEdit={() => setEditingField("title")} />
      <NodeHeader icon={Lightbulb} label="Concept" color={nodeData.color} />

      {/* Title */}
      <div className="px-4 pt-3 pb-1">
        <EditableField
          value={nodeData.title}
          placeholder="Untitled concept"
          onSave={(title) => update({ title })}
          editing={editingField === "title"}
          onEditStart={() => setEditingField("title")}
          onEditEnd={() => setEditingField(null)}
          className="text-sm font-semibold text-foreground"
        />
      </div>

      {/* Description */}
      <div className="px-4 pb-2">
        <EditableField
          value={nodeData.description}
          placeholder="Double click to add description..."
          onSave={(description) => update({ description })}
          editing={editingField === "description"}
          onEditStart={() => setEditingField("description")}
          onEditEnd={() => setEditingField(null)}
          multiline
          className="text-xs leading-relaxed text-muted-foreground"
          editClassName="text-xs leading-relaxed text-muted-foreground min-h-10"
        />
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
