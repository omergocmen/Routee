import baseAxios from "../helpers/baseAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendMail = (data,language) => {
  return baseAxios
    .post(
      "/mail/send",data,{params : { language: language }}
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