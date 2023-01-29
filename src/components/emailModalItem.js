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
  FormHelperText,
  Input,
  useToast,
} from "@chakra-ui/react";
import { sendMail } from "../store/emailSlice";
import queryString from "query-string";
import { FaMailBulk } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function EmailModalItem() {

  const { t } = useTranslation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  function sendMailRoute() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      console.log(regex.test(initialRef.current.value));

    if (initialRef.current.value == "") {
      toast({
        title: t('info'),
        description: t('emailRequired'),
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const param = queryString.parse(location.search);

    if (location.search != "" && param.origin && param.destination) {
      sendMail({
        toEmail: initialRef.current.value,
        startLocationName: param?.origin,
        endLocationName: param?.destination,
        routeDetail: location.href,
      },t('Language'))
        .then((response) => {
          toast({
            title: t('info'),
            description: t('mailSentSuccess'),
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: t('info'),
            description: t('mailSentFail'),
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: t('info'),
        description: t('routeNotDrawn'),
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Box>
      <Button onClick={onOpen} w="90%" margin="2">
        <FaMailBulk/>{t('shareEmail')}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('logEmail')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{t('email')}</FormLabel>
              <Input
                type="email"
                ref={initialRef}
                placeholder="ben@example.com"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => sendMailRoute()} mr={3}>
            {t('share')}
            </Button>
            <Button bg="red.500" onClick={onClose}>
            {t('cancel')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
