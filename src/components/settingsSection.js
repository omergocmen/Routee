import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from '@chakra-ui/react'


export default function SettingsSection() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <Box
      id="history-section"
      w="15%"
      maxH="250px"
      bg="HighlightText"
      minH="240px"
      overflowY="auto"
      h="full"
      shadow="dark-lg"
      rounded="lg"
    >
      <Box width={"80%"} margin="auto">
          <Heading size="md" m="5px" textAlign="center">
          Paylaş
          </Heading>
        <Button onClick={onOpen} w="90%" margin="2">E-posta ile Paylaş</Button>
        <Button onClick={onOpen} w="90%" margin="2">QR ile Paylaş</Button>
        <Button onClick={onOpen} w="90%" margin="2">Dil Desteği Gelecek</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input ref={initialRef} placeholder='First name' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder='Last name' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </Box>
    </Box>
  )
}
