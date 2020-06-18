import React from "react";
import { Card, Table } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from "../../assets/images/user/avatar-1.jpg";

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], search: "" };
  }
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }
  componentDidMount() {
    const axios = require("../../utils/axios");
    axios
      .get("https://localhost:8080/api/users/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <Aux>
        <Card className="Recent-Users">
          <Card.Header>
            <Card.Title as="h5">List of Users</Card.Title>
          </Card.Header>
          <Card.Body className="px-0 py-2">
            <Table responsive hover>
              <tbody>
                {this.state.users.map((user, i) => (
                  <tr className="unread">
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar1}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">
                        {user.firstName} {user.lastName}
                      </h6>
                      <p className="m-0">{user.email}</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        11 MAY 12:56
                      </h6>
                    </td>
                    <td>
                      <a
                        href={DEMO.BLANK_LINK}
                        className="label theme-bg2 text-white f-12"
                      >
                        Reject
                      </a>
                      <a
                        href={DEMO.BLANK_LINK}
                        className="label theme-bg text-white f-12"
                      >
                        Approve
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Aux>
    );
  }
}

export default UserTable;
