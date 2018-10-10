import React from "react"

export default class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
    }
  }

  componentDidMount = () => {
    window
      .fetch("http://super-fullstack-j031.c9users.io:8081/hello")
      .then(res => res.json())
      .then(result => {
        console.log(result.data)
        this.setState({ result: result.data })
      })
  }

  render = () => {
    const { result } = this.state
    return result ? <h2>{result}</h2> : <h2>loading</h2>
  }
}
