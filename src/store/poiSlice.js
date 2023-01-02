import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "../helpers/baseAxios";

export const getPoi = createAsyncThunk("poi/getall", async () => {
  return baseAxios.get("/posts").then((response) => {
    return response.data;
  });
});

const poiSlice = createSlice({
  name: "poi",
  initialState: {
    poi: [],
  },
  extraReducers: {
    [getPoi.fulfilled]: (state, action) => {
      state.poi = action.payload;
    },
  },
});

export default poiSlice.reducer;