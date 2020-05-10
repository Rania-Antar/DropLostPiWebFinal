import Layout from "../../Components/MyLayout";
import { withRouter } from "react-router-dom";
import React from "react";
import "jquery";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
    this.state = { post: {}, categories: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const post = this.state.post;
    post[e.target.name] = e.target.value;
    this.setState({ post: post });
  }
  componentDidMount() {
    const axios = require("../../utils/axios");

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    axios.get("https://localhost:8080/cats/").then((e) => {
      this.setState({ categories: e.data });
      if (id) {
        axios.get("https://localhost:8080/posts/" + id).then((e) => {
          console.log(e);
          this.setState({ post: e.data });
          console.log(this.state.post);
        });
      }

      var newPost = localStorage.getItem("post");
      console.log(newPost);
      if (newPost) {
        localStorage.removeItem("post");
        newPost = JSON.parse(newPost);
        newPost.category = newPost.possibleBadges[0][0];
        newPost.message = newPost.message;
        newPost.from = newPost.from.name;
        newPost.type = newPost.type;
        newPost.fullPicture = newPost.full_picture;
        newPost.createdTime = newPost.created_time;
        newPost.updatedTime = newPost.updated_time;
        this.setState({ post: newPost });
      }
    });
  }
  navigate(e) {
    const path = window.$(e.target).attr("path");
    return this.props.history.push(path);
  }
  handleSubmit(e) {
    const axios = require("../../utils/axios");

    e.preventDefault();

    var data = {};

    for (let input of e.target.elements) {
      let name = input.getAttribute("name");
      let value = input.value;
      if (name) data[name] = value;
    }
    console.log(data);
    this.setState({ disabled: true });
    axios
      .post("https://localhost:8080/posts/save", data)
      .then((e) => {
        console.log(e);
        alert("Post saved successfully !");
        this.props.history.push("/posts");
        this.setState({ disabled: false });
      })
      .catch((e) => {
        alert(e);
        this.setState({ disabled: false });
      });
  }
  render() {
    console.log(this.state.post);
    const cats = this.state.categories;
    return (
      <Layout>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {this.state.post._id && (
              <input
                dir="auto"
                type="hidden"
                name="id"
                value={this.state.post._id}
              />
            )}
            <div className="form-group">
              <label for="from">From</label>
              <input
                dir="auto"
                onChange={this.handleChange}
                type="text"
                name="from"
                value={this.state.post.from}
                className="form-control"
                id="from"
                placeholder="from"
              />
            </div>

            <div className="form-group">
              <label for="message">text*</label>
              <textarea
                dir="auto"
                onChange={this.handleChange}
                required
                type="text"
                name="message"
                value={this.state.post.message}
                className="form-control"
                id="message"
                placeholder="message"
              />
            </div>
            <div className="form-group">
              <label for="link">link*</label>
              <input
                dir="auto"
                onChange={this.handleChange}
                required
                type="text"
                name="link"
                value={this.state.post.link}
                className="form-control"
                id="link"
                placeholder="link"
              />
            </div>
            <div className="form-group">
              <label for="type">Type</label>
              <input
                dir="auto"
                onChange={this.handleChange}
                type="text"
                name="type"
                value={this.state.post.type}
                className="form-control"
                id="type"
                placeholder="type"
              />
            </div>
            <div className="form-group">
              <label for="fullPicture">Picture</label>
              <textarea
                dir="auto"
                onChange={this.handleChange}
                type="text"
                name="fullPicture"
                value={this.state.post.fullPicture}
                className="form-control"
                id="fullPicture"
                placeholder="Picture"
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlSelect1">category</label>
              <select
                onChange={this.handleChange}
                required
                name="category"
                value={this.state.post.category}
                className="form-control"
                id="exampleFormControlSelect1"
              >
                {cats.length &&
                  cats.map((cat) => (
                    <option value={cat._id} className={`badge-${cat.color}`}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-inline mt-4">
              <div className="form-group mb-2">
                <label for="createdTime">Created Time : </label>
                <input
                  dir="auto"
                  onChange={this.handleChange}
                  type="text"
                  name="createdTime"
                  value={this.state.post.createdTime}
                  className="form-control mx-sm-3 mb-2"
                  id="createdTime"
                  placeholder="createdTime"
                />
              </div>
              <div className="form-group mb-2 ">
                <label for="updatedTime">Updated Time : </label>
                <input
                  dir="auto"
                  onChange={this.handleChange}
                  type="text"
                  name="updatedTime"
                  value={this.state.post.updatedTime}
                  className="form-control mx-sm-3 mb-2"
                  id="updatedTime"
                  placeholder="updatedTime"
                />
              </div>
            </div>
            <div className="form-group float-right px-2">
              <button
                type="submit"
                disabled={this.state.disabled}
                className="btn btn-lg btn-primary"
              >
                save
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Index);
