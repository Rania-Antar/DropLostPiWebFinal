import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// plugin that creates slider
import nouislider from 'nouislider'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// @material-ui icons
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Cached from '@material-ui/icons/Cached'
import Subject from '@material-ui/icons/Subject'
import Check from '@material-ui/icons/Check'
// core components
import Accordion from '../../../components/Accordion/Accordion.jsx'
import GridContainer from '../../../components/Grid/GridContainer.jsx'
import GridItem from '../../../components/Grid/GridItem.jsx'
import Card from '../../../components/Card/Card.jsx'
import CardHeader from '../../../components/Card/CardHeader.jsx'
import CardBody from '../../../components/Card/CardBody.jsx'
import CardFooter from '../../../components/Card/CardFooter.jsx'
import Button from '../../../components/CustomButtons/Button.jsx'
import Clearfix from '../../../components/Clearfix/Clearfix.jsx'

import color1 from '../../../../src/static/img/examples/color1.jpg'
import color3 from '../../../../src/static/img/examples/color3.jpg'
import color2 from '../../../../src/static/img/examples/color2.jpg'
import dg3 from '../../../../src/static/img/dg3.jpg'
import dg1 from '../../../../src/static/img/dg1.jpg'
import CheckBox from '../Sections/CheckBox.jsx'

import styles from '../../../jss/material-kit-pro-react/views/ecommerceSections/productsStyle.jsx'
import Axios from 'axios'
import ImageSlider from '../Sections/ImageSlider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CategoryIcon from '@material-ui/icons/Category';
import category from './DataCheck.jsx';
import ObjectDetail from '../ObjectDetail.jsx'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
class SectionProducts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      objects: [],
      Skip: 0,
      Limit: 6,
      PostSize: 0,
      Filters: { category: [], location: [] }
    }
  }


  componentDidMount() {
    var slider = this.slider1
    var priceLow = this.priceLow
    var priceHigh = this.priceHigh
    const variables = {
      skip: this.state.Skip,
      limit: this.state.Limit,
      //  loadMore: true,

    }

    this.getObjects(variables)
    console.log(variables)

  }


  getObjects = (variables) => {
    Axios.post('http://localhost:5000/objects', variables)
      .then(response => {

        if (response.data.success) {

          if (variables.loadMore) {
            // console.log("aaaaaaaaaa",response);

            this.setState({
              objects: [...this.state.objects, ...response.data.objects],
            })

          } else {
            this.setState({ objects: response.data.objects })
            console.log(this.state.objects);

          }
          this.setState({ PostSize: response.data.postSize })

        } else {
          alert('Failed to fectch product datas')
        }
      })
  }
  onLoadMore = () => {
    let skip = this.state.Skip + this.state.Limit;
    const variables = {
      skip: skip,
      limit: this.state.Limit,
      loadMore: true,
      filters: this.state.Filters,
      //searchTerm: SearchTerms
    }
    this.getObjects(variables)
    this.setState({ Skip: skip })
  }

  showFilteredResults = (filters) => {

    const variables = {
      skip: 0,
      limit: this.state.Limit,
      filters: filters

    }
    this.getObjects(variables)
    this.setState({ Skip: 0 })

  }

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.Filters }

    newFilters[category] = filters
    console.log(filters)

    

    //console.log(newFilters)

    this.showFilteredResults(newFilters)
    this.setState({ Filters: newFilters })

  }




  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props

    const renderCards = this.state.objects.map((object, index) => {

      return <GridItem md={4} sm={4}>
        <Card plain product>
          <CardHeader noShadow image >
            
            <a href={'/detail_object'}>
                
            <ImageSlider images={object.images} />
            </a>
          </CardHeader>
          <CardBody plain>
            <a href='#pablo'>
              <h4 className={classes.cardTitle}>{object.objectTitle}</h4>
            </a>
            <p className={classes.sectionGray}>
              <CategoryIcon style={{ color: 'green', fontSize: '1rem', textJustify: 'center' }} />
              {object.category}
            </p>
          </CardBody>
          <CardFooter plain className={classes.justifyContentBetween}>
            <div className={classes.priceContainer}>
              <span className={classes.price}> <LocationOnIcon style={{ color: 'red', fontSize: '1rem', textJustify: 'center' }} />
                {object.location}</span>
            </div>
            <Tooltip
              id='tooltip-top'
              title='Save to Wishlist'
              placement='left'
              classes={{ tooltip: classes.tooltip }}
            >
              <Button
                justIcon
                simple
                color='rose'
                className={classes.pullRight}
              >
                <FavoriteBorder />
              </Button>
            </Tooltip>
          </CardFooter>
        </Card>
      </GridItem>

    })
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <h2>Find what you need</h2>
          <GridContainer>
            <GridItem md={3} sm={3}>
              <Card plain>
                <CardBody className={classes.cardBodyRefine}>
                  <h4 className={`${classes.cardTitle} ${classes.textLeft}`}>
                    Refine
                    <Tooltip
                      id='tooltip-top'
                      title='Reset Filter'
                      placement='top'
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        link
                        justIcon
                        size='sm'
                        className={`${classes.pullRight} ${
                          classes.refineButton
                          }`}
                      >
                        <Cached />
                      </Button>
                    </Tooltip>
                    <Clearfix />
                  </h4>
                  <CheckBox

                    handleFilters={filters => this.handleFilters(filters, "category")}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={9} sm={9}>
              <GridContainer>
                {renderCards}
                <GridItem
                  md={6}
                  sm={6}
                  className={classNames(classes.mlAuto, classes.mrAuto)}
                >
                  {this.state.PostSize >= this.state.Limit &&


                    <Button round color='rose' onClick={this.onLoadMore}>
                      Load more...
                 </Button>
                  }
                </GridItem>


              </GridContainer>
            </GridItem>
          </GridContainer>
          <br />
          <h2>News in fashion</h2>
          <GridContainer>
            <GridItem md={4} sm={4}>
              <Card background style={{ backgroundImage: `url(${color1})` }}>
                <CardBody background>
                  <h6
                    className={classNames(
                      classes.cardCategory,
                      classes.textInfo
                    )}
                  >
                    Productivity Apps
                  </h6>
                  <a href='#pablo'>
                    <h3 className={classes.cardTitle}>
                      The best trends in fashion 2017
                    </h3>
                  </a>
                  <p className={classes.description}>
                    {`Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...`}
                  </p>
                  <Button href='#' round color='white'>
                    <Subject /> Read
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card background style={{ backgroundImage: `url(${color3})` }}>
                <CardBody background>
                  <h6
                    className={classNames(
                      classes.cardCategory,
                      classes.textInfo
                    )}
                  >
                    FASHION NEWS
                  </h6>
                  <a href='#pablo'>
                    <h3 className={classes.cardTitle}>
                      Kanye joins the Yeezy team at Adidas
                    </h3>
                  </a>
                  <p className={classes.description}>
                    {`Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...`}
                  </p>
                  <Button href='#' round color='white'>
                    <Subject /> Read
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card background style={{ backgroundImage: `url(${color2})` }}>
                <CardBody background>
                  <h6
                    className={classNames(
                      classes.cardCategory,
                      classes.textInfo
                    )}
                  >
                    Productivity Apps
                  </h6>
                  <a href='#pablo'>
                    <h3 className={classes.cardTitle}>
                      Learn how to use the new colors of 2017
                    </h3>
                  </a>
                  <p className={classes.description}>
                    {`Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...`}
                  </p>
                  <Button href='#' round color='white'>
                    <Subject /> Read
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={6} sm={6}>
              <Card background style={{ backgroundImage: `url(${dg3})` }}>
                <CardBody background>
                  <h6
                    className={classNames(
                      classes.cardCategory,
                      classes.textInfo
                    )}
                  >
                    Tutorials
                  </h6>
                  <a href='#pablo'>
                    <h3 className={classes.cardTitle}>
                      Trending colors of 2017
                    </h3>
                  </a>
                  <p className={classes.description}>
                    {`Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...`}
                  </p>
                  <Button href='#' round color='white'>
                    <Subject /> Read
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={6} sm={6}>
              <Card background style={{ backgroundImage: `url(${dg1})` }}>
                <CardBody background>
                  <h6
                    className={classNames(
                      classes.cardCategory,
                      classes.textInfo
                    )}
                  >
                    Productivity Style
                  </h6>
                  <a href='#pablo'>
                    <h3 className={classes.cardTitle}>Fashion & Style 2017</h3>
                  </a>
                  <p className={classes.description}>
                    {`Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...`}
                  </p>
                  <Button href='#' round color='white'>
                    <Subject /> Read
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SectionProducts)
