import { createContext, useContext } from "react";

interface ConnectModeContextValue {
  connectingFrom: string | null;
  hoveringNode: string | null;
  startConnect: (nodeId: string) => void;
}

export const ConnectModeContext = createContext<ConnectModeContextValue>({
  connectingFrom: null,
  hoveringNode: null,
  startConnect: () => {},
});

export function useConnectMode() {
  return useContext(ConnectModeContext);
}
