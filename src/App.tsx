import React from "react";
import {
  GeneralContextProvider,
  ForkliftDataContextProvider,
  MainPage,
} from "./components";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          autoHideDuration={5000}
          preventDuplicate
        >
          <GeneralContextProvider>
            <ForkliftDataContextProvider>
              <MainPage />
            </ForkliftDataContextProvider>
          </GeneralContextProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
