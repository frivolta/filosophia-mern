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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FaceIcon from '@material-ui/icons/Face';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PetsIcon from '@material-ui/icons/Pets';
import GroupIcon from '@material-ui/icons/Group';
import AppsIcon from '@material-ui/icons/Apps';
import KeyboardBackSpaceIcon from '@material-ui/icons/KeyboardBackspace';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerActive: false
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
		const fabIcon =
			pathname === '/add-quote' || pathname === '/loved' || pathname === '/my-quotes' ? (
				<Link to="/">
					<Fab color="secondary" aria-label="Add" className={classes.fabButton}>
						<KeyboardBackSpaceIcon />
					</Fab>
				</Link>
			) : (
				<Link to="/add-quote">
					<Fab color="secondary" aria-label="Add" className={classes.fabButton}>
						<EditIcon />
					</Fab>
				</Link>
			);

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
					<a href="/Life" className="category-link">
						<ListItem button>
							<Avatar style={{ backgroundColor: '#ffb74d'}}><FingerprintIcon /></Avatar>
							<ListItemText primary="Life" />
						</ListItem>
						</a>
					<a href="/Love" className="category-link">
						<ListItem button>
							<Avatar style={{ backgroundColor: '#f06292'}}><PetsIcon /></Avatar>
							<ListItemText primary="Love" />
						</ListItem>
						</a>
					<a href="/Work" className="category-link">
						<ListItem button>
							<Avatar style={{ backgroundColor: '#64b5f6'}}><GroupIcon /></Avatar>
							<ListItemText primary="Work" />
						</ListItem>
					</a>
					<a href="/Other" className="category-link">
						<ListItem button>
							<Avatar style={{ backgroundColor: '#607d8b'}}><AppsIcon /></Avatar>
							<ListItemText primary="Other" />
						</ListItem>
					</a>
				</List>
				<Divider />
				<ListItem button onClick={this.handleLogout}>
					<Avatar style={{ backgroundColor: '#F80759' }}>
						<InboxIcon />
					</Avatar>
					<ListItemText primary="Logout" />
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
							<Link to="/loved" style={{ color: 'white' }}>
								<IconButton color="inherit">
									<FavoriteIcon />
								</IconButton>
							</Link>
							<Link to="/my-quotes" style={{ color: 'white' }}>
								<IconButton color="inherit">
									<FaceIcon />
								</IconButton>
							</Link>
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
