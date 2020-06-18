import React from "react";
import Linkify from "linkifyjs/react";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.getColor = this.getColor.bind(this);
    this.savePost = this.savePost.bind(this);
    this.saveList = this.saveList.bind(this);
    this.state = { showAll: false };
    this.showMore = this.showMore.bind(this);
    this.showLess = this.showLess.bind(this);
  }
  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });
  getColor(name) {
    const cats = this.props.cats.filter((cat) => cat._id == name);
    return cats.length ? cats[0].color : "unknown";
  }

  savePost(e) {
    localStorage.setItem("post", e.target.getAttribute("post"));
    this.props.history.push("/posts/post");
  }
  saveList(e) {
    localStorage.setItem("list", e.target.getAttribute("post"));
    this.props.history.push("/lists/list");
  }
  getName(id) {
    const cats = this.props.cats.filter((cat) => cat._id == id);
    return cats.length ? cats[0].name : "unknown";
  }
  render() {
    const post = this.props.post;
    const { showAll } = this.state;
    let message;
    if (post.message.length <= 150) {
      message = (
        <Linkify tagName="p" className="card-text">
          {post.message}
        </Linkify>
      );
    } else if (showAll) {
      message = (
        <Linkify key={0} tagName="p" className="card-text">
          {post.message}
          <a key={1} href="javascript:void(0)" onClick={this.showLess}>
            Show less
          </a>
        </Linkify>
      );
    } else {
      message = (
        <Linkify key={0} tagName="p" className="card-text">
          {post.message.substring(0, 150)}...
          <a href="javascript:void(0)" key={1} onClick={this.showMore}>
            Show more
          </a>
        </Linkify>
      );
    }

    return (
      <div className="col-sm-4 post-card">
        <div className="card">
          <div className="card-body">
            {message}
            <footer className="blockquote-footer cat">
              {post.possibleBadges.length &&
                post.possibleBadges.map((badge, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`badge badge-${this.getColor(badge)}`}
                  >
                    {this.getName(badge)}
                  </a>
                ))}
            </footer>
            <div className="text-center">
              <a
                href={post.link}
                target="_blank"
                className="btn btn-primary btn-sm float-left"
              >
                Go to post
              </a>
              <a
                href="/posts/post"
                onClick={this.savePost}
                post={JSON.stringify(post)}
                className="btn btn-warning  btn-sm float-left"
              >
                Save post
              </a>
            </div>
            <a
              href="/lists/list"
              onClick={this.saveList}
              post={JSON.stringify(post)}
              className="btn btn-secondary  btn-sm"
            >
              Add As WordList
            </a>
          </div>
        </div>
      </div>
    );
  }
}
