import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "../helpers/baseAxios";


export const getTodayWeather = createAsyncThunk("weather/today", async () => {
  return baseAxios.get("/weather/today").then((response) => {
    return response.data.data;
  });
});
export const getThreeDaysWeather = createAsyncThunk("weather/three-days", async () => {
    return baseAxios.get("/weather/three-days").then((response) => {
      return response.data.data;
    });
  });


const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: [],
  },
  extraReducers: {
    
    [getTodayWeather.fulfilled]: (state, action) => {
      state.weather = action.payload;
    },
    [getThreeDaysWeather.fulfilled]: (state, action) => {
        state.weather = action.payload;
      },

  },
});

export default weatherSlice.reducer;