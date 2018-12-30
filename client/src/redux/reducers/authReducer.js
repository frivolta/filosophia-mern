import {
  SET_CURRENT_USER
} from '../type';
import _ from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: 
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
}