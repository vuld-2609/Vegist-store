import {
  CREATE_BILL,
  GET_BILL,
  UPDATE_BILL,
  GET_PAYMENTS,
  DELETE_PAYMENTS,
  UPDATE_PAYMENTS,
  GET_ORDER_DETAIL,
} from '../constants';

export function createBill(params) {
  return {
    type: CREATE_BILL,
    payload: params,
  };
}
export function getBill(params) {
  return {
    type: GET_BILL,
    payload: params,
  };
}
export function updateBill(params) {
  return {
    type: UPDATE_BILL,
    payload: params,
  };
}

export function getPayments(params) {
  return {
    type: GET_PAYMENTS,
    payload: params,
  };
}

export function deletePayments(params) {
  return {
    type: DELETE_PAYMENTS,
    payload: params,
  };
}

export function updatePayments(params) {
  return {
    type: UPDATE_PAYMENTS,
    payload: params,
  };
}

export function getOrderDetail(params) {
  return {
    type: GET_ORDER_DETAIL,
    payload: params,
  };
}
