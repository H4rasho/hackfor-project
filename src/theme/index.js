import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    bg: "#1d3557",
    primary: "#f1faee",
    secondary: "#e63946",
    ternary: "#a8dadc",
  },
  styles: {
    global: {
      body: {
        bg: "#1d3557",
      },
    },
  },
});
