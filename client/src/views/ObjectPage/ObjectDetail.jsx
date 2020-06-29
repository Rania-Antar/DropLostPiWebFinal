import React from 'react'
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// @material-ui/icons
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import LocalShipping from '@material-ui/icons/LocalShipping'
import VerifiedUser from '@material-ui/icons/VerifiedUser'
import Favorite from '@material-ui/icons/Favorite'
// core components
import Header from '../../components/Header/HeaderFront.jsx'
import GridContainer from '../../components/Grid/GridContainer.jsx'
import GridItem from '../../components/Grid/GridItem.jsx'
import Footer from '../../components/Footer/FooterFront.jsx'
import Button from '../../components/CustomButtons/Button.jsx'
import Accordion from '../../components/Accordion/Accordion.jsx'
import InfoArea from '../../components/InfoArea/InfoArea.jsx'
import Card from '../../components/Card/Card.jsx'
import CardHeader from '../../components/Card/CardHeader.jsx'
import CardBody from '../../components/Card/CardBody.jsx'
import CardFooter from '../../components/Card/CardFooter.jsx'
import Tooltip from '@material-ui/core/Tooltip'
import HeaderLinks from '../../components/Header/HeaderLinksFront.jsx'
import Parallax from '../../components/Parallax/Parallax.jsx'

import productStyle from '../../jss/material-kit-pro-react/views/productStyle.jsx'

// images
import cardProduct1 from '../../../src/static/img/examples/card-product1.jpg'
import cardProduct3 from '../../../src/static/img/examples/card-product3.jpg'
import cardProduct4 from '../../../src/static/img/examples/card-product4.jpg'
import cardProduct2 from '../../../src/static/img/examples/card-product2.jpg'
import Axios from 'axios'
import ObjectImageDetail from './Sections/ObjectImageDetail.jsx'
import Moment from 'moment';


class ProductPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
       object: [],
        objectId : this.props.match.params.objectId,

      colorSelect: '0',
      sizeSelect: '0',
    }
  }

  handleSelect = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    Axios.get(`https://localhost:8080/objects/${this.state.objectId}`)
            .then(response => {
              this.setState({object:response.data})
              console.log(response.data)
               //setProduct(response.data[0])
            })
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.productPage}>
        <Header
          brand=''
          links={<HeaderLinks dropdownHoverColor='dark' />}
          fixed
          color='transparent'
          changeColorOnScroll={{
            height: 100,
            color: 'white',
          }}
        />
        <Parallax
          image={require('../../../src/static/img/bg6.jpg')}
          filter='dark'
          className={classes.pageHeader}
        >
          
        </Parallax>
        <div className={classNames(classes.section, classes.sectionGray)}>
          <div className={classes.container}>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <GridContainer>
                <ObjectImageDetail detail={this.state.object} />
                <GridItem md={6} sm={6}>
        <h2 className={classes.title}>Missing {this.state.object.category}</h2>
        <Button round>
        <h3 className={classes.cardTitle}>{this.state.object.brandName}</h3>
        </Button>
                  <Accordion
                    active={0}
                    activeColor='rose'
                    collapses={[
                      {
                        title: 'Description',
                        content: (
                          <Button round size='sm' block justifyContentBetween='center' color='facebook'>
                          <h2>
                            {this.state.object.objectTitle}
                          </h2>
                          </Button>
                        ),
                      },{
                        title: 'Details and Care',
                        content: (
                          <Button round size='sm' block justifyContentBetween='center' color='twitter'>
                          <ul>
                            <li>
                              <h3>{Moment(this.state.object.date).format('LLLL')}</h3>
                            </li>
                            <li>
                            <h3>Location: {this.state.object.location}</h3>
                            </li>
                           
                          </ul>
                          </Button>
                        ),
                      },
                      {
                        title: 'Founder Information',
                        content: (
                          <p>
                            {`An infusion of West Coast cool and New York
                            attitude, Rebecca Minkoff is synonymous with It girl
                            style. Minkoff burst on the fashion scene with her
                            best-selling 'Morning After Bag' and later expanded
                            her offering with the Rebecca Minkoff Collection - a
                            range of luxe city staples with a "downtown
                            romantic" theme.`}
                          </p>
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
          // theme="dark"
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href='https://www.creative-tim.com/'
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href='https://www.creative-tim.com/presentation'
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href='//blog.creative-tim.com/'
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href='https://www.creative-tim.com/license'
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{' '}
                <Favorite className={classes.icon} /> by{' '}
                <a
                  href='https://www.creative-tim.com'
                  className={classes.aClasses}
                >
                  Creative Tim
                </a>{' '}
                for a better web.
              </div>
            </div>
          }
        />
      </div>
    )
  }
}

ProductPage.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(productStyle)(ProductPage)
