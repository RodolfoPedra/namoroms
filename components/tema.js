import { createTheme } from "@material-ui/core";

const tema = createTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#af8630",
      main: "#FAC045",
      dark: "#fbcc6a",
      contrastText: "#000",
    },
    secondary: {
      light: "#2154b2",
      main: "#3079ff",
      dark: "#5993ff",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: ["proxima-nova", "sans-serif"].join(","),
  },
});

export default tema;
