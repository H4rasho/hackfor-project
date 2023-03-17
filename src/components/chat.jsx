import { useEffect, useState } from "react";
import { Box, Text, Input } from "@chakra-ui/react";
import { database } from "@/firebase/client";
import { ref, push, onChildAdded } from "firebase/database";

export default function Chat({ activeUser, chatId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const messagesRef = ref(database, "chats/chat_id_1/messages");

    const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
      const childData = snapshot.val();
      setMessages((prev) => [...prev, childData]);
    });
    return () => unsubscribe;
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const message = {
      senderId: "Jhon",
      text,
    };
    const messagesRef = ref(database, "chats/chat_id_1/messages");
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
        h={300}
        overflowY="auto"
      >
        {messages.map((message, index) => (
          <Box key={index} mb={4}>
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
