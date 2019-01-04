import axios from 'axios';
import {
  GET_ERRORS,
  GET_ALL_QUOTES,
  QUOTES_LOADING,
} from './../type';

//Get all quotes
export const getAllQuotes = ()=> dispatch =>{
  dispatch(setIsLoading());
  axios
    .get('api/quotes')
    .then(result => dispatch(setCurrentQuotes(result.data)))
    .catch(err=>dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


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

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/quotes/like/${id}`)
    .then(res => dispatch(getAllQuotes()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/quotes/unlike/${id}`)
    .then(res => dispatch(getAllQuotes()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Delete Quote
export const deleteQuote = id => dispatch => {
  axios
    .get(`api/quotes/${id}`)
    .then (res => dispatch(getAllQuotes()))
    .catch (err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
// Set quotes
export const setCurrentQuotes = (quotes) => {
  return {
    type: GET_ALL_QUOTES,
    payload: quotes
  }
}
export const setIsLoading = () => {
  return{
    type: QUOTES_LOADING
  }
}