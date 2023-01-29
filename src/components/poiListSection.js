import React, { useEffect, useState } from "react";
import { Box, Heading, IconButton, List, ListItem, Select, Text, useToast } from "@chakra-ui/react";
import { FaShoppingBasket,FaSeedling,FaMosque,FaLandmark,FaClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllPoi, getAllPoiByDistance} from "../store/poiSlice";
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
  }, [])
  
  useEffect(() => {
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
  function getIcon(item){
    if(item.poiType=="MUSEUM"){
      return(
        <FaLandmark fontSize="20px" />
      )
    }else if(item.poiType=="AVM"){
      return(
        <FaShoppingBasket fontSize="20px" />
      )
    }else if (item.poiType=="MOSQUE"){
      return(
        <FaMosque fontSize="20px" />
      )
    }else{
      return (
        <FaSeedling fontSize="20px" />
      )
    }
    
  }

  function getItemByDistance(){
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat=position.coords.latitude.toString()
      const lon=position.coords.longitude.toString()
      dispatch(getAllPoiByDistance({lat:lat,lon:lon}))
      toast({
        title: "Bilgilendirme",
        description:"En Çok İlgili Görenler Yakınlığa Göre Listelendi",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
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
      bg="white"
      h="full"
      shadow="dark-lg"
      rounded="lg"
    >
      <Heading size="md" m="5px" textAlign="center">
      {t('poi')}
      </Heading>
      <Box px="15px">
        <Select float="left" mx="2" w={"70%"} onChange={(event)=>filterPoiList(event)} >
            {options && options.map((item,index)=>{
              return(
                <option key={index} value={item.key}>{item.label}</option>
              )
            })}
        </Select>
        <IconButton w={"20%"}
          fontSize='20px'
          icon={<FaClock />}
          onClick={()=>getItemByDistance()}
          title="Mesafe Bazlı Sıralama"
        />
      </Box>
      <Box px="15px" py="5px" overflowY="visible">
        <List>
        {filteredPoiList.map((item,index)=>{
          return (
            <ListItem key={index}
            display="flex"
            borderBottom={"1px"}
            rounded="lg"
            onClick={()=>setDestination(item)}
            wordBreak="break-all"
            p="5px"
            my="3px"
          >
            {getIcon(item)}
            <Text mx="10px">{item.name+" ("+(item.description)+")"}</Text>
          </ListItem>
          )
        })}
        </List>
      </Box>
    </Box>
  );
}
