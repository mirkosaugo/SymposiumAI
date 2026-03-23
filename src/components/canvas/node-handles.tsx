"use client";

import { Handle, Position } from "@xyflow/react";

const handleClass = "!w-2.5 !h-2.5 !bg-neutral-500 !border-2 !border-neutral-700 !opacity-0 hover:!opacity-100 transition-opacity";

export function NodeHandles() {
  return (
    <>
      <Handle id="top" type="source" position={Position.Top} className={handleClass} />
      <Handle id="top" type="target" position={Position.Top} className={handleClass} />
      <Handle id="bottom" type="source" position={Position.Bottom} className={handleClass} />
      <Handle id="bottom" type="target" position={Position.Bottom} className={handleClass} />
      <Handle id="left" type="source" position={Position.Left} className={handleClass} style={{ left: -2 }} />
      <Handle id="left" type="target" position={Position.Left} className={handleClass} style={{ left: -2 }} />
      <Handle id="right" type="source" position={Position.Right} className={handleClass} />
      <Handle id="right" type="target" position={Position.Right} className={handleClass} />
      {/* Hidden source handle triggered programmatically from NodeActions */}
      <Handle
        id="connect"
        type="source"
        position={Position.Right}
        className="!opacity-0 !border-0 !pointer-events-none"
        style={{ width: 1, height: 1, minWidth: 1, minHeight: 1 }}
      />
    </>
  );
}
