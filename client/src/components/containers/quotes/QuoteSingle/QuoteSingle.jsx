import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './QuoteSingle.scss';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

class QuoteSingle extends Component {
	render() {
		const { text, _id, category, avatar,date } = this.props.quote;
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
											Ali Connors says:
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
					<IconButton>
						<FavoriteBorderIcon className="quote-single__like-button" />
					</IconButton>
				</Grid>
				<Grid item xs={12}>
					<div className="quote-single__chip">{category}</div>
				</Grid>
			</Paper>
		);
	}
}

QuoteSingle.propTypes = {};

export default QuoteSingle;
