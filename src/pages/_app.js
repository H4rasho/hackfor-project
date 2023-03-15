// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { AuthProvider } from "@/auth/context";
import Chat from "@/components/chat";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Chat />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
