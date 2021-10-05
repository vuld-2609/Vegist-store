import { ADD_CART_FAIL, ADD_CART_SUCCESS, GET_CART_FAIL, GET_CART_SUCCESS } from '../constants';

const initialState = {
  addCartData: {},
  cartData: {}
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART_SUCCESS:
      return {
        ...state,
        addCartData: { ...action.payload }
      };
    case ADD_CART_FAIL: {
      return state;
    }
    case GET_CART_SUCCESS:
      return {
        ...state,
        cartData: { ...action.payload }
      };
    case GET_CART_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
