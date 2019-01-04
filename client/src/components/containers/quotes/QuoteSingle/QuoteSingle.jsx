import React, { Component } from 'react'

export default class QuoteSingle extends Component {
  render() {
    const {text} = this.props.quote;
    return (
      <div>
        {text}
      </div>
    )
  }
}
