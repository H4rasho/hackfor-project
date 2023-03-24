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
  Button,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import FreeAgentForm from "./freeAgentForm";
import { registerFreeAgent } from "@/services/hackathon/registerFreeAgent";
import { addNewChat, getChatByParticipants } from "@/services/chat";
import { AuthContext } from "@/auth/context";

export default function InsciprtionForm({ rules = [], freeAgents = {} }) {
  const [incriptionOption, setIncriptionOption] = useState();

  const { user } = useContext(AuthContext);

  const handleInscriptionAsFreeAgent = (data) => {
    registerFreeAgent({ hackathon: 0, ...data });
  };

  const handleIncriptionSendRequest = (otherUser) => {
    const exit = getChatByParticipants([user, otherUser]);
    const message = {
      text: `Hola, me gustaría unirme a tu equipo`,
      senderId: user.uid,
      timestamp: Date.now(),
    };
    if (!exit) {
      addNewChat([user, otherUser], [message]);
    }
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
                <Button onClick={() => handleIncriptionSendRequest(user)}>
                  Enviar Solicitud
                </Button>
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
