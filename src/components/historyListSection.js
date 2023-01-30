import React, { useEffect, useState } from "react";
import { Box, Heading, List, ListItem, Select, Text, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDeviceHistory } from "../store/deviceHistorySlice";

export default function HistoryListSection(props) {
  const { t } = useTranslation();
  const deviceHistory = useSelector(
    (state) => state.deviceHistory.deviceHistory
  );
  const dispatch = useDispatch();
  const toast=useToast();

  useEffect(() => {
    const params = { deviceKey: localStorage.getItem("deviceKey") };
    dispatch(getDeviceHistory(params));
  }, [JSON.stringify(deviceHistory)]);

  const setDestination=(historyItem)=>{
    props.destinaton.current.value=historyItem.name;
    toast({
      title: t('info'),
      description:historyItem.name+" "+t('chosenAsDestination'),
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
      bg="white"
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
                borderBottom={"1px"}
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
