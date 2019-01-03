import axios from 'axios';
import {
  GET_ERRORS,
} from './../type';

//Post Quote
export const postQuote = (quoteData, history) => dispatch => {
  axios
    .post('api/quotes', quoteData)
    .then(result => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};