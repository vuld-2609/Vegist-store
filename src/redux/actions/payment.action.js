import { CREATE_BILL, GET_BILL, UPDATE_BILL } from '../constants';

export function createBill(params) {
  return {
    type: CREATE_BILL,
    payload: params
  };
}
export function getBill(params) {
  return {
    type: GET_BILL,
    payload: params
  };
}
export function updateBill(params) {
  return {
    type: UPDATE_BILL,
    payload: params
  };
}
