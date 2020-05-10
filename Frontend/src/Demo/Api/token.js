import Layout from "../Components/MyLayout";
import "jquery";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    var token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      return this.props.history.push("/error", "/");
    }
    var url = new URL(window.location.href);

    token = url.searchParams.get("token");
    await localStorage.setItem("token", token);
    return this.props.history.push("/error", "/");
  }
  render() {
    return (
      <Layout>
        <main role="main" className="container">
          <div className="container">
            <div className="text-center">
              <a href="#" className="btn btn-md btn-grey">
                Signing In
              </a>
            </div>
          </div>
        </main>
      </Layout>
    );
  }
}

export default Index;
