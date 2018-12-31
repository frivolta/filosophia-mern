import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({name, type, required, value, onchange,label,err}) => {
  return (
		<div className="group">
			<input name={name} type={type} required={required} value={value} onChange={onchange} />
			<span className="highlight" />
			<span className="bar" />
			<label>{label}</label>
			{err ? <p className="error">{err}</p> : null}
		</div>
	);
};

FormGroup.defaultProps = {
  type: 'text'
}

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  err: PropTypes.string,
  type: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
}

export default FormGroup;
