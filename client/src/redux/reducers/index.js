import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import errorReducer from '../reducers/errorReducer';
import quoteReducer from '../reducers/quoteReducer';

export default combineReducers({
  auth: authReducer,
  quotes: quoteReducer,
  errors: errorReducer
});