import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/core icons
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import Table from "../../../components/Table/Table.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";

import style from "../../../jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";

class ObjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({
      checked: newChecked,
    });
  }
  componentDidMount() {
    const axios = require("../../../utils/axios");
    axios
      .get("https://localhost:8080/persons/all/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    const { classes, ...rest } = this.props;
    const fillButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close },
    ].map((prop, key) => {
      return (
        <Button justIcon size="sm" color={prop.color} key={key}>
          <prop.icon />
        </Button>
      );
    });
    const simpleButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close },
    ].map((prop, key) => {
      return (
        <Button simple justIcon size="sm" color={prop.color} key={key}>
          <prop.icon />
        </Button>
      );
    });
    const roundButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close },
    ].map((prop, key) => {
      return (
        <Button round justIcon size="sm" color={prop.color} key={key}>
          <prop.icon />
        </Button>
      );
    });
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h4> List of objects</h4>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Table
            tableHead={[
              "IMAGE",
              "PRODUCT",
              "COLOR",
              "SIZE",
              "PRICE",
              "ACTIONS",
            ]}
            tableData={[
              <tbody>
                {this.state.users.map(
                  (user, i) => (
                    (
                      <div className={classes.imgContainer} key="1">
                        <img
                          src={user.images}
                          alt="..."
                          className={classes.img}
                        />
                      </div>
                    ),
                    (
                      <span key="2">
                        <a href="#jacket" className={classes.tdNameAnchor}>
                          {user.title}
                        </a>
                        <br />
                        <small className={classes.tdNameSmall}>
                          {user.location}
                        </small>
                      </span>
                    ),
                    "Red",
                    "M",
                    (
                      <span key="3">
                        <small className={classes.tdNumberSmall}>€</small> 549
                      </span>
                    ),
                    fillButtons
                  )
                )}
              </tbody>,
            ]}
            tableShopping
            customHeadCellClasses={[
              classes.textCenter,
              classes.description,
              classes.description,
              classes.textCenter,
              classes.textRight,
              classes.textRight,
            ]}
            customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
            customCellClasses={[
              classes.tdName,
              classes.customFont,
              classes.customFont,
              classes.tdNumber + " " + classes.textCenter,
              classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
              classes.tdNumber + " " + classes.textCenter,
            ]}
            customClassesForCells={[1, 2, 3, 4, 5, 6]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(ObjectsList);
