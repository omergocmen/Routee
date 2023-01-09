import React, { useState } from "react";
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
  Text,
} from '@chakra-ui/react'
import QRCode from "react-qr-code";
import { FaQrcode } from "react-icons/fa";



export default function QrModalItem() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = useState()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
  
  return (
    <Box>
      <Button onClick={()=>{
        setValue(location.href)
        onOpen()}} w="90%" margin="2">
        <FaQrcode style={{marginRight:"3px"}}/>Qr Kod ile Paylaş
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent textAlign={"center"}>
          <ModalHeader>QR Kod</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <div style={{height: "auto",border:"2px dashed black" , margin: "0 auto", padding:"25px", paddingBottom:"0", maxWidth: 256, width: "100%" }}>
            <QRCode
            size={256}
            style={{height: "auto", maxWidth: "100%", width: "100%" }}
            value={value?value:process.env.REACT_APP_BASE_URL}
            viewBox={`0 0 256 256`}
            />
            <Text fontSize={"lg"} fontWeight="bold" my="4">Routee</Text>
        </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
