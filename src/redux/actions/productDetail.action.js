import { GET_PRODUCT_DETAIL, CREATE_COMMENT, GET_COMMENT, GET_COUNT_COMMENT } from '../constants';

export function getProductDetail(params) {
  return {
    type: GET_PRODUCT_DETAIL,
    payload: params
  };
}
export function createComment(params) {
  return {
    type: CREATE_COMMENT,
    payload: params
  };
}
export function getComment(params) {
  return {
    type: GET_COMMENT,
    payload: params
  };
}
export function getCountComment(params) {
  return {
    type: GET_COUNT_COMMENT,
    payload: params
  };
}
