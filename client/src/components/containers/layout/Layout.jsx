import React, { Component } from 'react';
import { styles } from './Layout-style';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../redux/actions/authActions';
import { Link } from 'react-router-dom';

//Style and layout
import './Layout.scss';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FaceIcon from '@material-ui/icons/Face';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import KeyboardBackSpaceIcon from '@material-ui/icons/KeyboardBackspace';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerActive: false,
		};
	}
	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	handleOpenDrawer = (open) => {
		this.setState({
			...this.state,
			drawerActive: open
		});
	};


	render() {
		const { classes } = this.props;
		const { avatar, name, email } = this.props.auth.user;
		const { pathname } = window.location;

		//Change Drawer Icon
		const fabIcon = (
			pathname === '/add-quote' ? 
			<Link to="/">
				<Fab color="secondary" aria-label="Add" className={classes.fabButton}>
					<KeyboardBackSpaceIcon />
				</Fab>
			</Link>
			:
			<Link to="/add-quote">
				<Fab color="secondary" aria-label="Add" className={classes.fabButton}>
					<EditIcon />
				</Fab>
			</Link>
		)

		//Drawer Menù List Definition
		const sideList = (
			<div className={classes.list}>
				<List>
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt="User Avatar" src={avatar} />
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography variant="h6" color="textPrimary">
									{name}
								</Typography>
							}
							secondary={email}
							style={{ marginBottom: '20px' }}
						/>
					</ListItem>
					{[ 'Inbox', 'Starred', 'Send email', 'Drafts' ].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<ListItem button onClick={this.handleLogout}>
					<Avatar style={{backgroundColor: '#F80759'}}>
						<InboxIcon />
					</Avatar>
					<ListItemText primary="Logout"/>
				</ListItem>
			</div>
		);

		return (
			<div>
				<AppBar position="static" color="primary" className={classNames('app-bar', classes.appBar)}>
					<Toolbar>
						<Typography variant="h5" color="inherit" className={classes.appBarTopText}>
							{this.props.pageTitle}
						</Typography>
					</Toolbar>
				</AppBar>
				<div className="content">{this.props.children}</div>
				<SwipeableDrawer
					open={this.state.drawerActive}
					onClose={() => this.handleOpenDrawer(false)}
					onOpen={() => this.handleOpenDrawer(true)}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={() => this.handleOpenDrawer(false)}
						onKeyDown={() => this.handleOpenDrawer(false)}
					>
						{sideList}
					</div>
				</SwipeableDrawer>
				<AppBar position="fixed" color="primary" className={classNames('app-bar', classes.appBar)}>
					<Toolbar className={classes.toolbar}>
						<IconButton
							onClick={() => this.handleOpenDrawer(true)}
							color="inherit"
							aria-label="Open drawer"
						>
							<MenuIcon />
						</IconButton>
						{fabIcon}
						<div>
							<IconButton color="inherit">
								<FavoriteIcon />
							</IconButton>
							<IconButton color="inherit">
								<FaceIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired,
	pageTitle: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Layout));
