import React, { useEffect } from "react";
import { Box, Heading, List, ListItem, Select, Text, useToast } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllPoi} from "../store/poiSlice";

export default function PoiListSection(props) {

  const dispatch=useDispatch();
  const poi=useSelector(state=>state.poi.poi)
  const toast=useToast();

  useEffect(() => {
    dispatch(getAllPoi())
  }, [JSON.stringify(poi)])


  const setDestination=(poi)=>{
      props.destinaton.current.value=poi.name;
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
      id="poi-section"
      w="30%"
      maxH="250px"
      minH="240px"
      overflowY="auto"
      bg="HighlightText"
      h="full"
      shadow="dark-lg"
      rounded="lg"
    >
      <Heading size="md" m="5px" textAlign="center">
        En Çok Ziyaret Edilenler
      </Heading>
      <Box px="15px">
        <Select placeholder="Kategori Seçiniz">
          <option value="option1">Müze</option>
          <option value="option2">Sinema</option>
          <option value="option3">Restoran</option>
        </Select>
      </Box>
      <Box px="15px" py="5px" overflowY="visible">
        <List>
        {poi.map((item,index)=>{
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
