import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
class ProfileUpdateInfosPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      gender: this.props.user.gender ? "male" : "female",
      phoneNumber: this.props.user.phoneNumber,
      birthDate: this.props.user.birthDate,
      ...this.props.success,
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
      .put("https://localhost:8080/api/users/updateProfile", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender == "male" ? true : false,
        birthDate: this.state.birthDate,
        ...(this.state.phoneNumber && { phoneNumber: this.state.phoneNumber }),
      })
      .then((response) => {
        console.log("ok");
        console.log(response.data);

        this.props.updateUser(response.data.success.user, {
          success: response.data.success,
          error: {},
        });
      })
      .catch((error) => {
        console.log(error);
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
            <label>First name *</label>
            <input
              name="firstName"
              type="text"
              className={
                this.state.errors && this.state.errors.firstName
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.firstName}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">
              {this.state.errors && this.state.errors.firstName}
            </div>
          </div>
          <div className="form-group">
            <label>Last name *</label>
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
            />
            <div className="invalid-feedback">
              {this.state.errors && this.state.errors.lastName}
            </div>
          </div>
          <div className="form-group">
            <label>phone Number (optional)</label>
            <input
              type="text"
              name="phoneNumber"
              className={
                this.state.errors && this.state.errors.phoneNumber
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.phoneNumber}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">
              {this.state.errors && this.state.errors.phoneNumber}
            </div>
          </div>
          <div className="form-group">
            <label>gender *</label>
            <br />
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                checked={this.state.gender == "male"}
                onChange={this.onInputChange}
                id="inlineRadio1"
                value="male"
              />
              <label class="form-check-label" for="inlineRadio1">
                male
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                checked={this.state.gender == "female"}
                onChange={this.onInputChange}
                id="inlineRadio2"
                value="female"
              />
              <label class="form-check-label" for="inlineRadio2">
                female
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>birth Date *</label>
            <input
              type="date"
              name="birthDate"
              className={
                this.state.errors && this.state.errors.birthDate
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={moment(this.state.birthDate).format("YYYY-MM-DD")}
              onChange={this.onInputChange}
            />
            <div className="invalid-feedback">
              {this.state.errors && this.state.errors.birthDate}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

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

export default ProfileUpdateInfosPage;
