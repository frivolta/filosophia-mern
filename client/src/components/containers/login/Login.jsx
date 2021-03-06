import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/authActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormGroup from '../../commons/FormGroup';
//Style
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './Login-style';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import './Login.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: ''
		};
	}
	componentDidMount() {
		// Redirect to dashboard if is logged in
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
		if (nextProps.errors) {
			this.setState({
				...this.state,
				errors: nextProps.errors
			});
		}
	}
	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		console.log(userData);
		this.props.loginUser(userData);
	};
	render() {
		const { classes } = this.props;
		const { errors } = this.state;
		return (
			<div className="contrast-page background--color flex-container">
				<Grid container spacing={24} className={classNames('flex-container', classes.root)}>
					<Grid item xs={12}>
						<Typography variant="h3" gutterBottom className="heading--white heading--light">
							Hello there, welcome back.
						</Typography>
						<form>
							<FormGroup
								name = "email"
								type="text"
								required="required"
								value={this.state.email}
								onchange={this.handleChange}
								label="Email"
								err={errors.email}
							/>
							<FormGroup
								name="password"
								type="password"
								required="required"
								value={this.state.password}
								onchange={this.handleChange}
								err={errors.password}
								label="Password"
							/>
							<Button
								onClick={this.handleSubmit}
								variant="contained"
								size="large"
								color="primary"
								className={classes.loginButton}
							>
								Login
							</Button>
						</form>
					</Grid>
					<Link to="/register" className="heading--link">
						<Typography
							variant="subtitle2"
							className="heading--white heading--center heading--link"
							gutterBottom
						>
							Don't have an account? Sign up!
						</Typography>
					</Link>
				</Grid>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login));
