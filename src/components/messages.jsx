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
import { useEffect, useState, useContext } from "react";
import ToogleIcon from "./icons/toggle";
import CloseChatIcon from "./icons/closeChatIcon";
import Chat from "./chat";
import { getUserChats } from "@/services/chat";
import { AuthContext } from "@/auth/context";

export default function Messages() {
  const [isCollapsed, toggle] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUserChats(user?.uid).then((chats) => {
      setChats(chats);
    });
  }, [user]);

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
          {!isCollapsed && !activeChat && (
            <UnorderedList mt={4} mr={0} ml={0}>
              {chats?.map((chat) => (
                <Button
                  key={chat.id}
                  w="full"
                  variant="ghost"
                  onClick={() => setActiveChat(chat)}
                >
                  <HStack w="full">
                    <Avatar size="sm" src={chat.participants[0].avatar} />
                    <Text>{chat.participants[0].name}</Text>
                  </HStack>
                </Button>
              ))}
            </UnorderedList>
          )}
          {activeChat && <Chat chat={activeChat} />}
        </Box>
      </Box>
    </Portal>
  );
}
