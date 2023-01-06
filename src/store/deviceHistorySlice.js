import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "../helpers/baseAxios";


export const getDevice = createAsyncThunk("history/device", async () => {
  return baseAxios.get("/history/device").then((response) => {
    return response.data.data;
  });
});


const deviceHistorySlice = createSlice({
  name: "device",
  initialState: {
    device: [],
  },
  extraReducers: {
    
    [getDevice.fulfilled]: (state, action) => {
      state.device = action.payload;
    },
    

  },
});

export default deviceHistorySlice.reducer;