import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/core icons
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Reply from "@material-ui/icons/Reply";
import Favorite from "@material-ui/icons/Favorite";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import Table from "../../../components/Table/Table.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import Media from "../../../components/Media/Media.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import Paginations from "../../../components/Pagination/Pagination.jsx";

import style from "../../../jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";

import avatar from "../../../../src/static/img/faces/avatar.jpg";
import kendall from "../../../../src/static/img/faces/kendall.jpg";
import marc from "../../../../src/static/img/faces/marc.jpg";
import placeholder from "../../../../src/static/img/placeholder.jpg";
import product1 from "../../../../src/static/img/product1.jpg";
import product2 from "../../../../src/static/img/product2.jpg";
import product3 from "../../../../src/static/img/product3.jpg";

class SectionContentAreas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1, 3, 5],
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
          <h4> Table</h4>
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
              [
                <div className={classes.imgContainer} key="1">
                  <img src={product1} alt="..." className={classes.img} />
                </div>,
                <span key="2">
                  <a href="#jacket" className={classes.tdNameAnchor}>
                    Spring Jacket
                  </a>
                  <br />
                  <small className={classes.tdNameSmall}>
                    by Dolce&amp;Gabbana
                  </small>
                </span>,
                "Red",
                "M",
                <span key="3">
                  <small className={classes.tdNumberSmall}>€</small> 549
                </span>,

                fillButtons,
              ],
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

export default withStyles(style)(SectionContentAreas);
