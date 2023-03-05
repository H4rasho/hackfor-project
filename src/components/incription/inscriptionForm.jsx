import {
  FormControl,
  FormLabel,
  Select,
  Heading,
  OrderedList,
  ListItem,
  Box,
  Text,
  UnorderedList,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import MailIcon from "../icons/mail";
import FreeAgentForm from "./freeAgentForm";

export default function InsciprtionForm({ rules = [], freeAgents = [] }) {
  const [incriptionOption, setIncriptionOption] = useState();

  const handleInscriptionAsFreeAgent = (data) => {
    console.log({ data });
  };

  return (
    <>
      <Box paddingY={8}>
        <Heading size="md">Reglas</Heading>
        <OrderedList mt={4}>
          {rules.map((rule) => (
            <ListItem key={rule}>{rule}</ListItem>
          ))}
        </OrderedList>
      </Box>
      <FormControl>
        <FormLabel>Equipo</FormLabel>
        <Select onChange={(e) => setIncriptionOption(e.target.value)}>
          <option value="alone">Solo</option>
          <option value="search">Buscame un Equipo</option>
          <option value="add">Añadame como Agente Libre</option>
        </Select>
      </FormControl>
      {incriptionOption === "search" && (
        <UnorderedList px={4} py={8}>
          {freeAgents.map((freeAgent) => (
            <ListItem
              key={freeAgent.name}
              display="flex"
              justifyContent="space-between"
            >
              <Text key={freeAgent.name} fontSize="lg" fontWeight="semibold">
                {freeAgent.name}
              </Text>
              <Link
                href={`mailto:${freeAgent.email}`}
                padding={2}
                bg="ternary"
                rounded="md"
              >
                <MailIcon />
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      )}
      {incriptionOption === "add" && (
        <FreeAgentForm onSubmit={handleInscriptionAsFreeAgent} />
      )}
    </>
  );
}
