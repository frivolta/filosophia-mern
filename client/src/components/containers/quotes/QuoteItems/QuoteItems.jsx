import React, { Component } from 'react';
import QuoteSingle from '../QuoteSingle/QuoteSingle';


export default class QuoteItems extends Component {
  render() {
    const { quotes } = this.props;
    return (
      <div>
        {quotes.map(quote=><QuoteSingle quote={quote}/>)}
      </div>
    )
  }
}
