import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormLabel,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Switch,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";

import {
  FaBicycle,
  FaBus,
  FaCar,
  FaSearchLocation,
  FaTimes,
  FaWalking,
} from "react-icons/fa";

import {
  GoogleMap,
  Marker,
  Autocomplete,
  TrafficLayer,
  TransitLayer,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

import { useEffect, useRef, useState } from "react";
import PoiListSection from "./components/poiListSection";
import HistoryListSection from "./components/historyListSection";
import WeatherSection from "./components/weatherSection";
import SettingsSection from "./components/settingsSection";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { register } from "./store/deviceSlice";
import { saveDeviceHistory } from "./store/deviceHistorySlice";

function App() {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [visiblePanel, setVisiblePanel] = useState("hidden");
  const [transitLayer,setTransitLayer] = useState(false);
  const [trafficLayer,setTrafficLayer] = useState(false);

  const { t } = useTranslation();

  const sidebar = document.getElementById("sidebar");
  const originRef = useRef();
  const destiantionRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const mode = queryString.parse(location.search).travelmode;
    if (mode != undefined && mode != "") {
      setTravelMode(mode);
    }
  }, []);


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: JSON.parse(process.env.REACT_APP_MAP_LIB),
  });
  if (!isLoaded) {
    return <SkeletonText />;
  }

  function saveHistory(startName, endName) {
    if (!localStorage.getItem("deviceKey")) {
      register().then((response) => {
        localStorage.setItem("deviceKey", response.data.data.deviceKey);
        const request = {
          body: {
            startName,
            endName,
            startLon: "",
            endLon: "",
            startLat: "",
            startLon: "",
          },
          params: { deviceKey: response.data.data.deviceKey },
        };
        dispatch(saveDeviceHistory(request));
      });
    } else {
      const deviceKey = localStorage.getItem("deviceKey");
      const request = {
        body: {
          startName,
          endName,
          startLon: "",
          endLon: "",
          startLat: "",
          startLon: "",
        },
        params: { deviceKey: deviceKey },
      };
      dispatch(saveDeviceHistory(request));
    }
  }

  function setLocation() {
    originRef.current.value = "Konumunuz(Your Location) ◎";
    navigator.geolocation.getCurrentPosition(function (position) {
      setStartLocation(
        position.coords.latitude.toString() +
          ", " +
          position.coords.longitude.toString()
      );
    });

    toast({
      title: "Bilgilendirme",
      description: "Başlangıç Konumunuz Ayarlandı",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      toast({
        title: "Bilgilendirme",
        description: "Lütfen Başlangıç Ve Bitiş Konumunuzu Doğru Giriniz",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (originRef.current.value === "Konumunuz(Your Location) ◎" && startLocation !== "") {
      showInMap(startLocation);
    } else {
      showInMap(originRef.current.value);
    }
  }
  function mapLoaded() {
    const query = location.search;
    const params = queryString.parse(query);
    if (
      location.search != "" &&
      params.origin &&
      params.destination &&
      params.travelmode
    ) {
      originRef.current.value = params.origin;
      destiantionRef.current.value = params.destination;
      setTravelMode(params.travelmode);
      calculateRoute();
    }
  }

  function showInMap(start) {
    navigate(
      "/?origin=" +
        start +
        "&destination=" +
        destiantionRef.current.value +
        "&travelmode=" +
        travelMode
    );
    const directionsService = new google.maps.DirectionsService();
    directionsService
      .route({
        origin: start,
        language: t("selectedLanguage"),
        destination: destiantionRef.current.value,
        travelMode: travelMode,
        provideRouteAlternatives:true,
      })
      .then((results) => {
        setDirectionsResponse(results);
        const leg = results.routes[0].legs[0];
        setDistance(leg.distance.text);
        setDuration(leg.duration.text);
        setVisiblePanel("visible");
        saveHistory(start, destiantionRef.current.value);
      })
      .catch(() => {
        toast({
          title: "Bilgilendirme",
          description:
            "Böyle bir rota oluşturamadı. Lütfen başlangıç, varış ve taşıt tipi seçimlerine dikkat edin",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      });
  }

  function clearRoute() {
    window.location.replace("http://localhost:3000/")
  }

  function onChangeTraffic(e){
    setTrafficLayer(e.target.checked)
  }
  function onChangeTransit(e){
    setTransitLayer(e.target.checked)
  }
  const center = JSON.parse(process.env.REACT_APP_MAP_CENTER);
  const mapOptions = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  return (
    <Flex position="relative" h="100vh" minH={"800px"} w="100vw">
      <WeatherSection />
      <Box position="absolute" right={0} top={0} h="100vh" w="100vw">
        <GoogleMap
          id="map"
          center={center}
          onLoad={mapLoaded}
          zoom={15}
          mapContainerStyle={{
            minWidth: "1200px",
            minHeight:"800px",
            width: "100%",
            height: "100%",
          }}
          options={mapOptions}
        >
          {transitLayer?<TransitLayer />:null}
          <Marker position={center} />
          {trafficLayer?<TrafficLayer options={()=>{

          }} position={center} />:null}
          {directionsResponse && (
            <DirectionsRenderer
              panel={sidebar}
              directions={directionsResponse}
            />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        marginX="auto"
        minH="170px"
        maxH="18%"
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder={t("origin")} ref={originRef} />
            </Autocomplete>
          </Box>
          <IconButton
            aria-label="center back"
            onClick={() => setLocation()}
            title={t("infoTitle")}
            icon={<FaSearchLocation />}
          />
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder={t("destination")}
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>
          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              {t("calculateRoute")}
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-around">
          <Text>
            {t("distance")}: {distance}{" "}
          </Text>
          <Text>
            {t("duration")}: {duration}{" "}
          </Text>
        </HStack>
        <HStack justifyContent="between" mt={4}>
          <HStack w="50%" spacing={4} gap="4">
            <IconButton
              icon={<FaBus />}
              isRound
              bg={
                travelMode === google.maps.TravelMode.TRANSIT
                  ? "blue.200"
                  : null
              }
              onClick={() => {
                setTravelMode(google.maps.TravelMode.TRANSIT);
              }}
            />
            <IconButton
              bg={
                travelMode === google.maps.TravelMode.DRIVING
                  ? "blue.200"
                  : null
              }
              icon={<FaCar />}
              isRound
              onClick={() => {
                setTravelMode(google.maps.TravelMode.DRIVING);
              }}
            />
            <IconButton
              icon={<FaWalking />}
              isRound
              bg={
                travelMode === google.maps.TravelMode.WALKING
                  ? "blue.200"
                  : null
              }
              onClick={() => {
                setTravelMode(google.maps.TravelMode.WALKING);
              }}
            />
            <IconButton
              icon={<FaBicycle />}
              isRound
              onClick={() => {
                toast({
                  title: "Bilgilendirme",
                  description: "Bu araç tipi şuan kullanılamıyor",
                  status: "info",
                  duration: 2000,
                  isClosable: true,
                });
              }}
            />
          </HStack>
          <HStack w="50%" justifyContent="end" spacing={6}>
            <Box display="flex">
              <FormLabel mb='0' htmlFor="isInvalid">Trafik</FormLabel>
              <Switch onChange={(e)=>onChangeTraffic(e)} colorScheme="green"/>
            </Box>
            <Box display="flex">
              <FormLabel mb='0' htmlFor="isInvalid">Toplu Taşıma</FormLabel>
              <Switch onChange={(e)=>onChangeTransit(e)} colorScheme="green" />
            </Box>
          </HStack>
        </HStack>
      </Box>
      <Accordion
        position="absolute"
        bottom="0"
        defaultIndex={[0]}
        minW="800px"
        allowMultiple
        w={visiblePanel === "visible" ? "85%" : "100%"}
      >
        <AccordionItem>
          <Heading>
            <AccordionButton bg="yellow.300" justifyContent="center">
              <Box as="span">{t("popularDestinations")}</Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel>
            <Box
              p={4}
              bgColor="white"
              justifyContent="space-around"
              shadow="base"
              display="flex"
              m="auto"
              bg="transparent"
              h="28%"
              zIndex="1"
            >
              <PoiListSection destinaton={destiantionRef} />
              <HistoryListSection destinaton={destiantionRef} />
              <SettingsSection />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box
        visibility={visiblePanel}
        p={4}
        borderRadius="lg"
        bgColor="white"
        shadow="base"
        w="15%"
        ml="5"
        minW="250px"
        h="100%"
        bg={"azure"}
        overflowY={"auto"}
        zIndex="1"
      >
        <div id="sidebar"/>
      </Box>
    </Flex>
  );
}

export default App;
