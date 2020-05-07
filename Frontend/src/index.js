import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./apiRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "bootstrap/dist/js/bootstrap";

ReactDOM.render(
  <div className="App">
    <AppRouter />
  </div>,
  document.getElementById("root")
);
