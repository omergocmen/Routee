import { combineReducers, configureStore } from "@reduxjs/toolkit";
import poi from "./poiSlice";
import weather from './weatherSlice';
import deviceHistory from "./deviceHistorySlice";
import email from "./emailSlice";
import device from "./deviceSlice"

const combinedReducers = combineReducers({
    poi,
    weather,
    device,
    email,
    deviceHistory
});

const store = configureStore({
    reducer: combinedReducers
});

export default store;