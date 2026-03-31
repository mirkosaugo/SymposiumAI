"use client";

import { createContext, use } from "react";

export interface ChainFlowState {
  chainFromRun: (runNodeId: string) => void;
}

export const ChainFlowContext = createContext<ChainFlowState>({
  chainFromRun: () => {},
});

export function useChainFlow() {
  return use(ChainFlowContext);
}
