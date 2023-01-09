import React from "react";
import {
  Box,
  Button,
  Heading,
} from '@chakra-ui/react'
import EmailModalItem from "./emailModalItem";
import QrModalItem from "./qrModalItem";


export default function SettingsSection() {
 
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
          <EmailModalItem/>
          <QrModalItem/>
        </Box>
    </Box>
  )
}
