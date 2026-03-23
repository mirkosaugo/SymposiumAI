"use client";

import { memo, useCallback } from "react";
import {
  BaseEdge,
  EdgeToolbar,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
} from "@xyflow/react";
import { Trash2 } from "lucide-react";
import { GLASS_CONTAINER_CLASS, ICON_BTN_CLASS } from "@/config/constants";

function CustomEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  selected,
}: EdgeProps) {
  const { deleteElements } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const handleDelete = useCallback(() => {
    deleteElements({ edges: [{ id }] });
  }, [id, deleteElements]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} />
      {selected && (
        <EdgeToolbar edgeId={id} x={labelX} y={labelY}>
          <button
            onClick={handleDelete}
            className={`${ICON_BTN_CLASS} ${GLASS_CONTAINER_CLASS}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </EdgeToolbar>
      )}
    </>
  );
}

export const CustomEdge = memo(CustomEdgeComponent);
