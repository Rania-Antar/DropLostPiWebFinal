import Layout from "../../Components/MyLayout";
import { Link } from "react-router-dom";
import React from "react";
import "jquery";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
    this.removePost = this.removePost.bind(this);
    this.state = { posts: [], cats: [] };
  }
  navigate(e) {
    const path = window.$(e.target).attr("path");
    return this.props.history.push(path);
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      return this.props.history.push("/error", "/");
    }
    const axios = require("../../utils/axios");
    axios.get("https://localhost:8080/cats/").then((e) => {
      this.setState({ cats: e.data });
      axios.get("https://localhost:8080/posts").then((e) => {
        this.setState({ posts: e.data });
      });
    });
  }
  removePost(e) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const axios = require("../../utils/axios");
      axios
        .post("https://localhost:8080/posts/delete", {
          id: e.target.getAttribute("post"),
        })
        .then((e) => {
          if (e.data.success) {
            alert("post deleted successfully !");
            window.location.reload();
          }
        });
    }
  }
  render() {
    const getColor = (name) => {
      const cats = this.state.cats.filter((cat) => cat._id == name);
      return cats.length ? cats[0].color : "unknown";
    };
    const getName = (id) => {
      const cats = this.state.cats.filter((cat) => cat._id == id);
      return cats.length ? cats[0].name : "Unknown";
    };
    return (
      <Layout>
        <main role="main" className="mb-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <h1 className="h2">Saved Posts</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
                <button
                  type="button"
                  onClick={this.navigate}
                  path="/posts/post"
                  className="btn btn-sm btn-outline-secondary"
                >
                  + New Saved Post
                </button>
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">From</th>
                <th scope="col">Message</th>
                <th scope="col">Category</th>
                <th scope="col">Created_Time</th>
                <th scope="col">Manage</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post) => (
                <tr>
                  <td class="w-25">
                    <img
                      src={post.fullPicture}
                      class="img-fluid img-thumbnail"
                      alt="Sheep"
                    />
                  </td>
                  <td>{post.from}</td>
                  <td>
                    <pre>{post.message}</pre>
                  </td>
                  <td>
                    <a
                      href="#"
                      className={`badge badge-${getColor(post.category)}`}
                    >
                      {getName(post.category)}
                    </a>
                  </td>
                  <td>{post.createdTime}</td>
                  <td>
                    <Link to={"/posts/post?id=" + post._id} cat={post}>
                      <a className="btn btn-sm btn-warning">edit</a>
                    </Link>
                    <a
                      className="btn btn-sm btn-danger"
                      onClick={this.removePost}
                      href="#"
                      name={post.name}
                      post={post._id}
                    >
                      remove
                    </a>
                    <a
                      className="btn btn-sm btn-primary"
                      href={post.link}
                      target="_blank"
                      name={post.name}
                      post={post._id}
                    >
                      go to post
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </Layout>
    );
  }
}

export default Index;
