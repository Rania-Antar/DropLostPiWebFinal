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
import axios from 'axios'
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
import notif from './SectionNotifications.jsx'
import SnackbarContent from '../../../components/Snackbar/SnackbarContent.jsx'
import workStyle from '../../../jss/material-kit-pro-react/views/landingPageSections/workStyle.jsx'
import ImageSlider from '../Sections/ImageSlider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import classNames from 'classnames'
import Moment from 'moment';
import styles from '../../../jss/material-kit-pro-react/views/ecommerceSections/productsStyle.jsx'
import Subject from '@material-ui/icons/Subject'
import CategoryIcon from '@material-ui/icons/Category';
import Tooltip from '@material-ui/core/Tooltip'
import dg6 from '../../../../src/static/img/dg6.jpg'
import Popover from '@material-ui/core/Popover'
import javascriptStyles from '../../../jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx'

class SectionWork extends React.Component {
  anchorElLeft = null

  constructor(props) {
    super(props)
    this.onChangeObjectTitle = this.onChangeObjectTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeAdType = this.onChangeAdType.bind(this);
    this.onChangeBrandName = this.onChangeBrandName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);


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
      adType: 0,
      active: 0,
      brandName: '',
      Images: [],
      BrandNames: [],
      Categories: ['Pet', 'Smartphone', 'Electronic', 'Laptop', 'Card-Document-Money', 'Bag', 'Car', 'Moto', 'Keys'],
      Locations: ['Tunis', 'Ariana', 'BEN AROUS', 'BIZERTE', 'NABEUL', 'BEJA', 'KEF', 'SILIANA', 'JENDOUBA', 'ZAGHOUAN', 'SOUSSE',
        'MONASTIR', 'MAHDIA', 'KAIROUAN', 'kasserine', 'SIDI BOUZID', 'SFAX', 'GAFSA', 'TOZEUR', 'GABES', 'MEDENINE', 'TATAOUINE',
        'KEBILI', 'MANOUBA'],
      objects: [],
      openLeft: false,

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
    if (e.target.value == 'Pet') {
      this.setState({
        BrandNames: ['Dog', 'Cat', 'Bird', 'Horse', 'Monkey', 'Sheep', 'Rabbit']
      })
    } else if (e.target.value == 'Smartphone') {
      this.setState({
        BrandNames: ['Apple', 'Samsung', 'Huwawei', 'Nokia', 'LG', 'Sony', 'Evertek', 'Condor', 'Lenovo', 'Oppo', 'Wiko']
      })
    } else if (e.target.value == 'Electronic') {
      this.setState({
        BrandNames: ['Camera', 'Charger', 'Flash Disc', 'Earphone', 'Hard Disc']
      })
    } else if (e.target.value == 'Laptop') {
      this.setState({
        BrandNames: ['Apple', 'Samsung', 'Hp', 'DELL', 'LG', 'Sony', 'Lenovo', 'ASUS']
      })
    } else if (e.target.value == 'Card-Document-Money') {
      this.setState({
        BrandNames: ['Bank Card', 'Identity Card', 'Wallet', 'Money']
      })
    } else if (e.target.value == 'Bag') {
      this.setState({
        BrandNames: ['Hand bag', 'Backpack', 'Shopping Bag', 'Other']
      })
    } else if (e.target.value == 'Car') {
      this.setState({
        BrandNames: ['BMW', 'Mercedes Benz', 'Audi', 'Jeep', 'Ford', 'Toyota', 'Honda', 'Other']
      })
    } else if (e.target.value == 'Keys') {
      this.setState({
        BrandNames: ['Car Key', 'Padlock key', 'Magnetic Key', 'Keycard Key']
      })
    } else if (e.target.value == 'Moto') {
      this.setState({
        BrandNames: ['BMW', 'Honda', 'MBK', 'Aprilia', 'Peugoet', 'Yamaha']
      })
    }
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
      adType: this.state.adType,
      brandName: this.state.brandName,
      images: this.state.Images,

    }

    console.log(object);

    axios.post('https://localhost:8080/objects/add', object)
      .then(res => this.setState({
        objects: res.data.objects
      }))
    console.log(object);

    this.setState({
      objectTitle: '',
      category: '',
      location: '',
      date: new Date(),
      brandName: '',
      adType: '',
      Images: [],
      active: 2,


    })
  }


  onSubmit2(e) {
    e.preventDefault();

    const object = {
      objectTitle: this.state.objectTitle,
      category: this.state.category,
      location: this.state.location,
      date: this.state.date,
      adType: this.state.adType,
      brandName: this.state.brandName,
      images: this.state.Images,

    }

    console.log(object);

    axios.post('https://localhost:8080/objects/addFound', object)
      .then(res => console.log(res.data))
    console.log(object);

    this.setState({
      objectTitle: '',
      category: '',
      location: '',
      date: new Date(),
      brandName: '',
      adType: '',
      Images: [],
      active: 2,


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
  handleClosePopover(state) {
    this.setState({
      [state]: false,
    })
  }
  handleClickButton(state) {
    this.setState({
      [state]: true,
    })
  }
  render() {
    const { classes } = this.props
    const renderCards = this.state.objects.map((object, index) => {

      return <GridItem md={6} sm={6}>
        <Card blog>
          <CardHeader noShadow image>
            <a href={'/detail_object/' + object._id}>
              <ImageSlider images={object.images} />          </a>
            <div

              style={{ backgroundImage: `url(${dg6})`, opacity: 1 }}
            />
          </CardHeader>
          <CardBody>
            <h6
              className={classNames(classes.cardCategory, classes.textRose)}
            >
              {Moment(object.date).format('LLLL')}

            </h6>
            <h4 className={classes.cardTitle}>
              <a style={{ text: 'right' }} href={'/detail_object/' + object._id}>
                <h3 className={classes.cardTitle}>{object.objectTitle}</h3>
              </a>

            </h4>
            <p className={classes.cardDescription}>
              <p className={classes.sectionGray}>
                <CategoryIcon style={{ color: 'green', fontSize: '1rem', textJustify: 'center' }} />

                {object.category}

              </p>

            </p>
            <Button size='sm' block justifyContentBetween='center' color='twitter' >
              <h6 className={classNames(
                classes.tag,
                classes.textInfo
              )}>
                <i className='fab fa-' />               {object.brandName}
              </h6>
            </Button>
          </CardBody>
          <CardFooter plain>
            <div className={classes.priceContainer}>
              <span className={classNames(classes.price, classes.priceNew)}>
                {' '}
                <LocationOnIcon style={{ color: 'red', fontSize: '1rem', textJustify: 'center' }} />
                {object.location}            </span>
            </div>
            <div className={classNames(classes.stats, classes.mlAuto)}>

            </div>
          </CardFooter>

        </Card>
      </GridItem>
    })


    const { adType } = this.props
    const renderMenuItemSousCat = this.state.BrandNames.map((object, index) => {


      return <MenuItem
        classes={{
          root: classes.selectMenuItem,
          selected: classes.selectMenuItemSelected,
        }}
        value={object}
      >
        {object}
      </MenuItem>

    })

    const renderMenuItemCategory = this.state.Categories.map((object, index) => {


      return <MenuItem
        classes={{
          root: classes.selectMenuItem,
          selected: classes.selectMenuItemSelected,
        }}
        value={object}
      >
        {object}
      </MenuItem>

    })
    const renderMenuItemLocation = this.state.Locations.map((object, index) => {


      return <MenuItem
        classes={{
          root: classes.selectMenuItem,
          selected: classes.selectMenuItemSelected,
        }}
        value={object}
      >
        {object}
      </MenuItem>

    })

    const alerte = () => {
      return <SnackbarContent
        message={
          < span >
            <b>INFO ALERT:</b>{' '}
            {
              `You've got some friends nearby, stop looking at
              your phone and find them...`}
          </span >
        }
        close
        color='info'
        icon='info_outline'
      />
    }

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
                        <div class="col-md-12 ">
                          <form onSubmit={this.onSubmit}  >
                            <GridContainer >
                              <GridItem  >


                                <UploadImage refreshFunction={this.updateImages} />



                              </GridItem>
                              <GridItem xs={12} sm={12} md={7} className="form-group" >
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
                                <br /><br />
                              </GridItem>
                              <br /><br />
                              <GridItem xs={12} sm={6} md={12} lg={7}>
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
                                    {renderMenuItemCategory}
                                  </Select>
                                </FormControl>
                                <br /><br />
                              </GridItem>

                              <GridItem xs={12} sm={6} md={12} lg={7}>
                                <FormControl
                                  fullWidth
                                  className={classes.selectFormControl}
                                >
                                  <InputLabel
                                    htmlFor='simple-select'
                                    className={classes.selectLabel}
                                  >
                                    Select Location
                      </InputLabel>
                                  <Select
                                    MenuProps={{
                                      className: classes.selectMenu,
                                    }}
                                    classes={{
                                      select: classes.select,
                                    }}
                                    value={this.state.location}
                                    // onChange={this.handleSimple}
                                    inputProps={{
                                      name: 'simpleSelect',
                                      id: 'simple-select',
                                    }}
                                    onChange={this.onChangeLocation}
                                  >
                                    <MenuItem
                                      disabled
                                      classes={{
                                        root: classes.selectMenuItem,
                                      }}
                                    >
                                      Select Location
                        </MenuItem>
                                    {renderMenuItemLocation}
                                  </Select>
                                </FormControl>
                                <br /><br />
                              </GridItem>
                              <br /><br />


                              <GridItem xs={12} sm={6} md={12} lg={7}>
                                <FormControl
                                  fullWidth
                                  className={classes.selectFormControl}
                                >
                                  <InputLabel
                                    htmlFor='simple-select'
                                    className={classes.selectLabel}
                                  >
                                    Select sub-category
                      </InputLabel>
                                  <Select
                                    MenuProps={{
                                      className: classes.selectMenu,
                                    }}
                                    classes={{
                                      select: classes.select,
                                    }}
                                    value={this.state.brandName}
                                    // onChange={this.handleSimple}
                                    inputProps={{
                                      name: 'simpleSelect',
                                      id: 'simple-select',
                                    }}
                                    onChange={this.onChangeBrandName}

                                  >
                                    <MenuItem
                                      disabled
                                      classes={{
                                        root: classes.selectMenuItem,
                                      }}
                                    >
                                      Select sub-category
                        </MenuItem>
                                    {renderMenuItemSousCat}

                                  </Select>
                                </FormControl>
                                <br /><br />
                              </GridItem>

                              <br /><br />
                              <GridItem xs={12} sm={12} md={7}>
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
                                  <Button
                                    buttonRef={(node) => {
                                      this.anchorElLeft = node
                                    }}
                                    onClick={() => this.handleClickButton('openLeft')}
                                    type="submit" color="primary">
                                    Add Post
                                    </Button>
                                  <Popover
                                    classes={{
                                      paper: classes.popover,
                                    }}
                                    open={this.state.openLeft}
                                    anchorEl={this.anchorElLeft}
                                    anchorReference={'anchorEl'}
                                    onClose={() => this.handleClosePopover('openLeft')}
                                    anchorOrigin={{
                                      vertical: 'center',
                                      horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                      vertical: 'center',
                                      horizontal: 'right',
                                    }}
                                  >
                                    <h3 className={classes.popoverHeader}>Your post is added</h3>
                                    <div className={classes.popoverBody}>
                                      You can consult the result field to see results of matching
                </div>
                                  </Popover>

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
                        <div class="col-md-12 ">
                          <form onSubmit={this.onSubmit2}  >
                            <GridContainer >
                              <GridItem  >


                                <UploadImage refreshFunction={this.updateImages} />



                              </GridItem>
                              <GridItem xs={12} sm={12} md={7} className="form-group" >
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
                                <br /><br />
                              </GridItem>
                              <br /><br />
                              <GridItem xs={12} sm={6} md={12} lg={7}>
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
                                    {renderMenuItemCategory}
                                  </Select>
                                </FormControl>
                                <br /><br />
                              </GridItem>

                              <GridItem xs={12} sm={6} md={12} lg={7}>
                                <FormControl
                                  fullWidth
                                  className={classes.selectFormControl}
                                >
                                  <InputLabel
                                    htmlFor='simple-select'
                                    className={classes.selectLabel}
                                  >
                                    Select Location
                      </InputLabel>
                                  <Select
                                    MenuProps={{
                                      className: classes.selectMenu,
                                    }}
                                    classes={{
                                      select: classes.select,
                                    }}
                                    value={this.state.location}
                                    // onChange={this.handleSimple}
                                    inputProps={{
                                      name: 'simpleSelect',
                                      id: 'simple-select',
                                    }}
                                    onChange={this.onChangeLocation}
                                  >
                                    <MenuItem
                                      disabled
                                      classes={{
                                        root: classes.selectMenuItem,
                                      }}
                                    >
                                      Select Location
                        </MenuItem>
                                    {renderMenuItemLocation}
                                  </Select>
                                </FormControl>
                                <br /><br />
                              </GridItem>
                              <br /><br />


                              <GridItem xs={12} sm={6} md={12} lg={7}>
                                <FormControl
                                  fullWidth
                                  className={classes.selectFormControl}
                                >
                                  <InputLabel
                                    htmlFor='simple-select'
                                    className={classes.selectLabel}
                                  >
                                    Select sub-category
                      </InputLabel>
                                  <Select
                                    MenuProps={{
                                      className: classes.selectMenu,
                                    }}
                                    classes={{
                                      select: classes.select,
                                    }}
                                    value={this.state.brandName}
                                    // onChange={this.handleSimple}
                                    inputProps={{
                                      name: 'simpleSelect',
                                      id: 'simple-select',
                                    }}
                                    onChange={this.onChangeBrandName}

                                  >
                                    <MenuItem
                                      disabled
                                      classes={{
                                        root: classes.selectMenuItem,
                                      }}
                                    >
                                      Select sub-category
                        </MenuItem>
                                    {renderMenuItemSousCat}

                                  </Select>
                                </FormControl>
                                <br /><br />
                              </GridItem>

                              <br /><br />
                              <GridItem xs={12} sm={12} md={7}>
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
                                  <Button
                                    buttonRef={(node) => {
                                      this.anchorElLeft = node
                                    }}
                                    onClick={() => this.handleClickButton('openLeft')}
                                    type="submit" color="primary">
                                    Add Post
                                    </Button>
                                  <Popover
                                    classes={{
                                      paper: classes.popover,
                                    }}
                                    open={this.state.openLeft}
                                    anchorEl={this.anchorElLeft}
                                    anchorReference={'anchorEl'}
                                    onClose={() => this.handleClosePopover('openLeft')}
                                    anchorOrigin={{
                                      vertical: 'center',
                                      horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                      vertical: 'center',
                                      horizontal: 'right',
                                    }}
                                  >
                                    <h3 className={classes.popoverHeader}>Your post is added</h3>
                                    <div className={classes.popoverBody}>
                                      You can consult the result field to see results of matching
                </div>
                                  </Popover>

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
                      <GridItem md={12} sm={12}>
                        <GridContainer>
                          {renderCards}
                        </GridContainer>
                      </GridItem>
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

export default withStyles(workStyle, javascriptStyles)(SectionWork)
