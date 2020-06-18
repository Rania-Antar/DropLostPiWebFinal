import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

// @material-ui/icons

// core components
import GridContainer from '../../../components/Grid/GridContainer.jsx'
import GridItem from '../../../components/Grid/GridItem.jsx'
import CustomInput from '../../../components/CustomInput/CustomInput.jsx'
import Button from '../../../components/CustomButtons/Button.jsx'
//import Select from "react-select";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import axios from 'axios';
import NavPills from '../Sections/NavPills.jsx'
import Dashboard from '@material-ui/icons/Dashboard'
import Schedule from '@material-ui/icons/Schedule'
import List from '@material-ui/icons/List'
import UploadImage from '../UploadImage'
import Card from '../../../components/Card/Card.jsx'
import CardHeader from '../../../components/Card/CardHeader.jsx'
import CardBody from '../../../components/Card/CardBody.jsx'
import CardFooter from '../../../components/Card/CardFooter.jsx'
import avatar from '../../../../src/static/img/faces/avatar.jpg'
import Favorite from '@material-ui/icons/Favorite'
import Share from '@material-ui/icons/Share'

import workStyle from '../../../jss/material-kit-pro-react/views/landingPageSections/workStyle.jsx'
const optionsCategory = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'pets', label: 'Pets' },
  { value: 'card', label: 'Card' },
  { value: 'cars', label: 'Cars' },
];

class SectionWork extends React.Component {


  constructor(props) {
    super(props)
    this.onChangeObjectTitle = this.onChangeObjectTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeLangtitude = this.onChangeLangtitude.bind(this);
    //this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeAdType = this.onChangeAdType.bind(this);
    this.onChangeBrandName = this.onChangeBrandName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      checked: [24, 22],
      selectedEnabled: 'b',
      checkedA: true,
      checkedB: false,
      simpleSelect: '',
      multipleSelect: [],
      tags: ['amsterdam', 'washington', 'sydney', 'beijing'],
      objectTitle: '',
      category: '',
      location: '',
      date: new Date(),
      langtitude: 0,
      //latitude: 0,
      adType: 0,
      brandName: '',
      Images: [],
    }
  }

  onChangeObjectTitle(e) {
    this.setState({
      objectTitle: e.target.value
    })
  }
  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    })
  }
  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }
  onChangeDate(date) {
    this.setState({
      date: date
    })
  }
  onChangeLangtitude(e) {
    this.setState({
      langtitude: e.target.value
    })
  }

  /*onChangeLatitude(e) {
    this.setState({
      latitude: e.target.value
    })
  }*/
  onChangeAdType = (adtype) => {
    console.log(adtype);
    this.setState({
      adType: adtype,
    })
  }
  onChangeBrandName(e) {
    this.setState({
      brandName: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const object = {
      objectTitle: this.state.objectTitle,
      category: this.state.category,
      location: this.state.location,
      date: this.state.date,
      langtitude: this.state.langtitude,
      //latitude: this.state.latitude,
      adType: this.state.adType,
      brandName: this.state.brandName,
      images: this.state.Images,

    }

    console.log(object);

    axios.post('http://localhost:5000/objects/add', object)
      .then(res => console.log(res.data));
    console.log(object);

    this.setState({
      objectTitle: '',
      category: '',
      location: '',
      langtitude: 0,
      date: new Date(),
      brandName: '',
      adType: '',
      Images: [],
    })

  }

  updateImages = (newImages) => {
    console.log(newImages);
    this.setState({
      Images: newImages
    })
    // this.setState({ [event.target.name]: event.target.value })
    //  setImages(newImages)
  }
  handleSimple = (event) => {
  }
  render() {
    const { adType } = this.props
    const { classes } = this.props
    return (
      <div className={classes.section}>
        <GridContainer justify="center" fullWidth>
          <GridItem xs={12} >
            <NavPills
              //onChange={console.log("aaaaaaaaaaaa")}
              className={classes.section}

              refreshFunction={this.onChangeAdType}
              color='info'
              horizontal={{
                tabsGrid: { xs: 12, sm: 2, md: 2 },
                contentGrid: { xs: 12, sm: 10, md: 9 },
              }}
              tabs={[
                {
                  //value: this.state.adType,
                  //onChange: this.onChangeAdType,
                  tabButton: 'LOST',
                  tabIcon: Dashboard,
                  tabContent: (
                    <div class="container">
                      <div class="row">
                        <div class="col-md-6 ">
                          <form onSubmit={this.onSubmit}  >
                            <GridContainer >
                              <GridItem  >


                                <UploadImage refreshFunction={this.updateImages} />



                              </GridItem>
                              <GridItem xs={12} sm={6} md={12} lg={6}>
                                <FormControl
                                  fullWidth
                                  className={classes.selectFormControl}
                                >
                                  <InputLabel
                                    htmlFor='simple-select'
                                    className={classes.selectLabel}
                                  >
                                    Select Category
                      </InputLabel>
                                  <Select
                                    MenuProps={{
                                      className: classes.selectMenu,
                                    }}
                                    classes={{
                                      select: classes.select,
                                    }}
                                    value={this.state.category}
                                    // onChange={this.handleSimple}
                                    inputProps={{
                                      name: 'simpleSelect',
                                      id: 'simple-select',
                                    }}
                                    onChange={this.onChangeCategory}
                                  >
                                    <MenuItem
                                      disabled
                                      classes={{
                                        root: classes.selectMenuItem,
                                      }}
                                    >
                                      Select Category
                        </MenuItem>
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                      }}
                                      value='Pets'
                                    >
                                      Pets
                        </MenuItem>
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                      }}
                                      value='Electronics'
                                    >
                                      Electronics
                        </MenuItem>
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                      }}
                                      value='Cards'
                                    >
                                      Cards
                        </MenuItem>
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                      }}
                                      value='Cars'
                                    >
                                      Cars
                        </MenuItem>
                                  </Select>
                                </FormControl>
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6} className="form-group" >
                                <CustomInput
                                  className="form-control"
                                  labelText="Subject"
                                  id="subject"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    defaultValue: this.state.objectTitle,
                                    onChange: this.onChangeObjectTitle
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  className="form-control"
                                  labelText="Location"
                                  id="location"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    defaultValue: this.state.location,
                                    onChange: this.onChangeLocation
                                  }}

                                />
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  className="form-control"
                                  labelText="address or zip code"
                                  id="address"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    onChange: this.onChangeLangtitude
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  className="form-control"
                                  labelText="Brand Name"
                                  id="brand"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    defaultValue: this.state.brandName,
                                    onChange: this.onChangeBrandName
                                  }}


                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <br />

                                <FormControl >
                                  <Datetime
                                    inputProps={{ placeholder: "Datetime Picker Here" }}
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                  />
                                </FormControl>
                              </GridItem>
                              
                              <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={6} className={classes.textCenter}>
                                  <Button type="submit" color="primary">Send Message</Button>
                                </GridItem>
                              </GridContainer>
                            </GridContainer>


                          </form>

                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  tabButton: 'FOUND',
                  tabIcon: Schedule,
                  tabContent: (
                    /////////////////////////////////////////////////////

                    <div class="container">
                    <div class="row">
                      <div class="col-md-6 ">
                        <form onSubmit={this.onSubmit}  >
                          <GridContainer >
                            <GridItem  >


                              <UploadImage refreshFunction={this.updateImages} />



                            </GridItem>
                            <GridItem xs={12} sm={6} md={12} lg={6}>
                              <FormControl
                                fullWidth
                                className={classes.selectFormControl}
                              >
                                <InputLabel
                                  htmlFor='simple-select'
                                  className={classes.selectLabel}
                                >
                                  Select Category
                    </InputLabel>
                                <Select
                                  MenuProps={{
                                    className: classes.selectMenu,
                                  }}
                                  classes={{
                                    select: classes.select,
                                  }}
                                  value={this.state.category}
                                  // onChange={this.handleSimple}
                                  inputProps={{
                                    name: 'simpleSelect',
                                    id: 'simple-select',
                                  }}
                                  onChange={this.onChangeCategory}
                                >
                                  <MenuItem
                                    disabled
                                    classes={{
                                      root: classes.selectMenuItem,
                                    }}
                                  >
                                    Select Category
                      </MenuItem>
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected,
                                    }}
                                    value='Pets'
                                  >
                                    Pets
                      </MenuItem>
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected,
                                    }}
                                    value='Electronics'
                                  >
                                    Electronics
                      </MenuItem>
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected,
                                    }}
                                    value='Cards'
                                  >
                                    Cards
                      </MenuItem>
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected,
                                    }}
                                    value='Cars'
                                  >
                                    Cars
                      </MenuItem>
                                </Select>
                              </FormControl>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6} className="form-group" >
                              <CustomInput
                                className="form-control"
                                labelText="Subject"
                                id="subject"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  defaultValue: this.state.objectTitle,
                                  onChange: this.onChangeObjectTitle
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <CustomInput
                                className="form-control"
                                labelText="Location"
                                id="location"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  defaultValue: this.state.location,
                                  onChange: this.onChangeLocation
                                }}

                              />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6}>
                              <CustomInput
                                className="form-control"
                                labelText="address or zip code"
                                id="address"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  onChange: this.onChangeLangtitude
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <CustomInput
                                className="form-control"
                                labelText="Brand Name"
                                id="brand"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  defaultValue: this.state.brandName,
                                  onChange: this.onChangeBrandName
                                }}


                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <br />

                              <FormControl >
                                <Datetime
                                  inputProps={{ placeholder: "Datetime Picker Here" }}
                                  selected={this.state.date}
                                  onChange={this.onChangeDate}
                                />
                              </FormControl>
                            </GridItem>
                            
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={6} className={classes.textCenter}>
                                <Button type="submit" color="primary">Send Message</Button>
                              </GridItem>
                            </GridContainer>
                          </GridContainer>


                        </form>

                      </div>
                    </div>
                  </div>
                  ),
                },
                {
                  tabButton: 'RESULTS',
                  tabIcon: List,
                  tabContent: (
                    <span>
                      <p>
                        Collaboratively administrate empowered markets via
                        plug-and-play networks. Dynamically procrastinate
                        B2C users after installed base benefits.
                          </p>
                      <br />
                      <p>
                        Dramatically visualize customer directed convergence
                        without revolutionary ROI. Collaboratively
                        administrate empowered markets via plug-and-play
                        networks. Dynamically procrastinate B2C users after
                        installed base benefits.
                          </p>
                      <br />
                      <p>
                        Dramatically visualize customer directed convergence
                        without revolutionary ROI. Collaboratively
                        administrate empowered markets via plug-and-play
                        networks. Dynamically procrastinate B2C users after
                        installed base benefits.
                          </p>
                    </span>
                  ),
                },
              ]}
            />
          </GridItem>


        </GridContainer>

      </div>
    )
  }
}

SectionWork.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(workStyle)(SectionWork)
