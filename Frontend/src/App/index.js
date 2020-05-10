import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";
import axios from "axios";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

function checkIfUserConnectedAndReturnUser() {
  let user = {
    isAuthenticated: false,
    role: "",
    user: {},
  };

  if (localStorage.Authorization && localStorage.user) {
    user = {
      isAuthenticated: true,
      role: JSON.parse(localStorage.user).role,
      user: JSON.parse(localStorage.user),
    };
    axios.defaults.headers.common["Authorization"] = localStorage.Authorization;
  }

  return user;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = checkIfUserConnectedAndReturnUser();
    this.loginMethod = this.loginMethod.bind(this);
    this.logoutMethod = this.logoutMethod.bind(this);
    this.updateUserAfterImageChangeMethod = this.updateUserAfterImageChangeMethod.bind(
      this
    );
    this.updateUser = this.updateUser.bind(this);
  }

  loginMethod(user, token) {
    localStorage.setItem("Authorization", `JWT ${token}`);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
    this.setState({ role: user.role, user, isAuthenticated: true });
  }

  logoutMethod() {
    axios.delete("api/auth/SignOut").then((res) => {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("Authorization");
      localStorage.removeItem("user");
      this.setState({ role: "", user: {}, isAuthenticated: false });
    });
  }

  updateUser(user, profileUpdateInfosPageSuccess) {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ role: user.role, user, profileUpdateInfosPageSuccess });
  }
  updateUserAfterImageChangeMethod(imageName) {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      user.image = imageName;
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({ user });
    }
  }
  render() {
    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => <route.component {...props} />}
        />
      ) : null;
    });

    return (
      <Aux>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {menu}
              <Route path="/dash" component={AdminLayout} />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Aux>
    );
  }
}

export default App;
