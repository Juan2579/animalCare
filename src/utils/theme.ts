"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200E8",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(98, 0, 232, 0.8)", // Morado con opacidad
          },
        },
      },
    },
  },
});

export default theme;
