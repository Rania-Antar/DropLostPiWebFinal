import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

export default class ShowRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      search: "",
    };
  }
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  componentDidMount() {
    const axios = require("../../../utils/axios");
    axios
      .get("https://localhost:8080/role/showroles")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  delete(id) {
    const axios = require("../../../utils/axios");
    console.log(id);
    axios
      .delete("https://localhost:8080/role/role?id=" + id)
      .then((result) => {
        toast.success("Deleted successfully");
      })
      .catch((err) => {
        toast.error("Role not deleted");
      });
    setTimeout(
      function() {
        window.location.reload();
      }.bind(this),
      1300
    );
  }

  render() {
    const divStyle = {
      display: "contents",
    };
    const Todo = (props) => (
      <div style={divStyle}>
        <tr>
          <td>{props.todo.roleName}</td>

          <td>
            <a
              href={"/admin/showRole/edit/" + props.todo._id}
              class="btn btn-primary btn-info"
              role="button"
              aria-pressed="true"
            >
              Edit
            </a>
            <a
              href="#"
              class="btn btn-sm btn-danger"
              onClick={this.delete}
              role="button"
              aria-pressed="true"
            >
              Delete
            </a>
          </td>
        </tr>
      </div>
    );
    let filteredusers = this.state.todos.filter((role) => {
      return role.roleName.indexOf(this.state.search) !== -1;
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
            href="/admin/createRole/"
            className="btn btn-primary btn-info btn active"
            role="button"
            aria-pressed="true"
          >
            Create Role
          </a>{" "}
          <br />
          <h1
            style={{
              marginLeft: "-200px",
              textDecoration: "underline",
              color: "#F0542D",
            }}
          >
            Roles List
          </h1>
          <input
            type="text"
            placeholder="Search..."
            class="form-control input-sm"
            style={{ width: "250px" }}
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>

        <div className="container" style={{ border: "10px solid lightgray" }}>
          <table
            className="table table-striped"
            id="usertable"
            style={{ marginTop: 20 }}
            ref={(el) => (this.el = el)}
            data-order='[[ 1, "asc" ]]'
            data-page-length="25"
          >
            <thead>
              <tr>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <ToastContainer />
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
