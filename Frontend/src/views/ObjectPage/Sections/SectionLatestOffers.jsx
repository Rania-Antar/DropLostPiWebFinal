import React from 'react'
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from 'classnames'
// core components
import GridContainer from '../../../components/Grid/GridContainer.jsx'
import GridItem from '../../../components/Grid/GridItem.jsx'
import Card from '../../../components/Card/Card.jsx'
import CardHeader from '../../../components/Card/CardHeader.jsx'
import CardBody from '../../../components/Card/CardBody.jsx'
import CardFooter from '../../../components/Card/CardFooter.jsx'
import Button from '../../../components/CustomButtons/Button.jsx'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
// @material-ui icons
import Favorite from '@material-ui/icons/Favorite'

import styles from '../../../jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.jsx'
import Axios from 'axios'

import gucci from '../../../../src/static/img/examples/gucci.jpg'
import tomFord from '../../../../src/static/img/examples/tom-ford.jpg'
import dolce from '../../../../src/static/img/examples/dolce.jpg'
import ImageSlider from '../Sections/ImageSlider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CategoryIcon from '@material-ui/icons/Category';

class SectionLatestOffers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      objects: [],
      Skip: 0,
      Limit: 3,
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

  render(){
    const { classes } = this.props

    const renderCards = this.state.objects.map((object, index) => {

      return <GridItem md={4} sm={4}>
      <Card product plain>
        <CardHeader image plain>
          <a href='#pablo'>
          <ImageSlider images={object.images} />          </a>
          <div
            className={classes.coloredShadow}
            style={{ backgroundImage: `url(${tomFord})`, opacity: 1 }}
          />
        </CardHeader>
        <CardBody className={classes.textCenter} plain>
    <h4 className={classes.cardTitle}>{object.objectTitle}</h4>
          <p className={classes.sectionGray}>
          <CategoryIcon style={{ color: 'green', fontSize: '1rem', textJustify: 'center' }} />

          {object.category}

          </p>
        </CardBody>
        <CardFooter plain>
          <div className={classes.priceContainer}>
            <span className={classNames(classes.price, classes.priceNew)}>
              {' '}
              <LocationOnIcon style={{ color: 'red', fontSize: '1rem', textJustify: 'center' }} />
                {object.location}            </span>
          </div>
          <div className={classNames(classes.stats, classes.mlAuto)}>
            <Tooltip
              id='tooltip-top'
              title='Saved to Wishlist'
              placement='top'
              classes={{ tooltip: classes.tooltip }}
            >
              <Button justIcon simple color='rose'>
                <Favorite />
              </Button>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>
    </GridItem>

    })
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>Latest Posts</h2>
        <GridContainer>
{renderCards}          
        </GridContainer>
      </div>
    </div>
  )
  }
}

SectionLatestOffers.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(SectionLatestOffers)
