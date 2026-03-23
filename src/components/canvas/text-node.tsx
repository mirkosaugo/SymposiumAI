"use client";

import { memo, useState } from "react";
import { type NodeProps } from "@xyflow/react";
import { Type } from "lucide-react";
import type { TextNodeData } from "@/types/canvas";
import { useNodeData } from "@/hooks/use-node-data";
import { useConnectMode } from "@/hooks/use-connect-mode";
import { getCardStyle, getConnectHoverShadow } from "@/lib/node-style";
import { NodeHandles } from "./node-handles";
import { NodeActions } from "./node-actions";
import { NodeHeader } from "./node-header";
import { EditableField } from "./editable-field";

function TextNodeComponent({ id, data, selected }: NodeProps) {
  const [nodeData, update] = useNodeData<TextNodeData>(id, data);
  const [editing, setEditing] = useState(false);
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
      <NodeActions nodeId={id} onEdit={() => setEditing(true)} />
      <NodeHeader icon={Type} label="Text" color={nodeData.color} />

      <div className="px-4 py-3">
        <EditableField
          value={nodeData.text}
          placeholder="Double click to write..."
          onSave={(text) => update({ text })}
          editing={editing}
          onEditEnd={() => setEditing(false)}
          multiline
        />
      </div>
    </div>
  );
}

export const TextNodeComponent_ = memo(TextNodeComponent);
