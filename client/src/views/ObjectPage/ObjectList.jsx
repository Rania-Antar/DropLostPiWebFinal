import React from 'react'
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from 'classnames'
// core components
import Header from '../../components/Header/HeaderFront.jsx'
import GridContainer from '../../components/Grid/GridContainer.jsx'
import GridItem from '../../components/Grid/GridItem.jsx'
import Button from '../../components/CustomButtons/Button.jsx'
import Card from '../../components/Card/Card.jsx'
import CardBody from '../../components/Card/CardBody.jsx'
import CustomInput from '../../components/CustomInput/CustomInput.jsx'
import Footer from '../../components/Footer/FooterFront.jsx'
import HeaderLinks from '../../components/Header/HeaderLinksFront.jsx'
import Parallax from '../../components/Parallax/Parallax.jsx'
// sections for this page
import SectionLatestOffers from './Sections/SectionLatestOffers.jsx'
import SectionProducts from './Sections/SectionProducts.jsx'
import SectionBlog from './Sections/SectionBlog.jsx'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import InputAdornment from '@material-ui/core/InputAdornment'
// @material-ui icons
import Mail from '@material-ui/icons/Mail'

import ecommerceHeader from '../../../src/static/img/examples/ecommerce-header.jpg'
import face1 from '../../../src/static/img/faces/card-profile6-square.jpg'
import face2 from '../../../src/static/img/faces/christian.jpg'
import face3 from '../../../src/static/img/faces/card-profile4-square.jpg'
import face4 from '../../../src/static/img/faces/card-profile1-square.jpg'
import face5 from '../../../src/static/img/faces/marc.jpg'
import face6 from '../../../src/static/img/faces/kendall.jpg'
import face7 from '../../../src/static/img/faces/card-profile5-square.jpg'
import face8 from '../../../src/static/img/faces/card-profile2-square.jpg'

import styles from '../../jss/material-kit-pro-react/views/ecommerceStyle.jsx'

class EcommercePage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <Header
          brand=''
          links={<HeaderLinks dropdownHoverColor='danger' />}
          fixed
          color='transparent'
          changeColorOnScroll={{
            height: 300,
            color: 'info',
          }}
        />
        <Parallax
          image={require('../../../src/static/img/examples/clark-street-merc.jpg')}
          filter='dark'
          small
        >
          <div className={classes.container}>
            <GridContainer>
              <GridItem
                md={8}
                sm={8}
                className={classNames(
                  classes.mlAuto,
                  classes.mrAuto,
                  classes.textCenter
                )}
              >
                <div className={classes.brand}>
                  <h1 className={classes.title}>All Missing Objects!</h1>
                  <h4>
                    You can filter objects by{' '}
                    <b>Categories</b> or by<b>Country</b>
                  </h4>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        
        <SectionBlog />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionProducts />
        </div>
       

        
        <Footer
          theme='dark'
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href='http://blog.creative-tim.com/'
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href='https://www.creative-tim.com/presentation'
                      className={classes.block}
                    >
                      Presentation
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href='#pablito'
                      onClick={(e) => e.preventDefault()}
                      className={classes.block}
                    >
                      Discover
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href='#pablito'
                      onClick={(e) => e.preventDefault()}
                      className={classes.block}
                    >
                      Payment
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href='https://www.creative-tim.com/contact-us'
                      className={classes.block}
                    >
                      Contact us
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                Copyright &copy; {1900 + new Date().getYear()}{' '}
                <a
                  href='https://www.creative-tim.com'
                  className={classes.aClasses}
                >
                  TRUST IT 
                </a>{' '}
                All Rights Reserved.
              </div>
            </div>
          }
        >
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <h5>About Us</h5>
              <p>
                DROP LOST is a Web Site that helps people to find their missing Objects
                .{' '}
              </p>
              
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <h5>Social Feed</h5>
              <div className={classes.socialFeed}>
                <div>
                  <i className='fab fa-twitter' />
                  <p>How to handle ethical disagreements with your clients.</p>
                </div>
                <div>
                  <i className='fab fa-twitter' />
                  <p>The tangible benefits of designing at 1x pixel density.</p>
                </div>
                <div>
                  <i className='fab fa-facebook-square' />
                  <p>
                    A collection of 25 stunning sites that you can use for
                    inspiration.
                  </p>
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <h5>Instagram Feed</h5>
              <div className={classes.galleryFeed}>
                <img
                  src={face1}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt='...'
                />
                <img
                  src={face2}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt='...'
                />
                <img
                  src={face3}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt='...'
                />
                <img
                  src={face4}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt='...'
                />
                <img
                  src={face5}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt='...'
                />
                <img
                  src={face6}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt='...'
                />
                <img
                  src={face7}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt='...'
                />
                <img
                  src={face8}
                  className={classNames(
                    classes.img,
                    classes.imgRaised,
                    classes.imgRounded
                  )}
                  alt='...'
                />
              </div>
            </GridItem>
          </GridContainer>
        </Footer>
      </div>
    )
  }
}

EcommercePage.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(EcommercePage)
