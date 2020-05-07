import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import axios from 'axios'

class CreateTournament extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tourneyName: '',
      bracketType: this.props.bracket,
      url: `http://localhost:8080/bracket/${this.props.bracket}/create`
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createSingles = () => {
    axios.post(this.state.url, {
      name: this.state.tourneyName,
      apiKey: 'xJs0FWU1ZbOo84PHnZyKwE3CG8QVf1aOxJEuBjQO',
      subdomain: 'rsam',
      completedStep: 'create'
    })
    .then(res => {
      console.log(res.data.NextStep)
      this.props.getNextStep(res.data.NextStep)
    })
    .catch(err => err)
    console.log(this.state.url)
  }

  render() {
    return (
      <Form onSubmit={this.createSingles}>
        <Input name='tourneyName' size='massive' placeholder='Tournament Name' value={this.state.tourneyName} onChange={e => this.handleChange(e)} />
        <Button size='massive' content='Create Tournament'  />
      </Form>
    )
  }
}

export default CreateTournament