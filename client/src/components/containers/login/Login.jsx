import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/authActions';
import PropTypes, { object } from 'prop-types';
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
	componentDidMount(){
    // Redirect to dashboard if is logged in
    if(this.props.auth.isAuthenticated){
      console.log('push to dashboard');
    }
  }
	componentWillReceiveProps(nextProps){
		if (nextProps.auth.isAuthenticated){
			console.log('push to dashboard');
			/*this.props.history.push('/dashboard');*/
		}
		if (nextProps.errors){
			this.setState({
				...this.state,
				errors: nextProps.errors
			})
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
							<div className="group">
								<input
									name="email"
									type="text"
									required="required"
									value={this.state.email}
									onChange={this.handleChange}
								/>
								<span className="highlight" />
								<span className="bar" />
								<label>Email</label>
								{errors.email ? <p className="error">{errors.email}</p> : null }
							</div>
							<div className="group">
								<input
									name="password"
									type="password"
									required="required"
									value={this.state.password}
									onChange={this.handleChange}
								/>
								<span className="highlight" />
								<span className="bar" />
								<label>Password</label>
								{errors.password ? <p className="error">{errors.password}</p> : null }
							</div>
							<Button onClick={this.handleSubmit} variant="contained" size="large" color="primary" className={classes.loginButton}>
								Login
							</Button>
						</form>
					</Grid>
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
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login));
