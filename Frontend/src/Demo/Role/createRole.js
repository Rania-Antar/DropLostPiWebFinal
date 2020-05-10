import React, { Component } from "react";

export default class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleName: "",
    };
    this.onChangeRoleName = this.onChangeRoleName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeRoleName(e) {
    this.setState({
      no: 1,
      roleName: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(`Form submitted:`);
    console.log(`User role : ${this.state.roleName}`);

    const newTodo = {
      no: this.state.no,
      roleName: this.state.roleName,
    };
    const axios = require("../../utils/axios");
    axios.post("https://localhost:8080/role/add", newTodo).then((result) => {
      this.props.history.push("/ShowRoles");
    });

    this.setState({
      roleName: "",
      todo_completed: false,
    });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                <h1
                  className="h3 mb-3 font-weight-bold"
                  style={{ textDecoration: "underline" }}
                >
                  Create Role
                </h1>
                <div className="form-group">
                  <label>New Role</label>
                  <input
                    type="text"
                    className="form-control"
                    name="rolename"
                    placeholder="Enter Role name"
                    value={this.state.roleName}
                    onChange={this.onChangeRoleName}
                  />
                </div>

                <br />
                <button
                  type="submit"
                  value="Add Role"
                  className="btn btn-lg btn-info btn-block"
                >
                  Add Role
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
