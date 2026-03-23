// This component is no longer used in the brainstorming app.
// Kept as placeholder to avoid import errors in case it's referenced elsewhere.
"use client";

import { memo } from "react";
import { type NodeProps } from "@xyflow/react";

function GroupNodeComponent({ data }: NodeProps) {
  return <div />;
}

export const GroupNodeComponent_ = memo(GroupNodeComponent);
