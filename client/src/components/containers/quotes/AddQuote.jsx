import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout/Layout';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuoteCategoryItem from '../../commons/QuoteCategoryItem';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PetsIcon from '@material-ui/icons/Pets';
import GroupIcon from '@material-ui/icons/Group';
import AppsIcon from '@material-ui/icons/Apps';
//Style
import { styles } from './AddQuote-style';
import { withStyles } from '@material-ui/core';
import './AddQuote.scss';

class AddQuote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			saveQuoteClick: 'false',
      multiline: '',
      categories: [
        {
          id: 1,
          selected: false,
          iconName: <FingerprintIcon/>,
          label: 'Life',
          backgroundColor: '#ffb74d',
        },
        {
          id: 2,
          selected: false,
          iconName: <PetsIcon/>,
          label: 'Love',
          backgroundColor: '#f06292',
        },
        {
          id: 3,
          selected: false,
          iconName: <GroupIcon/>,
          label: 'Work',
          backgroundColor: '#64b5f6',
        },
        {
          id: 4,
          selected: false,
          iconName: <AppsIcon/>,
          label: 'Other',
          backgroundColor: '#607d8b',
        },

      ]
		};
  }

  //Handle opacity and selection for category badge
  handleCategoryClick = (catId) => {
    const immutableState = this.state;
    immutableState.categories.map((item)=>(
      item.id === catId ? item.selected=true : item.selected=false
    ));
    this.setState({
      ...this.state,
      immutableState
    })
  }
  //Change for form event
	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
  };
  
  //Save quote to db
	handleSaveQuote=()=>{
    const category = this.state.categories.filter(category => category.selected);
    const { id, avatar } = this.props.auth.user
    const quote = {
      text: this.state.multiline,
      category: category[0].label,
      id,
      avatar
    }
    console.log(quote)
  }
 

	render() {
		const { classes } = this.props;
		return (
			<Layout pageTitle="Add your quote">
				<Grid container spacing={16} className={classes.root}>
					<Grid item xs={12}>
						<Paper className={classes.paper} elevation={1}>
							<Typography variant="h5" component="h3">
								Quote text
								<TextField
									id="outlined-multiline-flexible"
									label=""
									multiline
									rowsMax="6"
									value={this.state.multiline}
									onChange={this.handleChange('multiline')}
									className={classes.textField}
									margin="normal"
									helperText="Write your quote!"
									variant="outlined"
								/>
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper} >
							<Typography variant="h5" component="h3">
								Quote Category
                <div className="quote-category-block">
                  {this.state.categories.map( category => (
                    <QuoteCategoryItem
                      key={category.id}
                      label={category.label}
                      selected={category.selected}
                      backgroundColor={category.backgroundColor}
                      iconName={category.iconName}
                      onclick={()=>this.handleCategoryClick(category.id)}
                    />
                  ))}
                </div>
							</Typography>
						</Paper>
					</Grid>
					<Button
						onClick={this.handleSaveQuote}
						variant="contained"
						size="large"
						color="primary"
						className={classes.saveButton}
					>
						Send Quote!
					</Button>
				</Grid>
			</Layout>
		);
	}
}

AddQuote.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

}
const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(AddQuote));
