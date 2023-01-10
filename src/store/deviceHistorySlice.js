import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "../helpers/baseAxios";

export const saveDeviceHistory = createAsyncThunk("/history/device", async (request) => {
  return baseAxios.post("/history/device",request.body,{params:request.params}).then((response) => {
    return {name:request.body.endName};
  });
});

export const getDeviceHistory = createAsyncThunk("/history/all", async (params) => {
  return baseAxios.get("/history/all",{params}).then((response) => {
    return response.data.data;
  });
});


const deviceHistorySlice = createSlice({
  name: "deviceHistory",
  initialState: {
    deviceHistory: [],
  },
  extraReducers: {
    [getDeviceHistory.fulfilled]: (state, action) => {
      state.deviceHistory = action.payload;
    },
    [saveDeviceHistory.fulfilled]: (state, action) => {
      state.deviceHistory = [...state.deviceHistory,action.payload];
    }
  }
});

export default deviceHistorySlice.reducer;