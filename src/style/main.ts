// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7B5292",
    },
    secondary: {
      main: "#eac4ea",
    },
    text: {
      primary: "#B28E5E",
      secondary: "#000",
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
      color: "#000",
    },
    button: {
      textTransform: "none",
      color: "#B28E5E",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "0 10px",
        },
      },
    },
  },
});

export default theme;
