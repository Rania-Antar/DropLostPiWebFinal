import React, { Component } from "react";
import axios from "axios";
import { isEmpty } from "../../helpers/CustomValidators";
class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {},
      success: {}
    };

    console.log("pppp", props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    // console.log({ [e.target.name]: e.target.value });
    //console.log(e.currentTarget);
    this.setState({ [e.target.name]: e.target.value });
  }
  onFormSubmit(e) {
    e.preventDefault();

    axios
      .post("api/auth/forgotPassword", {
        email: this.state.email
      })
      .then(response => {
        console.log(response.data);
        this.setState({ success: response.data.success, errors: {} });
      })
      .catch(error => {
        console.log(error.response);
        if (error.response) {
          const { errors } = error.response.data;
          this.setState({ errors: errors, success: {} });
        }
      });
  }

  render() {
    return (
      <div
        style={{ margin: "50px auto", maxWidth: "400px", minHeight: "80vh" }}
      >
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>Email*</label>
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
            />
            <div className="invalid-feedback">
              {this.state.errors && this.state.errors.email}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {this.state.errors && this.state.errors.global && (
          <div
            style={{ marginTop: "10px" }}
            class="alert alert-danger"
            role="alert"
          >
            {this.state.errors.global}
          </div>
        )}

        {this.state.success && this.state.success.global && (
          <div
            class="alert alert-success"
            style={{ marginTop: "10px" }}
            role="alert"
          >
            {this.state.success.global}
          </div>
        )}
      </div>
    );
  }
}

export default ForgotPasswordPage;
