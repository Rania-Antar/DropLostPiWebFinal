import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

class SignUp1 extends React.Component {
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
        console.log("hedha token :", token);
        this.loginMethod(user, token);
        if (user.role === "ADMIN") {
          this.props.history.push("/api/fbposts");
        } else {
          this.props.history.push("/add_object");
        }
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
    return (
      <Aux>
        <Breadcrumb />
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Login</h3>
                <form onSubmit={this.onFormSubmit}>
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
                      placeholder="Email"
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
                      placeholder="password"
                    />
                    <div className="invalid-feedback">
                      {this.state.errors.password}
                    </div>
                  </div>
                  <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      <input
                        type="checkbox"
                        name="checkbox-fill-1"
                        id="checkbox-fill-a1"
                      />
                      <label htmlFor="checkbox-fill-a1" className="cr">
                        {" "}
                        Save credentials
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary shadow-2 mb-4"
                  >
                    Login
                  </button>
                  <a
                    href="https://localhost:8080/auth/facebook"
                    className="btn btn-primary"
                  >
                    Log in with Facebook
                  </a>
                  <p className="mb-2 text-muted">
                    Forgot password?{" "}
                    <NavLink to="/auth/reset-password-1">Reset</NavLink>
                  </p>
                  <p className="mb-0 text-muted">
                    Don’t have an account?{" "}
                    <NavLink to="/auth/signup-1">Signup</NavLink>
                  </p>
                </form>
                <Link
                  to="/forgotPassword"
                  style={{ marginTop: "10px", display: "block" }}
                >
                  forgot password ?
                </Link>

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
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignUp1;
