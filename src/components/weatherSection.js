import React, { useEffect } from "react";

import { Box, Stack, Image, Text } from "@chakra-ui/react";
import { useDispatch, useSelector} from "react-redux";
import { getTodayWeather } from "../store/weatherSlice";
import { useTranslation } from "react-i18next";

export default function WeatherSection() {
  const { t } = useTranslation();

  const weather=useSelector(state=>state.weather.weather)
  const dispatch = useDispatch()
  const params={latitude:40.9184, longitude:29.2205,language:"TURKISH"}
  useEffect(() => {
    dispatch(getTodayWeather({params}))
  }, [JSON.stringify(weather)])
  return (
    <Box
      id="weather-section"
      w="8%"
      mt="4"
      bg="transparent"
      ml="5"
      maxH="150px"
      minW="120px"
      fontSize="xl"
      zIndex="1"
      h="full"
      rounded="lg"
    >
      <Box justifyContent="center" textAlign="center">
        <Image
          m="auto"
          borderRadius="full"
          w="auto"
          minW="100px"
          h="auto"
          src={weather.weatherIcon}
          alt="Green double couch with wooden legs"
        />
        <Stack>
          <Text fontWeight="bold" color={"blue.600"}>
          {t('weather')} {weather.tempCelsius+"°C "+weather.weatherType}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
