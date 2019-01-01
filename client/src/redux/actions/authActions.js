import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../helpers/setAuthToken';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
} from './../type';




// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(result => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(result => {
      const { token } = result.data;
      //Set token to local storage
      localStorage.setItem('jwtToken', token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err=>{
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
// Set user log out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove authHeader for future request
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}
