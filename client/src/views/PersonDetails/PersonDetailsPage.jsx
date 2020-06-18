import React from 'react'
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from 'classnames'
// react component used to create nice image meadia player
import ImageGallery from 'react-image-gallery'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// @material-ui/icons
import Call from '@material-ui/icons/Call'

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
import lost3 from '../../../src/static/img/missing/missing3.jpg'
import lost31 from '../../../src/static/img/missing/missing31.jpg'
import lost32 from '../../../src/static/img/missing/missing32.jpg'
import lost33 from '../../../src/static/img/missing/missing33.jpg'

import SelectionComments from '../PersonDetails/Sections/SectionComments.jsx'

class PersonDetailsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
  }
  render() {
    const { classes } = this.props
    const images = [
      {
        original: lost3,
        thumbnail: lost3,
      },
      {
        original: lost31,
        thumbnail: lost31,
      },
      {
        original: lost32,
        thumbnail: lost32,
      },
      {
        original: lost33,
        thumbnail: lost33,
      },
    ]
    return (
      <div className={classes.productPage}>
        <Header
          brand='DropLost'
          links={<HeaderLinks dropdownHoverColor='primary' />}
          fixed
          color='transparent'
          changeColorOnScroll={{
            height: 100,
            color: 'primary',
          }}
        />
        <Parallax
          image={require('../../../src/static/img/bg6.jpg')}
          filter='primary'
          className={classes.pageHeader}
        >

        </Parallax>
        <div className={classNames(classes.section, classes.sectionGray)}>
          <div className={classes.container}>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <GridContainer>
                <GridItem md={6} sm={6}>
                  <ImageGallery
                    showFullscreenButton={false}
                    showPlayButton={false}
                    startIndex={3}
                    items={images}
                  />
                </GridItem>
                <GridItem md={6} sm={6}>
                  <h2 className={classes.title}>Becky Silk Blazer</h2>
                  <Accordion
                    active={0}
                    activeColor='primary'
                    collapses={[
                      {
                        title: 'Description',
                        content: (
                          <p>
                            {`Eres' daring 'Grigri Fortune' swimsuit has the fit
                            and coverage of a bikini in a one-piece silhouette.
                            This fuchsia style is crafted from the label's
                            sculpting peau douce fabric and has flattering
                            cutouts through the torso and back. Wear yours with
                            mirrored sunglasses on vacation.`}
                          </p>
                        ),
                      },
                      {
                        title: 'Designer Information',
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
                      {
                        title: 'Details and Care',
                        content: (
                          <ul>
                            <li>
                              Storm and midnight-blue stretch cotton-blend
                            </li>
                            <li>
                              Notch lapels, functioning buttoned cuffs, two
                              front flap pockets, single vent, internal pocket
                            </li>
                            <li>Two button fastening</li>
                            <li>84% cotton, 14% nylon, 2% elastane</li>
                            <li>Dry clean</li>
                          </ul>
                        ),
                      },
                    ]}
                  />

                  <GridContainer className={classes.pullRight}>
                    <Button round color='primary'>
                      Call &nbsp; <Call />
                    </Button>
                  </GridContainer>
                </GridItem>
              </GridContainer>
              <hr/>
              <SelectionComments/>
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

PersonDetailsPage.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(productStyle)(PersonDetailsPage)
