import React, { Component } from "react";

const divStyle = {
  display: "contents",
};

const Todo = (props) => (
  <div style={divStyle}>
    <tr>
      <td>{props.todo.firstName}</td>
      <td>{props.todo.lastName}</td>
      <td>{props.todo.email}</td>
      <td>{props.todo.role}</td>
      <td>
        <a
          href={"/admin/admin/edit/" + props.todo._id}
          className="btn btn-primary btn-info"
          role="button"
          aria-pressed="true"
        >
          Edit
        </a>
      </td>
    </tr>
  </div>
);

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], search: "" };
  }

  //for searching event in page
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  componentDidMount() {
    const axios = require("../../../utils/axios");
    axios
      .get("https://localhost:8080/api/users/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    let filteredusers = this.state.users.filter((user) => {
      return (
        user.firstName.indexOf(this.state.search) !== -1 ||
        user.lastName.indexOf(this.state.search) !== -1 ||
        user.email.indexOf(this.state.search) !== -1
      );
    });
    return (
      <div>
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/admin/users/create"
            className="btn btn-primary btn-info btn active"
            role="button"
            aria-pressed="true"
          >
            Create User
          </a>{" "}
          <br />
          <h1
            style={{
              marginLeft: "-200px",
              textDecoration: "underline",
              color: "#F0542D",
            }}
          >
            Manage Users
          </h1>
          <input
            type="text"
            placeholder="Search..."
            className="form-control input-sm"
            style={{ width: "250px" }}
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>

        <div className="container" style={{ border: "10px solid lightgray" }}>
          <table
            className="table table-striped"
            id="usertable"
            ref={(el) => (this.el = el)}
            data-order='[[ 1, "asc" ]]'
            data-page-length="25"
          >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredusers.map(function(currentTodo, i) {
                return <Todo todo={currentTodo} key={i} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
