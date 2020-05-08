import React, { Component } from 'react'
import Table from './Simple'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => this.setState({data: data}))
      .catch(err => console.log(err))
  }

  render() {
    const columns = [
      {Header: 'ID', accessor: 'id'},
      {Header: 'Title', accessor: 'title'},
    ]

    return (
      <Table
        columns={columns}
        data={this.state.data} />
    )
  }
}

export default App
