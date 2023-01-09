import { combineReducers, configureStore } from "@reduxjs/toolkit";
import poi from "./poiSlice";
import weather from './weatherSlice';
import device from "./deviceHistorySlice";
import email from "./emailSlice";

const combinedReducers = combineReducers({
    poi,
    weather,
    device,
    email
});

const store = configureStore({
    reducer: combinedReducers
});

export default store;