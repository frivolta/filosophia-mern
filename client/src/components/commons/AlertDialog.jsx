import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.open!==this.props.open){
      this.setState({
        open: nextProps.open
      })
    }
  }


  handleClose = (agree) => {
    this.setState({ open: false });
    if(agree){
      this.props.onsuccess();
    }
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Hey! Are you sure you want to delete your quote?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={()=>this.handleClose(false)} color="primary">
              Nope!
            </Button>
            <Button onClick={()=>this.handleClose(true)} color="primary">
              Yep...
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;