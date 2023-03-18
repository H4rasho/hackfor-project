import {
  Button,
  Box,
  Portal,
  Heading,
  HStack,
  UnorderedList,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ToogleIcon from "./icons/toggle";
import CloseChatIcon from "./icons/closeChatIcon";
import Chat from "./chat";
import { getUserChats } from "@/services/chat";

const user = {
  name: "John Doe",
  avatar: "https://bit.ly/dan-abramov",
};

export default function Messages() {
  const [isCollapsed, toggle] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [chats, setChats] = useState();

  useEffect(() => {
    getUserChats("Jhon").then((chats) => setChats(chats));
  }, []);

  const firstChat = chats && chats[0];

  return (
    <Portal>
      <Box
        position="fixed"
        bottom={0}
        right={7}
        bg="primary"
        color="black"
        borderRadius="md"
        boxShadow="md"
        w={350}
        h={!isCollapsed && 500}
      >
        <Box p={4}>
          <HStack justifyContent="space-between">
            <Heading size="lg">Messages</Heading>
            <Button
              onClick={() => toggle(!isCollapsed)}
              variant="ghost"
              rounded="full"
              _hover={{ bg: "gray.300" }}
            >
              {isCollapsed ? <ToogleIcon /> : <CloseChatIcon />}
            </Button>
          </HStack>
          {!isCollapsed && !activeUser && (
            <UnorderedList mt={4} mr={0} ml={0}>
              {chats?.map((chat) => (
                <Button
                  key={chat.id}
                  w="full"
                  variant="ghost"
                  onClick={() => setActiveUser(user)}
                >
                  <HStack w="full">
                    <Avatar size="sm" src={user.avatar} />
                    <Text>{chat.participants[0]}</Text>
                  </HStack>
                </Button>
              ))}
            </UnorderedList>
          )}
          {activeUser && <Chat activeUser={activeUser} chatId={firstChat.id} />}
        </Box>
      </Box>
    </Portal>
  );
}
