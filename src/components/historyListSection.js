import React, { useEffect, useState } from "react";
import { Box, Heading, List, ListItem, Select, Text } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDeviceHistory } from "../store/deviceHistorySlice";

export default function HistoryListSection(props) {
  const { t } = useTranslation();
  const deviceHistory = useSelector(
    (state) => state.deviceHistory.deviceHistory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const params = { deviceKey: localStorage.getItem("deviceKey") };
    dispatch(getDeviceHistory(params));
  }, [JSON.stringify(deviceHistory)]);

  const setDestination=(historyItem)=>{
    props.destinaton.current.value=historyItem.name;
    toast({
      title: "Bilgilendirme",
      description: poi.name+" varış noktası olarak seçildi",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
}

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
        {t("history")}
      </Heading>
      <Box px="15px" py="5px" overflowY="visible">
        <List>
          {deviceHistory.map((item, index) => {
            return (
              <ListItem key={index}
                shadow="dark-lg"
                display="flex"
                rounded="lg"
                onClick={()=>setDestination(item)}
                p="5px"
                my="3px"
              >
                <Text mx="10px">{item.name}</Text>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
