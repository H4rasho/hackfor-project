import {
  Button,
  Box,
  Portal,
  Heading,
  HStack,
  UnorderedList,
  Avatar,
  Text,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import ToogleIcon from "./icons/toggle";
import CloseChatIcon from "./icons/closeChatIcon";

const user = {
  name: "John Doe",
  avatar: "https://bit.ly/dan-abramov",
};

export default function Chat() {
  const [isCollapsed, toggle] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

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
              <Button
                w="full"
                variant="ghost"
                onClick={() => setActiveUser(user)}
              >
                <HStack as="li" w="full">
                  <Avatar size="sm" src={user.avatar} />
                  <Text>{user.name}</Text>
                </HStack>
              </Button>
            </UnorderedList>
          )}
          {!isCollapsed && activeUser && (
            <Box>
              <Text>Chat with {activeUser.name}</Text>
              <Input position="fixed" bottom={4} w={300} border="1px" />
            </Box>
          )}
        </Box>
      </Box>
    </Portal>
  );
}
