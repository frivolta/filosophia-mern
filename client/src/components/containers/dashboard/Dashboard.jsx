import React, { Component } from 'react';
import { logoutUser } from '../../../redux/actions/authActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
  handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);