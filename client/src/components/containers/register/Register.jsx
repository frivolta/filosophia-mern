import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../../redux/actions/authActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormGroup from '../../commons/FormGroup';
//Style
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './Register-style';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import './Register.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
      password: '',
      password2: '',
			errors: ''
		};
	}
	componentDidMount() {
		// Redirect to dashboard if is logged in
		if (this.props.auth.isAuthenticated) {
			//this.props.history.push('/dashboard');
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			//this.props.history.push('/dashboard');
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
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.confirmPassword
		};
		this.props.registerUser(newUser, this.props.history);
	};
	render() {
		const { classes } = this.props;
		const { errors } = this.state;
		return (
			<div className="contrast-page background--color flex-container">
				<Grid container spacing={24} className={classNames('flex-container', classes.root)}>
					<Grid item xs={12}>
						<Typography variant="h3" gutterBottom className="heading--white heading--light">
							Create your account
						</Typography>
						<form>
							<FormGroup
								name = "name"
								type="text"
								required="required"
								value={this.state.name}
								onchange={this.handleChange}
								label="name"
								err={errors.name}
							/>
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
							<FormGroup
								name="confirmPassword"
								type="password"
								required="required"
								value={this.state.confirmPassword}
								onchange={this.handleChange}
                err={errors.password2}
                label="Confirm Password"
							/>
							<Button
								onClick={this.handleSubmit}
								variant="contained"
								size="large"
								color="primary"
								className={classes.loginButton}
							>
								Sign Up
							</Button>
						</form>
					</Grid>
					<Link to="/" className="heading--link">
						<Typography
							variant="subtitle2"
							className="heading--white heading--center heading--link"
							gutterBottom
						>
							Already have an account? Sign In!
						</Typography>
					</Link>
				</Grid>
			</div>
		);
	}
}

Login.propTypes = {
  registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withStyles(styles)(Login));
