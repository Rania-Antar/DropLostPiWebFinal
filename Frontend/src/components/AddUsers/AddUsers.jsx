import React, { Component, Fragment } from 'react'
import { Segment, Table, Form, Input, Button } from 'semantic-ui-react'
import axios from 'axios'

class AddUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      name: '',
      phone: '',
      bracketType: this.props.bracket,
      addUserUrl: `http://localhost:8080/bracket/${this.props.bracket}/users`
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getUsers = () => {
    let tempList = []

    axios.get(this.state.getUsersUrl,{
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      for (const user in res.data[1].users) {
        tempList = tempList.concat(res.data[1].users[user])
      }
      console.log(res.data[1].users)
      this.setState({users: tempList})
    })
  }

  addUser = (e) => {
    let user, tempList
    e.preventDefault()
    const tempInfo = {
      name: this.state.name,
      phone: this.state.phone
    }
    tempList = this.state.users
    tempList.push(tempInfo)
    this.setState({
        users: tempList,
        name: '',
        phone: ''
      });
  }

  nextStep = () => {
    console.log(this.state.users)
    let user = ''
    axios.post(this.state.addUserUrl, {
      users: this.state.users,
      completedStep: 'users'
    })
    .then(res => {
      this.name.focus()
      this.props.getNextStep(res.data.NextStep)
    })
  }

  renderUsersTable = () => {
    return (
      <Table.Body>
        {
          this.state.users.map(user => {
            (
              <Fragment key={user.id}>
                <Table.Row>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                </Table.Row>
              </Fragment>
            )
          })
        }
      </Table.Body>
    )
  }

  render() {
    return (
      <Segment basic="true">
        <Table celled="true" structured="true" size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Tag</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              this.state.users.map(user => {
                return (<Fragment key={user.id}>
                    <Table.Row>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.phone}</Table.Cell>
                    </Table.Row>
                  </Fragment>
                )
              })
            }
          </Table.Body>
        </Table>
        <Form onSubmit={e => this.addUser(e)}>
          <Input 
            name='name' 
            placeholder='Name' 
            size='medium' 
            value={this.state.name} 
            ref={(name) => {this.name = name}} 
            onChange={e => this.handleChange(e)} />
          <Input 
            name='phone' 
            placeholder='Phone (optional)' 
            size='medium' 
            value={this.state.phone} 
            onChange={e => this.handleChange(e)} />
          <Button size='medium' content='Add to Bracket'/>
        </Form>
        <Form onSubmit={this.nextStep}>
          <Button size='large' content='Next Step'/>
        </Form>
      </Segment>
    )
  }
}

export default AddUsers