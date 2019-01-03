export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    margin: '0 auto'

  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit *2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    width:'100%'
  },
  saveButton:{
    width:'100%',
    paddingTop:theme.spacing.unit,
    paddingBottom:theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit, 
    marginTop: theme.spacing.unit
    },
});