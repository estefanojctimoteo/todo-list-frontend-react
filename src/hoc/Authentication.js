import React, { Component } from 'react'

const Forbidden = () => <div>Access denied</div>

class Authentication extends Component {
  constructor (props) {
    super(props)    

    this.state = {
      ComposedComponent: props.ComposedComponent,
      authenticated: props.authenticated,
      authorized: props.authorized
    }
  }
  render() {
    const { ComposedComponent, authorized } = this.state
    if ( authorized )
      return <ComposedComponent {...this.props} />
    return <Forbidden />
  }
}
export default Authentication