import { useState } from "react";
import { Input, UnorderedList, ListItem, Tag, Button } from "@chakra-ui/react";

export default function TagInput() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <>
      <Input placeHolder="React" onChange={setInput} />
      <UnorderedList>
        {tags.map((tag) => (
          <ListItem>
            <Tag>{tag}</Tag>
          </ListItem>
        ))}
      </UnorderedList>
      <Button
        w="full"
        bg="ternary"
        mt={2}
        onClick={() => setTags([...tags, input])}
      >
        Añadir
      </Button>
    </>
  );
}
