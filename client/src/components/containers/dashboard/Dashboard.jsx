import React, { Component } from 'react';
import { logoutUser } from '../../../redux/actions/authActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';



class Dashboard extends Component {
	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	render() {
		return (
			<Layout pageTitle="Quotes">
				<h1>Dashboard</h1>
			
				
			</Layout>
		);
	}
}
const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
