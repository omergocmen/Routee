import React from "react";
import { Box, Heading, List, ListItem, Select, Text } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function HistoryListSection() {

  const { t } = useTranslation();

  return (
    <Box
    id="history-section"
    w="30%"
    maxH="250px"
    minW="200px"
    bg="HighlightText"
    minH="240px"
    overflowY="auto"
    h="full"
    shadow="dark-lg"
    rounded="lg"
  >
    <Heading size="md" m="5px" textAlign="center">
    {t('history')}
    </Heading>
    <Box px="15px" py="5px" overflowY="visible">
      <List>
        <ListItem
          shadow="dark-lg"
          display="flex"
          rounded="lg"
          p="5px"
          my="3px"
        >
          <FaBuilding fontSize="20px" />
          <Text mx="10px">Lorem ipsum dolor sit amet</Text>
        </ListItem>
        <ListItem
          shadow="dark-lg"
          display="flex"
          rounded="lg"
          p="5px"
          my="3px"
        >
          <FaBuilding fontSize="20px" />
          <Text mx="10px">Lorem ipsum dolor sit amet</Text>
        </ListItem>
        <ListItem
          shadow="dark-lg"
          display="flex"
          rounded="lg"
          p="5px"
          my="3px"
        >
          <FaBuilding fontSize="20px" />
          <Text mx="10px">Lorem ipsum dolor sit amet</Text>
        </ListItem>
        <ListItem
          shadow="dark-lg"
          display="flex"
          rounded="lg"
          p="5px"
          my="3px"
        >
          <FaBuilding fontSize="20px" />
          <Text mx="10px">Lorem ipsum dolor sit amet</Text>
        </ListItem>
      </List>
    </Box>
  </Box>
  )
}
