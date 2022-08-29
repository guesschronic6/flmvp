import { createContext } from "react";

type ConfigContextProviderProps = {
  children?: React.ReactNode;
};

type ConfigContextProps = {};

const ConfigContext = createContext<ConfigContextProps>({});

const ConfigContextProvider: React.FunctionComponent<
  ConfigContextProviderProps
> = (props) => {
  return (
    <ConfigContext.Provider value={{}}>{props.children}</ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigContextProvider };
