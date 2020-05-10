import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { isEmpty } from "../../../helpers/CustomValidators";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";

class SignUp1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmationPassword: "",
      firstName: "",
      lastName: "",
      gender: "male",
      errors: {},
      success: {},
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    axios
      .post("https://localhost:8080/api/auth/signUp", {
        email: this.state.email,
        password: this.state.password,
        confirmationPassword: this.state.confirmationPassword,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender === "male" ? true : false,
      })
      .then((response) => {
        console.log("c bon" + response);
        this.setState({ success: response.data.success, errors: {} });
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
                  <i className="feather icon-user-plus auth-icon" />
                </div>
                <h3 className="mb-4">Sign up</h3>
                <form onSubmit={this.onFormSubmit}>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      name="firstName"
                      className={
                        this.state.errors && this.state.errors.firstName
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.firstName}
                      onChange={this.onInputChange}
                      placeholder="firstname"
                    />
                    <div className="invalid-feedback">
                      {this.state.errors.firstName}
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      name="lastName"
                      className={
                        this.state.errors && this.state.errors.lastName
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.lastName}
                      onChange={this.onInputChange}
                      placeholder="lastname"
                    />
                    <div className="invalid-feedback">
                      {this.state.errors.lastName}
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        checked={this.state.gender === "male"}
                        onChange={this.onInputChange}
                        id="inlineRadio1"
                        value="male"
                        placeholder="gender"
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        checked={this.state.gender === "female"}
                        onChange={this.onInputChange}
                        id="inlineRadio2"
                        value="female"
                      />
                      <label className="form-check-label" for="inlineRadio2">
                        female
                      </label>
                    </div>
                  </div>
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
                  <div className="input-group mb-4">
                    <input
                      id="password2"
                      name="confirmationPassword"
                      type="password"
                      className={
                        this.state.errors &&
                        this.state.errors.confirmationPassword
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.confirmationPassword}
                      onChange={this.onInputChange}
                      placeholder="confirm password"
                    />
                    <div className="invalid-feedback">
                      {this.state.errors.confirmationPassword}
                    </div>
                  </div>
                  <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      <input
                        type="checkbox"
                        name="checkbox-fill-2"
                        id="checkbox-fill-2"
                      />
                      <label htmlFor="checkbox-fill-2" className="cr">
                        Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a>{" "}
                        weekly.
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary shadow-2 mb-4"
                  >
                    Sign up
                  </button>
                  <a
                    href="https://localhost:8080/auth/facebook"
                    className="btn btn-primary"
                  >
                    Log in with Facebook
                  </a>
                  {!isEmpty(this.state.errors) && (
                    <div
                      style={{ marginTop: "10px" }}
                      className="alert alert-danger"
                      role="alert"
                    >
                      form value(s) is (are) unvalid
                    </div>
                  )}
                </form>
                {this.state.success && this.state.success.global && (
                  <div
                    className="alert alert-success"
                    style={{ marginTop: "10px" }}
                    role="alert"
                  >
                    {this.state.success.global}
                  </div>
                )}
                <p className="mb-0 text-muted">
                  Allready have an account?{" "}
                  <NavLink to="/auth/signin-1">Login</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignUp1;
