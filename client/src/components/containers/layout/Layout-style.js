export const styles = (theme) => ({
	text: {
		paddingTop: theme.spacing.unit * 2,
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2
	},
	paper: {
		paddingBottom: 50
	},
	list: {
		marginBottom: theme.spacing.unit * 2
	},
	subHeader: {
		backgroundColor: theme.palette.background.paper
	},
	appBar: {
		top: 'auto',
		bottom: 0
  },
  appBarTopText:{
    width: '100%',
    textAlign: 'center',
    top: 'auto',
		bottom: 0
  },
	toolbar: {
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	fabButton: {
		position: 'absolute',
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});