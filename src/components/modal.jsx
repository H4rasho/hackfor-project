import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import InsciprtionForm from "./incription/inscriptionForm";

export default function Modal({ rules, freeAgents }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button bg="secondary" color="primary" onClick={onOpen}>
        Inscribirse
      </Button>
      <ChakraModal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inscripcion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InsciprtionForm rules={rules} freeAgents={freeAgents} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
