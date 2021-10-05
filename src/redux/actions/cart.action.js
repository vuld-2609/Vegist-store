import { ADD_CART, GET_CART } from '../constants';

export function addCart(params) {
  return {
    type: ADD_CART,
    payload: params
  };
}

export function getCartData(params) {
  return {
    type: GET_CART,
    payload: params
  };
}
