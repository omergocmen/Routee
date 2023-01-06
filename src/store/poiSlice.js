import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "../helpers/baseAxios";

export const getPoiByType = createAsyncThunk("poi/type-filter?poiType", async (data) => {
  return baseAxios.get("/poi/type-filter?poiType="+data).then((response) => {
    return response.data.data;
  });
});
export const getAllPoi = createAsyncThunk("poi/all", async () => {
  return baseAxios.get("/poi/all").then((response) => {
    return response.data.data;
  });
});



const poiSlice = createSlice({
  name: "poi",
  initialState: {
    poi: [],
  },
  extraReducers: {
    [getPoiByType.fulfilled]: (state, action) => {
      state.poi = action.payload;
    },
    [getAllPoi.fulfilled]: (state, action) => {
      state.poi = action.payload;
    },
    

  },
});

export default poiSlice.reducer;