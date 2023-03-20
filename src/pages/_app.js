// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { AuthProvider } from "@/auth/context";
import Chat from "@/components/messages";
import { ChatProvider } from "@/chat/context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChatProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <Chat />
        </ChakraProvider>
      </ChatProvider>
    </AuthProvider>
  );
}

export default MyApp;
