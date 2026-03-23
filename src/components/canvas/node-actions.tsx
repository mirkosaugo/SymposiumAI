"use client";

import { useCallback } from "react";
import { NodeToolbar, Position, useReactFlow } from "@xyflow/react";
import { Link, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GLASS_CONTAINER_CLASS, ICON_BTN_CLASS } from "@/config/constants";
import { useConnectMode } from "@/hooks/use-connect-mode";

interface NodeActionsProps {
  nodeId: string;
  onEdit?: () => void;
}

export function NodeActions({ nodeId, onEdit }: NodeActionsProps) {
  const { deleteElements } = useReactFlow();
  const { startConnect } = useConnectMode();

  const handleConnect = useCallback(() => {
    startConnect(nodeId);
  }, [nodeId, startConnect]);

  return (
    <NodeToolbar position={Position.Right} offset={12} align="center">
      <div className={`flex flex-col items-center gap-1 rounded-full p-1.5 ${GLASS_CONTAINER_CLASS}`}>
        <Tooltip>
          <TooltipTrigger className={ICON_BTN_CLASS} onClick={handleConnect}>
            <Link className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent side="right">Connect</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className={ICON_BTN_CLASS} onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent side="right">Edit</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            className={ICON_BTN_CLASS}
            onClick={() => deleteElements({ nodes: [{ id: nodeId }] })}
          >
            <Trash2 className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent side="right">Delete</TooltipContent>
        </Tooltip>
      </div>
    </NodeToolbar>
  );
}
