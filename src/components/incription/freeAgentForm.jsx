import { useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  TagCloseButton,
  Tag,
  Flex,
  Stack,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import PlusIcon from "../icons/plus";

import { AuthContext } from "@/auth/context";

export default function FreeAgentForm({ onSubmit }) {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);

  const inscriptionHandle = () => {
    onSubmit({
      user,
      tags,
    });
  };

  return (
    <Box mt={4}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input === "") return;
          const exit = tags.find((tag) => tag === input);
          if (!exit) setTags([...tags, input]);
          setInput("");
        }}
      >
        <FormControl>
          <FormLabel>Tecnológias</FormLabel>
          <Stack spacing={4}>
            <InputGroup>
              <Input
                placeHolder="react"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit">
                <PlusIcon />
              </Button>
            </InputGroup>
          </Stack>
          <Flex p={4} flexWrap="wrap" gap={2}>
            {tags.map((tag) => (
              <Tag key={tag} size="lg" bg="ternary">
                {tag}
                <TagCloseButton
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                />
              </Tag>
            ))}
          </Flex>
        </FormControl>
      </form>
      <Button w="full" bg="bg" color="white" onClick={inscriptionHandle}>
        Enviar Solicitud
      </Button>
    </Box>
  );
}
