export const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit*2,
  },
  headings: {
    color: theme.palette.primary.light,
    fontWeight: 100
  },
  loginButton:{
    color: theme.palette.primary.main,
    width:'100%',
    paddingTop:'16px',
    paddingBottom:'16px',
    backgroundColor: 'rgba(255,255,255,1)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,.8)',
    },
    category: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
      textAlign: 'center',
    },
    categoryAvatar: {
      textAlign: 'center',
      margin: '0 auto',
      position: 'relative',
      display: 'block'
    }
}
});