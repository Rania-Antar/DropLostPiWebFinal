import Layout from "../../components/MyLayout";
import React from "react";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user: user });
  }
  handleSubmit(e) {
    e.preventDefault();

    const axios = require("../../utils/axios");
    var data = {};

    for (let input of e.target.elements) {
      let name = input.getAttribute("name");
      let value = input.value;
      if (name) data[name] = value;
    }
    if (data["password"] != data["password2"]) {
      alert("Passwords don't match !");
      return false;
    }
    axios.post("https://localhost:8080/register", data).then((e) => {
      if (e.data.success) {
        alert("You've Registered Successfully !Please Login ");
        this.props.history.push("/api/login");
      } else {
        alert(
          e.data.msg
            ? e.data.msg
            : "something wrong happened please try again !"
        );
      }
    });
  }
  async componentDidMount() {}
  render() {
    return (
      <Layout>
        <main role="main" className="container">
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="title">firstName</label>
                <input
                  onChange={this.handleChange}
                  required
                  type="text"
                  name="firstName"
                  value={this.state.user.firstName}
                  className="form-control"
                  id="title"
                  placeholder="firstName"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  required
                  onChange={this.handleChange}
                  value={this.state.user.email}
                  name="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  required
                  onChange={this.handleChange}
                  value={this.state.user.password}
                  name="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword2">Password Confirmation</label>
                <input
                  type="password"
                  required
                  onChange={this.handleChange}
                  value={this.state.user.password2}
                  name="password2"
                  class="form-control"
                  id="exampleInputPassword2"
                  placeholder="Password"
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Register
              </button>
              <a
                href="https://localhost:8080/auth/facebook"
                class="btn btn-primary"
              >
                Log in with Facebook
              </a>
            </form>
          </div>
        </main>
      </Layout>
    );
  }
}

export default Index;
