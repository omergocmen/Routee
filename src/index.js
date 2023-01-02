import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import store from "../src/store/store";
import { Provider } from "react-redux";
import { ChakraProvider, theme } from "@chakra-ui/react";
import App from "./App";
import "./App.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
