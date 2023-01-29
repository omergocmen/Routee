import React from "react";
import {
  Box,
  Button,
  Heading,
  Select,
} from '@chakra-ui/react'
import EmailModalItem from "./emailModalItem";
import QrModalItem from "./qrModalItem";
import { useTranslation } from "react-i18next";


export default function SettingsSection() {
  const { t,i18n } = useTranslation();

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }
  return (
    <Box
      id="history-section"
      w="15%"
      maxH="250px"
      bg="white"
      minW="250px"
      minH="240px"
      overflowY="auto"
      h="full"
      shadow="dark-lg"
      rounded="lg"
    >
      <Box width={"80%"} margin="auto">
          <Heading size="md" m="5px" textAlign="center">
            {t('share')}
          </Heading>
          <EmailModalItem/>
          <QrModalItem/>
          <Box>
            <Select w={"90%"} m="2" onChange={changeLanguageHandler}>
                <option value="tr" >Türkçe</option>
                <option value="en" >English</option>
            </Select>
          </Box>
        </Box>
    </Box>
  )
}
