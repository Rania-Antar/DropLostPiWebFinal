import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../../components/Header/HeaderFront.jsx";
import Footer from "../../components/Footer/FooterFront.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import HeaderLinks from "../../components/Header/HeaderLinksFront.jsx";

import loginPageStyle from "../../jss/material-kit-pro-react/views/loginPageStyle.jsx";

import image from "../../../src/static/img/bg7.jpg";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      success: {},
    };

    console.log("props : ", props);
    this.loginMethod = this.loginMethod.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSpanClick = this.onSpanClick.bind(this);
  }

  loginMethod(user, token) {
    localStorage.setItem("Authorization", `JWT ${token}`);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
    this.setState({ role: user.role, user, isAuthenticated: true });
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFormSubmit(e) {
    e.preventDefault();

    axios
      .post("https://localhost:8080/api/auth/signIn", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        const { token, user } = response.data;
        this.loginMethod(user, token);
        if (user.role === "ADMIN") {
          this.props.history.push("/admin");
        } else if (user.role === "CLIENT") {
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          const { errors } = error.response.data;
          this.setState({ errors: errors, success: {} });
        }
      });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  onSpanClick(id) {
    axios
      .get(`https://localhost:8080/api/auth/resendAccountActivationEmail/${id}`)
      .then((response) => {
        this.setState({ success: response.data.success, errors: {} });
        // this.setState({ errors: {} });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          const { errors } = error.response.data;
          this.setState({ errors: errors, success: {} });
        }
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Material Kit PRO React"
          links={<HeaderLinks dropdownHoverColor="info" />}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <form onSubmit={this.onFormSubmit}>
                    <CardHeader
                      color="primary"
                      signup
                      className={classes.cardHeader}
                    >
                      <h4 className={classes.cardTitle}>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fab fa-twitter" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          href="https://localhost:8080/auth/facebook"
                        >
                          <i className="fab fa-facebook" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fab fa-google-plus-g" />
                        </Button>
                      </div>
                    </CardHeader>
                    <p
                      className={`${classes.description} ${classes.textCenter}`}
                    >
                      Or Be Classical
                    </p>
                    >
                    <CardBody signup>
                      <div className="input-group mb-3">
                        <input
                          type="email"
                          name="email"
                          className={
                            this.state.errors && this.state.errors.email
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          value={this.state.email}
                          onChange={this.onInputChange}
                          placeholder="Email..."
                        />
                        <div className="invalid-feedback">
                          {this.state.errors.email}
                        </div>
                      </div>
                      <div className="input-group mb-4">
                        <input
                          name="password"
                          type="password"
                          className={
                            this.state.errors && this.state.errors.password
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="password1"
                          value={this.state.password}
                          onChange={this.onInputChange}
                          placeholder="Password"
                        />
                        <div className="invalid-feedback">
                          {this.state.errors.password}
                        </div>
                      </div>
                    </CardBody>
                    <div class="d-flex justify-content-around">
                      <div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="materialLoginFormRemember"
                          />
                          <label
                            class="form-check-label"
                            for="materialLoginFormRemember"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div>
                        <a href="/forgotPassword">Forgot password?</a>
                      </div>
                    </div>
                    <div className={classes.textCenter}>
                      <Button type="submit" simple color="primary" size="lg">
                        Get started
                      </Button>
                    </div>
                    <div class="d-flex justify-content-around">
                      <p className="mb-0 text-muted">
                        Not a member ? <NavLink to="/signup">Signup</NavLink>
                      </p>
                    </div>
                  </form>
                  {this.state.errors.global && (
                    <div
                      style={{ marginTop: "8px" }}
                      className="alert alert-danger"
                      role="alert"
                    >
                      {this.state.errors.global}
                      {this.state.errors.global.includes("inactive") && (
                        <React.Fragment>
                          {" "}
                          click{" "}
                          <span
                            style={{
                              cursor: "pointer",
                              color: "blue",
                              textDecoration: "underline",
                            }}
                            onClick={() => {
                              this.onSpanClick(this.state.errors.userId);
                            }}
                          >
                            hire
                          </span>{" "}
                          to resent the activation e-mail
                        </React.Fragment>
                      )}
                    </div>
                  )}

                  {this.state.success && this.state.success.global && (
                    <div
                      className="alert alert-success"
                      style={{ marginTop: "10px" }}
                      role="alert"
                    >
                      {this.state.success.global}
                    </div>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer
            className={classes.footer}
            content={
              <div>
                <div className={classes.left}></div>
                <div className={classes.right}>
                  &copy; {1900 + new Date().getYear()} , made with{" "}
                  <Favorite className={classes.icon} /> by{" "}
                  <a href="#">Brainiacs</a>
                </div>
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(loginPageStyle)(LoginPage);
