import React, { Component } from "react";

export default class RoleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }
  componentDidMount() {
    const axios = require("../../../utils/axios");
    axios
      .get("https://localhost:8080/role/role?id=" + this.props.match.params.id)
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChange = (e) => {
    const state = this.state.todos;
    state[e.target.name] = e.target.value;
    this.setState({ todos: state });
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  handleChange(e) {
    var whoIsChecked = { ...this.state.whoIsChecked };
    whoIsChecked.allowDestroyAll = e.target.value;
    this.setState({ whoIsChecked }, () => {
      console.log(this.state);
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const axios = require("../../../utils/axios");
    const { no, roleName } = this.state.todos;
    console.log(this.state.todos);
    axios
      .put(
        "https://localhost:8080/role/role?id=" + this.props.match.params.id,
        {
          no,
          roleName,
        }
      )
      .then((result) => {
        this.props.history.push("/showRoles/");
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                <br />
                <br />
                <h1
                  className="h3 mb-3 font-weight-bold"
                  style={{ textDecoration: "underline" }}
                >
                  EDIT Role
                </h1>
                <br />
                <div>
                  <label>Role Name: </label>
                  <br />
                  <input
                    type="text"
                    class="form-control"
                    name="roleName"
                    value={this.state.todos.roleName}
                    onChange={this.onChange}
                    placeholder="roleName"
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-lg btn-info btn-block">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
