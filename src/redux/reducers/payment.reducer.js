import {
  CREATE_BILL_FAIL,
  CREATE_BILL_SUCCESS,
  GET_BILL_FAIL,
  GET_BILL_SUCCESS,
  UPDATE_BILL_FAIL,
  UPDATE_BILL_SUCCESS
} from '../constants';

const initialState = {
  billInitData: {},
  billUpdateData: {},
  billData: {}
};

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BILL_SUCCESS:
      return {
        ...state,
        billInitData: { ...action.payload }
      };
    case CREATE_BILL_FAIL: {
      return state;
    }
    case UPDATE_BILL_SUCCESS:
      return {
        ...state,
        billUpdateData: { ...action.payload }
      };
    case UPDATE_BILL_FAIL: {
      return state;
    }
    case GET_BILL_SUCCESS:
      return {
        ...state,
        billData: { ...action.payload }
      };
    case GET_BILL_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
