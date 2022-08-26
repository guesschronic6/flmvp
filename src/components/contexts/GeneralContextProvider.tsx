import { createContext, useState } from "react";
import { AppState } from "../../types";

type GeneralContextProps = {
  appState: AppState;
};

type GeneralContextProviderProps = {
  children: React.ReactNode;
};

const GeneralContext = createContext<GeneralContextProps>({
  appState: AppState.LOADING,
});

const GeneralContextProvider: React.FunctionComponent<
  GeneralContextProviderProps
> = (props) => {
  const [appState, setAppState] = useState(AppState.UNLOADING);

  return (
    <GeneralContext.Provider value={{ appState }}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export { GeneralContextProvider, GeneralContext };
