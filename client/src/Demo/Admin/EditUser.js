import React, { Component } from "react";

const ShowRole = (props) => (
  <option key={props.todo.roleName} value={props.todo.roleName}>
    {props.todo.roleName}
  </option>
);

export default class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], Roles: [] };
  }
  componentDidMount() {
    const axios = require("../../utils/axios");
    axios
      .get("https://localhost:8080/api/users/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("https://localhost:8080/role/showroles")
      .then((response) => {
        this.setState({ Roles: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  RoleList() {
    return this.state.Roles.map(function(currentTodo, i) {
      return <ShowRole todo={currentTodo} key={i} />;
    });
  }
  onChange = (e) => {
    const state = this.state.todos;
    state[e.target.name] = e.target.value;
    this.setState({ todos: state });
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  delete(id) {
    console.log(id);
    const axios = require("../../utils/axios");
    axios
      .delete("https://localhost:8080/api/users/" + this.props.match.params.id)
      .then((result) => {
        this.props.history.push("/admin");
      });
  }

  handleChange(e) {
    var whoIsChecked = { ...this.state.whoIsChecked };
    whoIsChecked.allowDestroyAll = e.target.value;
    this.setState({ whoIsChecked }, () => {
      console.log(this.state);
    });
  }

  onSubmit = (e) => {
    //e.preventDefault();

    const { firstName, lastName, email, role } = this.state.todos;
    console.log(this.state.todos);
    const axios = require("../../utils/axios");
    axios
      .put(
        "https://localhost:8080/role/user?id=" + this.props.match.params.id,
        {
          firstName,
          lastName,
          email,
          role,
        }
      )
      .then((result) => {
        this.props.history.push("/admin");
      });
  };

  render() {
    var message = "You selected " + this.state.todos.role;
    return (
      <div>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <br />
              <h3 className="panel-title">EDIT User</h3>
            </div>
            <div className="panel-body">
              <br />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="firstName">FirstName:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.todos.firstName}
                    onChange={this.onChange}
                    placeholder="first name"
                  />
                </div>
                <div className="form-group">
                  <label for="lastName">LastName:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.todos.lastName}
                    onChange={this.onChange}
                    placeholder="last name"
                  />
                </div>
                <div className="form-group">
                  <label for="Email">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.todos.email}
                    onChange={this.onChange}
                    placeholder="email"
                  />
                </div>
                <div>
                  <label>Role</label>
                  <select
                    className="form-control"
                    name="role"
                    id="ada"
                    onChange={this.onChange}
                    value={this.state.todos.role}
                  >
                    {this.RoleList()}
                  </select>
                  <p>{message}</p>
                </div>
                <br />
                <button type="submit" className="btn btn-dark">
                  Update
                </button>{" "}
                &nbsp;
                <button
                  onClick={this.delete.bind(this, this.state.todos._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
