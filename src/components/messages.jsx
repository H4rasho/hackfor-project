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
import BackIcon from "./icons/back";
import { ChatContext } from "@/chat/context";

export default function Messages() {
  const { isCollapsed, toggle, activeChat, setActiveChat } =
    useContext(ChatContext);
  const [chats, setChats] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    getUserChats(user.uid).then((chats) => {
      setChats(chats);
    });
  }, [user]);

  if (!user) return null;

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
            <Heading size="lg">Mensajes</Heading>
            <HStack>
              {activeChat && !isCollapsed && (
                <Button
                  onClick={() => setActiveChat(null)}
                  variant="ghost"
                  rounded="full"
                  _hover={{ bg: "gray.300" }}
                  size="sm"
                >
                  <BackIcon />
                </Button>
              )}
              <Button
                onClick={() => toggle(!isCollapsed)}
                variant="ghost"
                rounded="full"
                _hover={{ bg: "gray.300" }}
                size="sm"
              >
                {isCollapsed ? <ToogleIcon /> : <CloseChatIcon />}
              </Button>
            </HStack>
          </HStack>
          {!isCollapsed && !activeChat && (
            <UnorderedList mt={4} mr={0} ml={0}>
              {chats?.map((chat) => {
                const { participants } = chat;
                if (participants.length)
                  return (
                    <Button
                      key={chat.id}
                      w="full"
                      variant="ghost"
                      onClick={() => setActiveChat(chat)}
                    >
                      <HStack w="full">
                        <Avatar size="sm" src={participants[0].avatar} />
                        <Text>{participants[0].name}</Text>
                      </HStack>
                    </Button>
                  );
              })}
            </UnorderedList>
          )}
          {!isCollapsed && activeChat && <Chat chat={activeChat} />}
        </Box>
      </Box>
    </Portal>
  );
}
