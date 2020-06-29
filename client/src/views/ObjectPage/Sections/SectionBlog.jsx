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
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

import dg6 from '../../../../src/static/img/dg6.jpg'
import dg10 from '../../../../src/static/img/dg10.jpg'
import dg9 from '../../../../src/static/img/dg9.jpg'
import Axios from 'axios'
import ImageSlider from '../Sections/ImageSlider';
import CategoryIcon from '@material-ui/icons/Category';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CardFooter from '../../../components/Card/CardFooter.jsx'
import Moment from 'moment';
import Button from '../../../components/CustomButtons/Button.jsx'

import styles from '../../../jss/material-kit-pro-react/views/ecommerceSections/blogStyle.jsx'
class SectionBlog extends React.Component {
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
    Axios.post('https://localhost:8080/objects', variables)
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
  render() {

    const { classes } = this.props
    const renderCards = this.state.objects.map((object, index) => {
      return <GridItem md={4} sm={4}>
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
            <a style={{text: 'right'}} href={'/detail_object/' + object._id}>
              <h3 className={classes.cardTitle}>{object.objectTitle}</h3>
            </a>
            
            </h4>
            <p className={classes.cardDescription}>
              <p className={classes.sectionGray}>
                <CategoryIcon style={{ color: 'green', fontSize: '1rem', textJustify: 'center' }} />

                {object.category}

              </p>

            </p>
            <Button size='sm' block justifyContentBetween='center' color='facebook'>
              <h6  className={classNames(
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

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <h2 className={classes.cardTitle}>Latest Posts</h2>
          <GridContainer>
            {renderCards}
          </GridContainer>
        </div>
      </div>
    )
  }
}

SectionBlog.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(SectionBlog)
