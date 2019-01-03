import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import './QuoteCategoryItem.scss'

const QuoteCategoryItem = ({selected, iconName,label, backgroundColor, onclick}) => {

	return (
		<div className="category-item" style={{ marginTop: '16px' }} onClick={onclick}>
			<Avatar
        className={selected ? 'category-item-avatar selected' : 'category-item-avatar'}
				style={{ backgroundColor, textAlign: 'center', margin: '0 auto' }}
			>
				{iconName}
			</Avatar>
			<Typography variant="overline" gutterBottom>
				{label}
			</Typography>
		</div>
	);
};

QuoteCategoryItem.defaultProps = {
  backgroundColor: '#F80759',
  selected: false
}

QuoteCategoryItem.propTypes = {
  iconName: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string,
  selected: PropTypes.bool,
}


export default QuoteCategoryItem;