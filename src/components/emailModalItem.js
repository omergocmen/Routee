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
  useToast,
} from "@chakra-ui/react";
import { sendMail } from "../store/emailSlice";
import queryString from "query-string";
import { FaMailBulk } from "react-icons/fa";

export default function EmailModalItem() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  function sendMailRoute() {
    console.log("deneme");
    if (initialRef.current.value == "") {
      toast({
        title: "Bilgilendirme",
        description: "Lütfen Mail Adresinizi Giriniz",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    console.log("deneme2");

    const param = queryString.parse(location.search);

    if (location.search != "" && param.origin && param.destination) {
      sendMail({
        toEmail: initialRef.current.value,
        startLocationName: param?.origin,
        endLocationName: param?.destination,
        routeDetail: location.href,
      })
        .then((response) => {
          toast({
            title: "Bilgilendirme",
            description: "Mail Başarıyla İletildi",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "Bilgilendirme",
            description: "Mail İletilemedi",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Bilgilendirme",
        description: "Henüz Rota Çizilmemiş",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Box>
      <Button onClick={onOpen} w="90%" margin="2">
        <FaMailBulk/>E-posta ile Paylaş
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>E-Posta Adresini Gir</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>E-posta</FormLabel>
              <Input
                type="email"
                ref={initialRef}
                placeholder="ben@example.com"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => sendMailRoute()} mr={3}>
              Paylaş
            </Button>
            <Button bg="red.500" onClick={onClose}>
              iptal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
