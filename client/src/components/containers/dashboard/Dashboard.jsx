import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../redux/actions/authActions';
import { getAllQuotes } from '../../../redux/actions/quoteActions';
import { connect } from 'react-redux';
import Layout from '../layout/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Dashboard.scss'
import QuoteItems from '../quotes/QuoteItems/QuoteItems';

class Dashboard extends Component {
	componentDidMount(){
		this.props.getAllQuotes();
		console.log(this.props.quotes.quotes)
	}

	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	render() {
		const { quotes, isLoading } = this.props.quotes;
    let quotesContent;
    if( quotes === null || isLoading ){
      quotesContent = <CircularProgress className="progress"/>
    } else {
      quotesContent = <QuoteItems quotes={quotes}/>
		}
		
		return (
			<Layout pageTitle="Quotes">
				{quotesContent}
			</Layout>
		);
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	quotes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	getAllQuotes: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	quotes: state.quotes
});

export default connect(mapStateToProps, { logoutUser, getAllQuotes })(Dashboard);
