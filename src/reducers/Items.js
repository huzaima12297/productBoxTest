import {
    GET_ITEM_START,
    GET_ITEM_SUCCESS,
    GET_ITEM_FAILURE,
  } from '../constants/ActionTypes';
  import initialStateItems from './ItemsInitialState';
  
  export default function itemsReducers(state = initialStateItems().items, action) {

    let list;
    switch (action.type) {
      case GET_ITEM_START:
        list = [];
    
        return {
          ...state,
          list,
          loading: true
        };
      case GET_ITEM_SUCCESS:
        return {
          ...state,
          list : action.payload.res.data,
          loading: false
        };
      case GET_ITEM_FAILURE:
        list = [];
        return {
          ...state,
          list,
          loading: false
        };
      default:
        return state;
    }
  }
  