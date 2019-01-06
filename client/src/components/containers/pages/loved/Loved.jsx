import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../../redux/actions/authActions';
import { getAllQuotes } from '../../../../redux/actions/quoteActions';
import { connect } from 'react-redux';
import Layout from '../../layout/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import QuoteItems from '../../quotes/QuoteItems/QuoteItems';

class Loved extends Component {
	componentDidMount(){
		this.props.getAllQuotes();
	}
  selectLovedFromQuotes = (quotes) => {
    const userId = this.props.auth.user.id;
    let lovedQuotesArr = [];
    quotes.map(quote=>{
      quote.likes.map(like=>{
        if (like.user == userId){ lovedQuotesArr.push(quote) }
      });
    });
    return lovedQuotesArr;
  }

	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	render() {
    const { quotes, isLoading } = this.props.quotes;
    const lovedQuotes = this.selectLovedFromQuotes(quotes);
    let quotesContent;
    if( quotes === null || isLoading ){
      quotesContent = <CircularProgress className="progress"/>
    } else {
      quotesContent = <QuoteItems quotes={lovedQuotes}/>
		}
		
		return (
			<Layout pageTitle="Loved Quotes">
				{quotesContent}
			</Layout>
		);
	}
}

Loved.propTypes = {
	auth: PropTypes.object.isRequired,
	quotes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	getAllQuotes: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	quotes: state.quotes
});

export default connect(mapStateToProps, { logoutUser, getAllQuotes })(Loved);
