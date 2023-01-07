import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "../helpers/baseAxios";


export const getTodayWeather = createAsyncThunk("weather/today", async (data) => {
  return baseAxios.get("/weather/today",data).then((response) => {
    return response.data.data;
  });
});
export const getThreeDaysWeather = createAsyncThunk("weather/three-days", async (data) => {
    return baseAxios.get("/weather/three-days",data).then((response) => {
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