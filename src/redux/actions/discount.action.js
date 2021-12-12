import { GET_DISCOUNT, DELETE_DISCOUNT, CREATE_DISCOUNT, GET_DISCOUNT_DETAIL } from '../constants';

export function getDiscount(params) {
  return {
    type: GET_DISCOUNT,
    payload: params,
  };
}

export function createDiscount(params) {
  return {
    type: CREATE_DISCOUNT,
    payload: params,
  };
}

export function getDetailDiscount(params) {
  return {
    type: GET_DISCOUNT_DETAIL,
    payload: params,
  };
}

export function deleteDiscount(params) {
  return {
    type: DELETE_DISCOUNT,
    payload: params,
  };
}
