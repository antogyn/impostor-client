import type { ReactNode } from "react";
import { NameContextProvider } from "./name-context";

function AppContextsProvider({ children }: { children: ReactNode }) {
  return <NameContextProvider>{children}</NameContextProvider>;
}

export default AppContextsProvider;
