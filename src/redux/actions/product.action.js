import {
  GET_PRODUCT_HOME,
  GET_PRODUCTS,
  GET_TOTAL_PRODUCTS,
  CREATE_PRODUCTS,
  UPDATE_PRODUCTS,
  DELETE_PRODUCTS
} from '../constants';

export function getProductHome(params) {
  return {
    type: GET_PRODUCT_HOME,
    payload: params
  };
}

export function getProducts(params) {
  return {
    type: GET_PRODUCTS,
    payload: params
  };
}

export function getTotalProducts(params) {
  return {
    type: GET_TOTAL_PRODUCTS,
    payload: params
  };
}
export function createProduct(params) {
  return {
    type: CREATE_PRODUCTS,
    payload: params
  };
}

export function updateProduct(params) {
  console.log('file: product.action.js > line 38 > updateProduct > params', params);
  return {
    type: UPDATE_PRODUCTS,
    payload: params
  };
}

export function deleteProduct(params) {
  return {
    type: DELETE_PRODUCTS,
    payload: params
  };
}
