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
import { registerFreeAgent } from "@/services/hackathon/registerFreeAgent";

export default function InsciprtionForm({ rules = [], freeAgents = {} }) {
  const [incriptionOption, setIncriptionOption] = useState();

  const handleInscriptionAsFreeAgent = (data) => {
    registerFreeAgent({ hackathon: 0, ...data });
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
        <UnorderedList px={6} py={8}>
          {Object.entries(freeAgents).map(([key, agent]) => {
            const { user } = agent;
            return (
              <ListItem
                key={key}
                display="flex"
                justifyContent="space-between"
                m={2}
              >
                <Text fontSize="lg" fontWeight="semibold">
                  {user.email}
                </Text>
                <Link
                  href={`mailto:${user.email}`}
                  padding={2}
                  bg="ternary"
                  rounded="md"
                >
                  <MailIcon />
                </Link>
              </ListItem>
            );
          })}
        </UnorderedList>
      )}
      {incriptionOption === "add" && (
        <FreeAgentForm onSubmit={handleInscriptionAsFreeAgent} />
      )}
    </>
  );
}
