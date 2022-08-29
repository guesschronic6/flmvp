import { useContext } from "react";
import { ConfigContext } from "./index";

function useConfigContext() {
  const configContext = useContext(ConfigContext);

  return {};
}

export { useConfigContext };
