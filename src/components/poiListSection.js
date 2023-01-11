import React, { useEffect, useState } from "react";
import { Box, Heading, List, ListItem, Select, Text, useToast } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllPoi} from "../store/poiSlice";
import { useTranslation } from "react-i18next";

export default function PoiListSection(props) {

  const dispatch=useDispatch();
  const poi=useSelector(state=>state.poi.poi)
  const toast=useToast();
  const [filteredPoiList, setFilteredPoiList] = useState([])
  const { t } = useTranslation();

  const options = [
    {
      key: "ALL",
      label: "Tümü (All Poi)",
    },
    {
      key: "MUSEUM",
      label: "Müze (MUSEUM)",
    },
    {
      key: "AVM",
      label: "Avm (AVM)",
    },
    {
      key: "MOSQUE",
      label: "Cami (MOSQUE)",
    },
    {
      key: "PARK",
      label: "Park (PARK)",
    }
  ]

  useEffect(() => {
    dispatch(getAllPoi())
    setFilteredPoiList(poi)
  }, [JSON.stringify(poi)])


  const filterPoiList=(event)=>{
    const item=event.target;
    if(item.value=="ALL"){
      setFilteredPoiList(poi)
    }else{
      const newFilteredList= poi.filter(
        (i) => i.poiType === item.value
      )
      setFilteredPoiList(newFilteredList)
    }
  }

  const setDestination=(poi)=>{
      props.destinaton.current.value=poi.name;
      toast({
        title: t('info'),
        description: poi.name+ t('chosenAsDestination'),
        status: "success",
        duration: 2000,
        isClosable: true,
      });
  }
  
  
  return (
    <Box
      id="poi-section"
      w="30%"
      maxH="250px"
      minH="240px"
      minW="200px"
      overflowY="auto"
      bg="HighlightText"
      h="full"
      shadow="dark-lg"
      rounded="lg"
    >
      <Heading size="md" m="5px" textAlign="center">
      {t('poi')}
      </Heading>
      <Box px="15px">
        <Select onChange={(event)=>filterPoiList(event)} >
            {options && options.map((item,index)=>{
              return(
                <option key={index} value={item.key}>{item.label}</option>
              )
            })}
        </Select>
      </Box>
      <Box px="15px" py="5px" overflowY="visible">
        <List>
        {filteredPoiList.map((item,index)=>{
          return (
            <ListItem key={index}
            shadow="dark-lg"
            display="flex"
            rounded="lg"
            onClick={()=>setDestination(item)}
            wordBreak="break-all"
            p="5px"
            my="3px"
          >
            <FaBuilding fontSize="20px" />
            <Text mx="10px">{item.name}</Text>
          </ListItem>
          )
        })}
        </List>
      </Box>
    </Box>
  );
}
