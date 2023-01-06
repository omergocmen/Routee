import { combineReducers, configureStore } from "@reduxjs/toolkit";
import poi from "./poiSlice";
import weather from './weatherSlice';
import device from "./deviceHistorySlice";

const combinedReducers = combineReducers({
    poi,
    weather,
    device
});

const store = configureStore({
    reducer: combinedReducers
});

export default store;