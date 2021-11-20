import {
  CREATE_BILL_FAIL,
  CREATE_BILL_SUCCESS,
  GET_BILL,
  GET_BILL_FAIL,
  GET_BILL_SUCCESS,
  UPDATE_BILL_FAIL,
  UPDATE_BILL_SUCCESS,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAIL,
  DELETE_PAYMENTS_SUCCESS,
  DELETE_PAYMENTS_FAIL,
  UPDATE_PAYMENTS_SUCCESS,
  UPDATE_PAYMENTS_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
} from '../constants';

const initialState = {
  billInitData: {},
  billUpdateData: {},
  billData: [],
  paymentsData: {},
  deleteData: {},
  updateData: {},
  orderDetail: {},
};

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BILL_SUCCESS:
      return {
        ...state,
        billInitData: { ...action.payload },
      };
    case CREATE_BILL_FAIL: {
      return state;
    }
    case UPDATE_BILL_SUCCESS:
      return {
        ...state,
        billUpdateData: { ...action.payload },
      };
    case UPDATE_BILL_FAIL: {
      return state;
    }
    case GET_BILL_SUCCESS:
      return {
        ...state,
        billData: [ ...action.payload ],
      };
    case GET_BILL_FAIL: {
      return state;
    }
    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        paymentsData: { ...action.payload },
      };
    case GET_PAYMENTS_FAIL: {
      return state;
    }
    case DELETE_PAYMENTS_SUCCESS:
      return {
        ...state,
        deleteData: { ...action.payload },
      };
    case DELETE_PAYMENTS_FAIL: {
      return state;
    }
    case UPDATE_PAYMENTS_SUCCESS:
      return {
        ...state,
        updateData: { ...action.payload },
      };
    case UPDATE_PAYMENTS_FAIL: {
      return state;
    }
    case GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: { ...action.payload },
      };
    case GET_ORDER_DETAIL_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
