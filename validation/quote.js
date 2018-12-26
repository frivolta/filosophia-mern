const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateQuoteInput(data) {
  let errors = {}
  //Check if fields are empty
  data.text = !_.isEmpty(data.text) ? data.text : '';
  //Check quote text field lenght
  if (!Validator.isLength(data.text, {
      min: 6,
      max: 150
    })) {
    errors.title = 'Quote must be between 6 and 150 characters'
  }


  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}