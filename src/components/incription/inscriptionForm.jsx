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

  const agents = Object.entries(freeAgents)
    .filter(([_, agent]) => agent.user.uid !== user.uid)
    .map(([_, agent]) => agent);

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
          <option value="search">Buscame un Equipo</option>
          <option value="add">Añadame como Agente Libre</option>
        </Select>
      </FormControl>
      {incriptionOption === "search" && (
        <UnorderedList px={6} py={8}>
          {agents.length === 0 ? (
            <Text>No hay agentes libres</Text>
          ) : (
            agents.map(({ user }) => (
              <ListItem
                key={user.uid}
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
            ))
          )}
        </UnorderedList>
      )}
      {incriptionOption === "add" && (
        <FreeAgentForm onSubmit={handleInscriptionAsFreeAgent} />
      )}
    </>
  );
}
