import baseAxios from "../helpers/baseAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendMail = (data) => {
  return baseAxios
    .post(
      "/mail/send",data,{params : { language: "TURKISH" }}
    )
    .then((response) => {
      return response.data.data;
    });
};

const emailSlice = createSlice({
    name: "mailResult",
    initialState: {
        mailResult: {},
    },
    extraReducers: {
    },
  });
  
  export default emailSlice.reducer;