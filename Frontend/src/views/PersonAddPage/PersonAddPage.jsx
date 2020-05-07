import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../../components/Header/HeaderFront.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Footer from "../../components/Footer/FooterFront.jsx";
import HeaderLinks from "../../components/Header/HeaderLinksFront.jsx";

import contactUsStyle from "../../jss/material-kit-pro-react/views/contactUsStyle.jsx";

import ImageUpload from "../../components/CustomUpload/ImageUpload.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import axios from "axios";

class PersonAddPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeType = this.onChangeType.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      simpleSelect: "",

      title: "",
      name: "",
      description: "",
      location: "",
      type: "",
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDesc(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const person = {
      title: this.state.title,
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      type: this.state.type,
    };

    console.log(person);

    axios
      .post("https://localhost:8080/persons/add", person)
      .then((res) => console.log(res.data));

    this.setState({
      title: "",
      name: "",
      description: "",
      location: "",
      type: "",
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    return (
      <div>
        <Header
          brand="DropLost"
          links={<HeaderLinks dropdownHoverColor="dark" />}
          fixed
          color="dark"
        />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.contactContent}>
            <div className={classes.container}>
              <h2 className={classes.title}>Send us a message</h2>
              <GridContainer>
                <GridItem md={6} sm={6}>
                  <p>
                    {`ADD PERSON`}
                    <br />
                  </p>
                  <form onSubmit={this.onSubmit}>
                    <CustomInput
                      labelText="Title"
                      id="title"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <CustomInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <CustomInput
                      labelText="Location"
                      id="location"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      value={this.state.simpleSelect}
                      onChange={this.onChangeType}
                      inputProps={{
                        name: "simpleSelect",
                        id: "type",
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Single Select
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value="Missing"
                      >
                        Missing
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value="Found"
                      >
                        Found
                      </MenuItem>
                    </Select>

                    <CustomInput
                      labelText="Description"
                      id="float"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 6,
                      }}
                    />
                    <div className={classes.textCenter}>
                      <Button color="primary" round type="submit">
                        POST
                      </Button>
                    </div>
                  </form>
                </GridItem>
                <GridItem xs={12} sm={5} md={5}>
                  <h4>Picture</h4>
                  <ImageUpload
                    addButtonProps={{ round: true }}
                    changeButtonProps={{ round: true }}
                    removeButtonProps={{ round: true, color: "danger" }}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite className={classes.icon} /> by{" "}
                <a href="https://www.creative-tim.com">Brainiacs</a>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(contactUsStyle)(PersonAddPage);
