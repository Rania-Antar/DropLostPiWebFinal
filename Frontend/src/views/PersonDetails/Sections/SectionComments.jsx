import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
// @material-ui/icons
import Reply from '@material-ui/icons/Reply'
import Favorite from '@material-ui/icons/Favorite'
// core components
import GridContainer from '../../../components/Grid/GridContainer.jsx'
import GridItem from '../../../components/Grid/GridItem.jsx'
import Media from '../../../components/Media/Media.jsx'
import Button from '../../../components/CustomButtons/Button.jsx'
import CustomInput from '../../../components/CustomInput/CustomInput.jsx'

import profile4 from '../../../../src/static/img/faces/card-profile4-square.jpg'
import profile1 from '../../../../src/static/img/faces/card-profile1-square.jpg'
import profile6 from '../../../../src/static/img/faces/card-profile6-square.jpg'

import sectionCommentsStyle from '../../../jss/material-kit-pro-react/views/blogPostSections/sectionCommentsStyle.jsx'

function SectionComments({ ...props }) {
  const { classes } = props
  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={10} md={8}>
          <div>
            <h3 className={classes.title}>2 Comments</h3>
            <Media
              avatar={profile4}
              title={
                <span>
                  Tina Andrew <small>· 7 minutes ago</small>
                </span>
              }
              body={
                <p className={classes.color555}>
                  {`Chance too good. God level bars. I'm so proud of
                  @LifeOfDesiigner #1 song in the country. Panda! Don't be
                  scared of the truth because we need to restart the human
                  foundation in truth I stand with the most humility. We are so
                  blessed!`}
                </p>
              }

            />
            <hr/>
            <Media
              avatar={profile1}
              title={
                <span>
                  John Camber <small>· Yesterday</small>
                </span>
              }
              body={
                <span className={classes.color555}>
                  <p>
                    Hello guys, nice to have you on the platform! There will be
                    a lot of great stuff coming soon. We will keep you posted
                    for the latest news.
                  </p>
                  <p>{`Don't forget, You're Awesome!`}</p>
                </span>
              }
            />
          </div>
          <hr/>
          <h3 className={classes.title}>Post your comment</h3>
          <Media
            avatar={profile6}
            body={
              <CustomInput
                labelText=' Write some nice stuff or nothing...'
                id='nice'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                }}
              />
            }
            footer={
              <Button color='primary' round className={classes.footerButtons}>
                Post comment
              </Button>
            }
          />
        </GridItem>
      </GridContainer>
    </div>
  )
}

SectionComments.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(sectionCommentsStyle)(SectionComments)
