import { useContext } from "react";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Box, Text, Input } from "@chakra-ui/react";
import { database } from "@/firebase/client";
import { ref, push, onChildAdded, off } from "firebase/database";
import { AuthContext } from "@/auth/context";

export default function Chat({ chat }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const auth = useContext(AuthContext);
  const user = auth.user;
  const { id: chatId, participants } = chat;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = ref(database, `chats/${chatId}/messages`);
    const handleNewMessage = (snapshot) => {
      const childData = snapshot.val();
      setMessages((prev) => [...prev, childData]);
    };

    onChildAdded(messagesRef, handleNewMessage);

    return () => off(messagesRef, "child_added", handleNewMessage);
  }, [chatId]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const message = {
      senderId: user.uid,
      text,
      timestamp: Date.now(),
    };
    const messagesRef = ref(database, `chats/${chatId}/messages`);
    push(messagesRef, message);
    setText("");
  };

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Box>
      <Text>
        Chat with{""}
        {participants.map((participant) => participant.name).join(", ")}
      </Text>
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
            <div ref={messagesEndRef} />
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
