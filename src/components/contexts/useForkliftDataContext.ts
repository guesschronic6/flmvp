import { useContext, useMemo } from "react";
import { ForkliftDataContext } from "./ForkliftDataContextProvider";

function useForkliftDataContext() {
  const forkliftDataContext = useContext(ForkliftDataContext);

  return {
    forklift_data: forkliftDataContext.forklift_data,
    is_clear: forkliftDataContext.is_clear,
    is_far: forkliftDataContext.is_far,
    is_very_far: forkliftDataContext.is_very_far,
  };
}

export { useForkliftDataContext };
