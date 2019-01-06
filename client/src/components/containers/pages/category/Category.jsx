import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../../redux/actions/authActions';
import { getCategoryQuotes } from '../../../../redux/actions/quoteActions';
import { connect } from 'react-redux';
import Layout from '../../layout/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import QuoteItems from '../../quotes/QuoteItems/QuoteItems';

class Category extends Component {

	componentDidMount(){
    this.props.getCategoryQuotes(this.props.match.params.cat);
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
			<Layout pageTitle={this.props.match.params.cat}>
				{quotesContent}
			</Layout>
		);
	}
}

Category.propTypes = {
	auth: PropTypes.object.isRequired,
	quotes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	getCategoryQuotes: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	quotes: state.quotes
});

export default connect(mapStateToProps, { logoutUser, getCategoryQuotes })(Category);
