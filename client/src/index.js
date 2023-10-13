import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { app } from "./firebase.config";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} app={app}>
    <PersistGate Loading={"loading"} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
