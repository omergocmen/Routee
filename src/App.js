import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  List,
  ListItem,
  Select,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  FaBicycle,
  FaBuilding,
  FaBus,
  FaCar,
  FaTimes,
  FaWalking,
} from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Data,
  Marker,
  //TrafficLayer,
  Autocomplete,
  //TransitLayer,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const center = { lat: 41.015137, lng: 28.97953 };

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAJZoYbQOrF33cxskYA3gGvAOJ6N4_ifEo",
    libraries: ["places", "visualization"],
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const toast = useToast();
  const [travelMode, setTravelMode] = useState();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [visiblePanel, setVisiblePanel] = useState("hidden");
  const sidebar = document.getElementById("sidebar");

  const originRef = useRef();
  const destiantionRef = useRef();

  useEffect(() => {
    setTravelMode(google.maps.TravelMode.DRIVING);
  }, []);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    setVisiblePanel("visible");
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: travelMode,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <Flex position="relative" h="100vh" w="100vw">
      <Box position="absolute" right={0} top={0} h="100%" w="100%">
        <GoogleMap
          id="map"
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {/* <TransitLayer /> */}
          <Marker position={center} />
          {/* <TrafficLayer position={center} /> */}
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
        m={4}
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
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>
          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Rotayı Hesapla
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-around">
          <Text>Uzaklık: {distance} </Text>
          <Text>Tahmini Süre: {duration} </Text>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="end">
          <IconButton
            icon={<FaBus />}
            isRound
            bg={travelMode===google.maps.TravelMode.TRANSIT?"blue.200":null}
            onClick={() => {
              setTravelMode(google.maps.TravelMode.TRANSIT);
              console.log(travelMode);
            }}
          />
          <IconButton
            bg={travelMode===google.maps.TravelMode.DRIVING?"blue.200":null}
            icon={<FaCar />}
            isRound
            onClick={() => {
              setTravelMode(google.maps.TravelMode.DRIVING);
            }}
          />
          <IconButton
            icon={<FaWalking />}
            isRound
            bg={travelMode===google.maps.TravelMode.WALKING?"blue.200":null}
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
      </Box>
      <Accordion
        position="absolute"
        bottom="0"
        defaultIndex={[0]}
        allowMultiple
        w={visiblePanel === "visible" ? "85%" : "100%"}
      >
        <AccordionItem>
          <h2>
            <AccordionButton bg="yellow.300" justifyContent="center">
              <Box as="span">Popüler Varış Noktaları</Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
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
              <Box
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
              <Box
                w="30%"
                maxH="250px"
                bg="HighlightText"
                minH="240px"
                overflowY="auto"
                h="full"
                shadow="dark-lg"
                rounded="lg"
              >
                <Heading size="md" m="5px" textAlign="center">
                  Daha Önce Buradan Ziyaret Edilenler
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
              <Box
                w="30%"
                maxH="250px"
                minH="240px"
                bg="HighlightText"
                overflowY="auto"
                h="full"
                shadow="dark-lg"
                rounded="lg"
              >
                <Heading size="md" m="5px" textAlign="center">
                  Daha Önce Buradan Ziyaret Edilenler
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
        h="100%"
        zIndex="1"
      >
        <div
          id="sidebar"
          style={{ width: "100%", height: "100%", overflowY: "auto" }}
        ></div>
      </Box>
    </Flex>
  );
}

export default App;
