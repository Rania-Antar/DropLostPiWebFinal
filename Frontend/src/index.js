import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./apiRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "bootstrap/dist/js/bootstrap";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import reducer from "./store/reducer";
import config from "./config";

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <div className="App">
      <AppRouter />
    </div>
  </Provider>,
  document.getElementById("root")
);
