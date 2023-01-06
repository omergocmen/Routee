import React from "react";

import { Box, Stack, Image, Text } from "@chakra-ui/react";
import { FaSun } from "react-icons/fa";

export default function WeatherSection() {
  return (
    <Box
      id="weather-section"
      w="12%"
      mt="5"
      ml="5"
      maxH="180px"
      bg="white"
      zIndex="1"
      h="full"
      shadow="dark-lg"
      rounded="lg"
    >
      <Box padding="2" justifyContent="center" textAlign="center">
        <Image
          m="auto"
          borderRadius="full"
          maxW="120px"
          w="120px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8FDQEa-rUuCQp3LrDp5ztd4_Ap5XETJDWABGL_IPPn0AE6HtK1C7pKInEFlW4LPDGlY&usqp=CAU"
          alt="Green double couch with wooden legs"
        />
        <Stack m={2}>
          <Text size="sm" mt="2" color={"blue.600"}>
            Hava Bugün 18(°) Bulutlu
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
