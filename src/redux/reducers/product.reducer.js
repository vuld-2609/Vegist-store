import {
  GET_PRODUCT_HOME_FAIL,
  GET_PRODUCT_HOME_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_TOTAL_PRODUCTS_SUCCESS,
  GET_TOTAL_PRODUCTS_FAIL,
  CREATE_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAIL
} from '../constants';

const initialState = {
  productHome: {},
  productsData: [],
  totalProduct: [],
  addProduct: {},
  updateProduct: {},
  deleteProduct: {}
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_HOME_SUCCESS:
      return {
        ...state,
        productHome: { ...action.payload }
      };
    case GET_PRODUCT_HOME_FAIL: {
      return state;
    }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsData: [...action.payload]
      };
    case GET_PRODUCTS_FAIL: {
      return state;
    }
    case GET_TOTAL_PRODUCTS_SUCCESS:
      return {
        ...state,
        totalProduct: [...action.payload]
      };
    case GET_TOTAL_PRODUCTS_FAIL: {
      return state;
    }
    case CREATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        addProduct: { ...action.payload }
      };
    case CREATE_PRODUCTS_FAIL: {
      return state;
    }
    case UPDATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        updateProduct: { ...action.payload }
      };
    case UPDATE_PRODUCTS_FAIL: {
      return state;
    }
    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        deleteProduct: { ...action.payload }
      };
    case DELETE_PRODUCTS_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
