import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class Settings extends Component {
  render() {
    return (
      <Segment 
        basic
        content={this.props.bracket}
        />
    )
  }
}

export default Settings