import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../../components/Header/HeaderFront.jsx";
import Footer from "../../components/Footer/FooterFront.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import HeaderLinks from "../../components/Header/HeaderLinksFront.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";

import blogPostsPageStyle from "../../jss/material-kit-pro-react/views/blogPostsPageStyle.jsx";

import axios from "axios";
import NavPills from "../../components/NavPills/NavPills";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import lost3 from "../../../src/static/img/missing/missing3.jpg";
import CardBody from "../../components/Card/CardBody";
import Muted from "../../components/Typography/Muted";

class PersonsListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      dataMissing: [],
      dataFound: [],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    axios.get("https://localhost:8080/persons/missing").then((res) => {
      this.setState({
        dataMissing: res.data,
      });
    });

    axios.get("https://localhost:8080/persons/found").then((res) => {
      this.setState({
        dataFound: res.data,
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          brand="DropLost"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "info",
          }}
        />
        <Parallax
          image={require("../../../src/static/img/lost.jpg")}
          filter="dark"
          small
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
                <h2 className={classes.title}>
                  A Place for Entrepreneurs to Share and Discover New Stories
                </h2>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem md={11} className={classes.textCenter}>
                  <NavPills
                    alignCenter
                    tabs={[
                      {
                        tabButton: "Missing",
                        tabContent: (
                          <div className={classes.team}>
                            <hr />
                            <h2 className={classes.sectionTitle}>
                              Latest Articles
                            </h2>

                            <div className={classes.container}>
                              <GridContainer>
                                {this.state.dataMissing.map((dataMissing) => {
                                  return (
                                    <GridItem xs={12} sm={6} md={6}>
                                      <Card
                                        profile
                                        plain
                                        className={classes.card3}
                                      >
                                        <GridContainer>
                                          <GridItem xs={12} sm={5} md={5}>
                                            <CardHeader image plain>
                                              <a
                                                href={`/person-details-page/${dataMissing._id}`}
                                              >
                                                <img
                                                  src={
                                                    "/static/img/uploads/" +
                                                    dataMissing.images
                                                  }
                                                  alt="..."
                                                />
                                              </a>
                                              <div
                                                className={
                                                  classes.coloredShadow
                                                }
                                                style={{
                                                  opacity: "1",
                                                }}
                                              />
                                            </CardHeader>
                                          </GridItem>
                                          <GridItem xs={12} sm={7} md={7}>
                                            <CardBody plain>
                                              <h4 className={classes.cardTitle}>
                                                {dataMissing.title}
                                              </h4>
                                              <Muted>
                                                <h6
                                                  className={
                                                    classes.cardCategory
                                                  }
                                                >
                                                  {dataMissing.name}
                                                </h6>
                                              </Muted>
                                              <p
                                                className={classes.description}
                                              >
                                                {dataMissing.description}
                                              </p>
                                            </CardBody>
                                          </GridItem>
                                        </GridContainer>
                                      </Card>
                                    </GridItem>
                                  );
                                })}
                              </GridContainer>
                            </div>
                          </div>
                        ),
                      },
                      {
                        tabButton: "Found",
                        tabContent: (
                          <div className={classes.team}>
                            <hr />
                            <h2 className={classes.sectionTitle}>
                              Latest Articles
                            </h2>

                            <div className={classes.container}>
                              <GridContainer>
                                {this.state.dataFound.map((dataFound) => {
                                  return (
                                    <GridItem xs={12} sm={6} md={6}>
                                      <Card
                                        profile
                                        plain
                                        className={classes.card3}
                                      >
                                        <GridContainer>
                                          <GridItem xs={12} sm={5} md={5}>
                                            <CardHeader image plain>
                                              <a href="/person-details-page">
                                                <img src={lost3} alt="..." />
                                              </a>
                                              <div
                                                className={
                                                  classes.coloredShadow
                                                }
                                                style={{
                                                  backgroundImage: `url(${lost3})`,
                                                  opacity: "1",
                                                }}
                                              />
                                            </CardHeader>
                                          </GridItem>
                                          <GridItem xs={12} sm={7} md={7}>
                                            <CardBody plain>
                                              <h4 className={classes.cardTitle}>
                                                {dataFound.title}
                                              </h4>
                                              <Muted>
                                                <h6
                                                  className={
                                                    classes.cardCategory
                                                  }
                                                >
                                                  {dataFound.name}
                                                </h6>
                                              </Muted>
                                              <p
                                                className={classes.description}
                                              >
                                                {dataFound.description}
                                              </p>
                                            </CardBody>
                                          </GridItem>
                                        </GridContainer>
                                      </Card>
                                    </GridItem>
                                  );
                                })}
                              </GridContainer>
                            </div>
                          </div>
                        ),
                      },
                    ]}
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
                <a href="https://www.creative-tim.com">Creative Tim</a> for a
                better web.
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

PersonsListPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(blogPostsPageStyle)(PersonsListPage);
