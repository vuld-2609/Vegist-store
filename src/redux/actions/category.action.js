import { GET_CATEGORY, GET_SIDEBAR } from '../constants';

export function getCategory(params) {
  return {
    type: GET_CATEGORY,
    payload: params
  };
}

export function getSidebar(params) {
  return {
    type: GET_SIDEBAR,
    payload: params
  };
}
