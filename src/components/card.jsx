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

export default function HackathonCard() {


  return (
    <>
      <Card w="full" bg="primary" mt={8}>
        <CardHeader>
          <HStack justifyContent="space-between">
            <Heading size="lg">Hackaton Fullstack</Heading>
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
          <Text>
            Primera version de la hackfor de tema libre. La temática principal
            es trabajar un back y un front juntos. Por la parte de back se
            requiere hacer una base de datos (puedes usar Supabase, Cloudflare
            Workers, AWS o el software que más te guste), por la parte de front
            se requerirá programar la interfaz con los datos que te devuelva el
            back.
          </Text>
        </CardBody>
        <CardFooter>
          <HStack justifyContent="space-between" w="full">
              <Modal />
            <Text fontSize="xl">40 Inscritos</Text>
          </HStack>
        </CardFooter>
      </Card>
     
    </>
  );
}
