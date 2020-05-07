import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";
import "./scss/material-kit-pro-react.scss?v=1.8.0";
import Header from "./Header";
import Components from "views/PresentationPage/PresentationPage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePagee from "views/ProfilePage/ProfilePage.jsx";
import SignUpPage from "views/SignupPage/SignupPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import AddObject from "views/ObjectPage/Object.jsx";
import ListObject from "views/ObjectPage/ObjectList.jsx";
import PersonAdd from "views/PersonAddPage/PersonAddPage.jsx";
import PersonList from "views/PersonsListPage/PersonsListPage.jsx";
import PersonDetail from "views/PersonDetails/PersonDetailsPage.jsx";
import DetailObject from "views/ObjectPage/ObjectDetail.jsx";
import AllComponents from "views/ComponentsPage/ComponentsPage.jsx";
import ProductPage from "views/ProductPage/ProductPage.jsx";

import ProtectedRoute from "./views/Api/Commun/ProtectedRoute";
import ProtectedRouteRedirectToHome from "./views/Api/Commun/ProtectedRouteRedirectToHome";

import ProfilePage from "./views/Api/profile";
import ProfileUpdatePasswordPage from "./views/Api/ProfileUpdatePasswordPage";
import ProfileUpdateInfosPage from "./views/Api/ProfileUpdateInfosPage";
import AccountActivationPage from "./views/Api/accountActivation";
import ForgotPasswordPage from "./views/Api/ForgotPasswordPage";
import ResetPasswordPage from "./views/Api/ResetPasswordPage";
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

class AppRouter extends Component {
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
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <ProtectedRoute
              path="/profile"
              isAuthenticated={this.state.isAuthenticated}
              component={(props) => (
                <ProfilePage
                  {...props}
                  updateUserAfterImageChangeMethod={
                    this.updateUserAfterImageChangeMethod
                  }
                  user={this.state.user}
                />
              )}
            />
            <ProtectedRoute
              path="/updatePassword"
              isAuthenticated={this.state.isAuthenticated}
              component={(props) => <ProfileUpdatePasswordPage {...props} />}
            />
            <ProtectedRoute
              path="/updateProfile"
              isAuthenticated={this.state.isAuthenticated}
              component={(props) => (
                <ProfileUpdateInfosPage
                  success={
                    this.state.profileUpdateInfosPageSuccess
                      ? this.state.profileUpdateInfosPageSuccess
                      : {}
                  }
                  updateUser={this.updateUser}
                  {...props}
                  user={this.state.user}
                />
              )}
            />
            <ProtectedRouteRedirectToHome
              path="/resetPassword/:id"
              isAuthenticated={!this.state.isAuthenticated}
              component={(props) => <ResetPasswordPage {...props} />}
            />
            <ProtectedRouteRedirectToHome
              path="/signIn"
              isAuthenticated={!this.state.isAuthenticated}
              component={(props) => (
                <LoginPage {...props} loginMethod={this.loginMethod} />
              )}
            />
            <ProtectedRouteRedirectToHome
              path="/forgotPassword"
              isAuthenticated={!this.state.isAuthenticated}
              component={(props) => <ForgotPasswordPage {...props} />}
            />
            <ProtectedRouteRedirectToHome
              path="/signUp"
              isAuthenticated={!this.state.isAuthenticated}
              component={(props) => <SignUpPage {...props} />}
            />
            <ProtectedRouteRedirectToHome
              path="/accountActivation/:id"
              isAuthenticated={!this.state.isAuthenticated}
              component={(props) => <AccountActivationPage {...props} />}
            />
            <Route path="/login" component={LoginPage} />

            <Route path="/add_object" component={AddObject} />
            <Route path="/list_object" component={ListObject} />
            <Route path="/detail_object" component={DetailObject} />

            <Route path="/person_add" component={PersonAdd} />
            <Route path="/person_list" component={PersonList} />
            <Route path="/person_detail" component={PersonDetail} />

            <Route path="/admin" component={Admin} />
            <Redirect from="/ad" to="/admin/dashboard" />
            <Route path="/landing-page" component={LandingPage} />
            <Route path="/profile-page" component={ProfilePagee} />
            <Route path="/allComponents" component={AllComponents} />
            <Route path="/product_page" component={ProductPage} />

            <Route path="/" component={Components} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
