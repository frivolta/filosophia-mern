import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addLike, removeLike, deleteQuote} from '../../../../redux/actions/quoteActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './QuoteSingle.scss';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import AlertDialogSlide from '../../../commons/AlertDialog';

class QuoteSingle extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryLife: '#ffb74d',
      categoryLove: '#f06292',
      categoryWork: '#64b5f6',
      categoryOther: '#607d8b',
      alertDialogOpen: false
    }
  }
  findUserLike =(likes)=>{
    const { auth } = this.props;
    if(likes.filter(like => like.user === auth.user.id).length>0){
      return true;
    } else {
      return false;
    }
  }
  userCanDelete = (authorId, authId)=>{
    if(authorId===authId){
      return true
    } else {
      return false
    }
  }
  openDialog = ()=>{
    this.setState({
      alertDialogOpen: !this.state.alertDialogOpen
    })
  }
  deleteQuote = (id) => {
    this.props.deleteQuote(id);
  }
  addLike = (id) => {
    this.props.addLike(id);
  }
  removeLike = (id) => {
    this.props.removeLike(id);
  }

  selectBackgroundColor = (category) => {
    const {categoryLife, categoryLove, categoryWork, categoryOther} = this.state;

    if (category === 'Life'){
      return categoryLife;
    }
    if (category === 'Love'){
      return categoryLove;
    }
    if (category === 'Work'){
      return categoryWork;
    }
    if (category === 'Other'){
      return categoryOther;
    }
  }
	render() {
    const { text, _id, category, avatar, date, username, likes, user } = this.props.quote;
		return (
			<Paper key={_id} className="paper">
				<Grid item xs={12}>
					<div className="quote-single__badge">
						<List className="quote-single__list">
							<ListItem className="quote-single__list-item">
								<Avatar className="quote-single__avatar" src={avatar} />
								<ListItemText
									primary={
										<Typography variant="h6" color="primary">
											{username} says:
										</Typography>
									}
									secondary={
                    <React.Fragment>
                      <Moment fromNow ago>
                        {date}
                      </Moment>
                      {' '}ago
                    </React.Fragment>
                  }
								/>
							</ListItem>
						</List>
					</div>
				</Grid>

				<Grid item xs={12}>
					{text}
				</Grid>

				<Grid item xs={12}>
					<IconButton className="quote-single__button-container">
            {this.findUserLike(likes) ? <Favorite className="quote-single__like-button" onClick = {()=>this.removeLike(_id)} /> : <FavoriteBorderIcon className="quote-single__like-button" onClick = {()=>this.addLike(_id)}/>}
        	</IconButton>
					<IconButton  className="quote-single__button-container">
                {this.userCanDelete(this.props.auth.user.id, user ) && <HighlightOffIcon onClick={()=>this.openDialog(_id)}  className="quote-single__delete-button"/>}
					</IconButton>
				</Grid>
				<Grid item xs={12}>
					<div className="quote-single__chip" style={{backgroundColor: this.selectBackgroundColor(category)}}>{category}</div>
				</Grid>
        <AlertDialogSlide open={this.state.alertDialogOpen} onsuccess={()=>this.props.deleteQuote(_id)}/>
			</Paper>
		);
	}
}

QuoteSingle.propTypes = {
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteQuote: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, {addLike, removeLike, deleteQuote})(QuoteSingle);
