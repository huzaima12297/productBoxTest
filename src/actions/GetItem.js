
import * as types from "../constants/ActionTypes";

const getItemStart = () => {
  return {
    type: types.GET_ITEM_START,
  };
};

const getItemSuccess = (res) => {
  return {
    type: types.GET_ITEM_SUCCESS,
    res
  };
};

const getItemFailure = (err) => {
  return {
    type: types.GET_ITEM_FAILURE,
    err
  };
};


export function getItemsRes() {
    return async dispatch => {
        try {
            dispatch(getItemStart());
            const res = await fetch(`http://localhost:3000/items`);
            console.log("items", res)
            if (res.status >= 400) {
                dispatch(getItemFailure(node));
            }

            const json = await res.json();

            dispatch(getItemSuccess(node, json));
        } catch (err) {
            console.log("itemsError", err)
            dispatch(getItemFailure(err));
        }
    };
}

export function getItems() {
    return dispatch => {
        dispatch(getItemsRes());
    };
}