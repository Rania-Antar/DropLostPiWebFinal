import React, { Component } from "react";
import AppRouter from "./apiRoutes";
require("./configs/axiosConfiguration");
class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    );
  }
}

export default App;
