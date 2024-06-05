import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./Redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { FirebaseProvider } from "./store/firebaseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
<FirebaseProvider>
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <NextUIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NextUIProvider>
    </PersistGate>
  </Provider>
</FirebaseProvider>
);
