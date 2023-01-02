import { combineReducers, configureStore } from "@reduxjs/toolkit";
import poi from "./poiSlice";

const combinedReducers = combineReducers({
    poi,
});

const store = configureStore({
    reducer: combinedReducers
});

export default store;