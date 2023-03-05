import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Badge,
  HStack,
  Heading,
} from "@chakra-ui/react";

import Modal from "@/components/modal";

export default function HackathonCard({ hackathon }) {
  return (
    <>
      <Card w="full" bg="primary" mt={8}>
        <CardHeader>
          <HStack justifyContent="space-between">
            <Heading size="lg">{hackathon.title}</Heading>
            <Badge bg="ternary">Quedan 3 días</Badge>
          </HStack>
          <HStack justifyContent="space-between">
            <HStack>
              <Text fontWeight="semibold">Inicio: 12/12/2021</Text>
              <Text fontWeight="semibold">Fin: 12/12/2021</Text>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text>{hackathon.description}</Text>
        </CardBody>
        <CardFooter>
          <HStack justifyContent="space-between" w="full">
            <Modal rules={hackathon.rules} freeAgents={hackathon.freeAgents} />
            <Text fontSize="xl">40 Inscritos</Text>
          </HStack>
        </CardFooter>
      </Card>
    </>
  );
}
