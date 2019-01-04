import {
  GET_ALL_QUOTES,
  QUOTES_LOADING,
} from '../type';
import _ from 'lodash';

const initialState = {
  quotes: [],
  isLoading: false
}

export default function (state=initialState, action){
  switch (action.type){
    case QUOTES_LOADING:
    return {
      ...state,
     isLoading: true
    }
    case GET_ALL_QUOTES:
    return {
      ...state,
      quotes: action.payload,
      isLoading: false
    }
    default:
      return state;
  }
}