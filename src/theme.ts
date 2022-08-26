import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customColor: {
      green: string;
      green2: string;
    };
  }
  interface ThemeOptions {
    customColor?: {
      green?: string;
      green2?: string;
    };
  }
}

const theme = createTheme({
  customColor: {
    green: "#0CCE37",
    green2: "#1FBE9F",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 420,
      md: 570,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#1198F7",
    },
    success: {
      main: "#26de81",
    },

    error: {
      main: "#fc5c65",
    },
    secondary: {
      main: "#EEF4FC",
    },
    text: {
      primary: "#FFF",
      secondary: "#B5B5B5",
    },
    background: {
      default: "#434045",
      paper: "#484649",
    },
    divider: "#928d94",
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: "textPrimary",
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: "none",
          background: "white",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        sizeSmall: {},
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
        color: "primary",
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          margin: "2px 5px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "3px 3px 6px 0px rgba(0,0,0,0.15)",
          background: "white",
        },
      },
    },
  },
});

export { theme };
