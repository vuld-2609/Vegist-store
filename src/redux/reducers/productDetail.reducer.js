import {
  GET_COMMENT_FAIL,
  GET_COMMENT_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  GET_COUNT_COMMENT,
  GET_COUNT_COMMENT_FAIL,
  GET_COUNT_COMMENT_SUCCESS
} from '../constants';

const initialState = {
  productDetail: {},
  listComment: [],
  comments: [],
  countComment: ''
};

export default function productDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: { ...action.payload }
      };
    case GET_PRODUCT_DETAIL_FAIL: {
      return state;
    }
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        listComment: [action.payload]
      };
    case CREATE_COMMENT_FAIL:
      return state;
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...action.payload]
      };
    case GET_COMMENT_FAIL:
      return state;
    case GET_COUNT_COMMENT_SUCCESS:
      return {
        ...state,
        countComment: action.payload
      };
    case GET_COUNT_COMMENT_FAIL:
      return state;
    default:
      return state;
  }
}
