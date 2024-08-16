import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./storeFile/store.js";
import ReactDOM from "react-dom";
import Clock from "./Clock.jsx";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Clock />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
