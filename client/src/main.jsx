import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from 'react-router-dom';
import { store } from "./Redux/store.js";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={store}>
    <NextUIProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </NextUIProvider>
  </Provider>

);
