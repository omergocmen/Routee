import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "../helpers/baseAxios";

export const register = () => {
  return baseAxios.post("/device/register")
};


const deviceSlice = createSlice({
  name: "device",
  initialState: {
    device: [],
  },
  extraReducers: {
  },
});

export default deviceSlice.reducer;