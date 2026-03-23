import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

/**
 * Type-safe access to node data with an update helper.
 */
export function useNodeData<T>(id: string, data: Record<string, unknown>) {
  const nodeData = data as unknown as T;
  const { updateNodeData } = useReactFlow();

  const update = useCallback(
    (patch: Partial<T>) => updateNodeData(id, patch as Record<string, unknown>),
    [id, updateNodeData]
  );

  return [nodeData, update] as const;
}
