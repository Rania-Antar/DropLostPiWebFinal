import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import Check from '@material-ui/icons/Check'
import Warning from '@material-ui/icons/Warning'
// core components
import SnackbarContent from '../../../components/Snackbar/SnackbarContent.jsx'
import Clearfix from '../../../components/Clearfix/Clearfix.jsx'
import notificationsStyles from '../../../jss/material-kit-pro-react/views/componentsSections/notificationsStyles.jsx'

class SectionNotifications extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={`${classes.section} cd-section`} id='notifications'>
        
        <SnackbarContent
          message={
            <span>
              <b>INFO ALERT:</b>{' '}
              {`You've got some friends nearby, stop looking at
              your phone and find them...`}
            </span>
          }
          close
          color='info'
          icon='info_outline'
        />
        
        <Clearfix />
      </div>
    )
  }
}

SectionNotifications.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(notificationsStyles)(SectionNotifications)
