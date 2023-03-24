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
  const daysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    const days = diff / (1000 * 60 * 60 * 24);
    return days.toFixed(0);
  };

  return (
    <>
      <Card w="full" bg="primary" mt={8}>
        <CardHeader>
          <HStack justifyContent="space-between">
            <Heading size="lg">{hackathon.title}</Heading>
            {daysLeft(hackathon.endDate) < 0 ? (
              <Badge colorScheme="red">Finalizado</Badge>
            ) : (
              <Badge bg="ternary">
                {daysLeft(hackathon.endDate)} días restantes
              </Badge>
            )}
          </HStack>
          <HStack justifyContent="space-between">
            <HStack>
              <Text fontWeight="semibold">Inicio: {hackathon.startDate}</Text>
              <Text fontWeight="semibold">Fin: {hackathon.endDate}</Text>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text>{hackathon.description}</Text>
        </CardBody>
        <CardFooter>
          <HStack justifyContent="space-between" w="full">
            <Modal rules={hackathon.rules} freeAgents={hackathon.freeAgents} />
          </HStack>
        </CardFooter>
      </Card>
    </>
  );
}
