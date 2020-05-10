import Layout from "../Components/MyLayout";
import "jquery";
import React from "react";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    localStorage.removeItem("token");
    var token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/pages/login";
    }
  }
  render() {
    return (
      <Layout>
        <main role="main" className="container">
          <div className="container">
            <div className="text-center">
              <a href="#" className="btn btn-md btn-grey">
                Logging Out
              </a>
            </div>
          </div>
        </main>
      </Layout>
    );
  }
}

export default Index;
