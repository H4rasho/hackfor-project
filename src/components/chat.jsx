import { useContext } from "react";
import { useEffect, useState } from "react";
import { Box, Text, Input } from "@chakra-ui/react";
import { database } from "@/firebase/client";
import { ref, push, onChildAdded, off } from "firebase/database";
import { AuthContext } from "@/auth/context";

export default function Chat({ chat }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const auth = useContext(AuthContext);
  const user = auth.user;

  const chatId = chat.id;
  const activeUser = chat.participants[0];

  useEffect(() => {
    const messagesRef = ref(database, `chats/${chatId}/messages`);

    const handleNewMessage = (snapshot) => {
      const childData = snapshot.val();
      setMessages((prev) => [...prev, childData]);
    };

    onChildAdded(messagesRef, handleNewMessage);

    // Eliminar el listener anterior antes de registrar uno nuevo
    return () => off(messagesRef, "child_added", handleNewMessage);
  }, [chatId]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const message = {
      senderId: user.uid,
      text,
    };
    const messagesRef = ref(database, `chats/${chatId}/messages`);
    push(messagesRef, message);
    setText("");
  };

  return (
    <Box>
      <Text>Chat with {activeUser.name}</Text>
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="md"
        p={4}
        h={320}
        overflowY="auto"
        display="flex"
        flexDirection="column"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            mb={4}
            bg={message.senderId === user.uid ? "ternary" : "gray.100"}
            w="max-content"
            p={2}
            rounded="xl"
            alignSelf={
              message.senderId === user.uid ? "flex-end" : "flex-start"
            }
          >
            <Text>{message.text}</Text>
          </Box>
        ))}
      </Box>
      <form onSubmit={handleSubmitMessage}>
        <Input
          position="fixed"
          bottom={4}
          w={300}
          border="1px"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </Box>
  );
}
