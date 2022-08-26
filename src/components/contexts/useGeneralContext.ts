import { useContext } from "react";
import { GeneralContext } from "./index";

function useGeneralContext() {
  const generalContext = useContext(GeneralContext);

  return {
    appState: generalContext.appState,
  };
}

export { useGeneralContext };
