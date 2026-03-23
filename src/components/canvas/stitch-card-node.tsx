// This component is no longer used in the brainstorming app.
"use client";

import { memo } from "react";
import { type NodeProps } from "@xyflow/react";

function StitchCardNodeComponent({ data }: NodeProps) {
  return <div />;
}

export const StitchCardNode = memo(StitchCardNodeComponent);
