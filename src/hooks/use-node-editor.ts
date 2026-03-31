"use client";

import { createContext, use } from "react";

export interface NodeEditorState {
  editingNodeId: string | null;
  isNewNode: boolean;
  openEditor: (nodeId: string, isNew?: boolean) => void;
  closeEditor: () => void;
}

export const NodeEditorContext = createContext<NodeEditorState>({
  editingNodeId: null,
  isNewNode: false,
  openEditor: () => {},
  closeEditor: () => {},
});

export function useNodeEditor() {
  return use(NodeEditorContext);
}
