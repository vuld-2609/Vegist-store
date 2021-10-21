import { put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { all } from 'redux-saga/effects';
import history from '../../until/history';

import {
  CREATE_BILL,
  CREATE_BILL_FAIL,
  CREATE_BILL_SUCCESS,
  GET_BILL,
  GET_BILL_FAIL,
  GET_BILL_SUCCESS,
  UPDATE_BILL,
  UPDATE_BILL_FAIL,
  UPDATE_BILL_SUCCESS,
  GET_PAYMENTS,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAIL,
  DELETE_PAYMENTS,
  DELETE_PAYMENTS_SUCCESS,
  DELETE_PAYMENTS_FAIL,
  UPDATE_PAYMENTS,
  UPDATE_PAYMENTS_SUCCESS,
  UPDATE_PAYMENTS_FAIL,
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
} from '../constants';

const apiURL = process.env.REACT_APP_API_URL;

function* createBill(action) {
  try {
    const { user, ...other } = action.payload;
    let response;
    const responseCheckUser = yield axios.get(`${apiURL}/payments?user=${user}&isPayment=false`);
    if (responseCheckUser.data.length) {
      response = yield axios.patch(`${apiURL}/payments/${responseCheckUser.data[0].id}`, {
        ...other,
      });
    } else {
      response = yield axios.post(`${apiURL}/payments`, {
        ...action.payload,
        isPayment: false,
      });
    }
    const data = response.data;
    yield put({
      type: CREATE_BILL_SUCCESS,
      payload: data,
    });
    history.push('/shipping');
  } catch (error) {
    yield put({
      type: CREATE_BILL_FAIL,
      payload: error,
    });
  }
}

function* updateBillSaga(action) {
  try {
    const { id, type, user, cartId, ...other } = action.payload;
    let response;
    if (type === 'success') {
      [response] = yield all([
        axios.patch(`${apiURL}/payments/${id}`, { ...other }),
        axios.delete(`${apiURL}/carts/${cartId}`),
      ]);
    } else {
      response = axios.patch(`${apiURL}/payments/${id}`, {
        ...other,
      });
    }

    const data = response.data;
    yield put({
      type: UPDATE_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_BILL_FAIL,
      payload: error,
    });
  }
}
function* getBillSaga(action) {
  try {
    const { user, isPayment, id } = action.payload;

    const response = yield axios({
      method: 'GET',
      url: `${apiURL}/payments`,
      params: {
        ...(user && { user }),
        ...(id && { id }),
        ...(!isNaN(isPayment) && { isPayment }),
      },
    });
    const data = response.data;
    yield put({
      type: GET_BILL_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    yield put({
      type: GET_BILL_FAIL,
      payload: error,
    });
  }
}

function* getPayments(action) {
  try {
    const { page, limit, search, status } = action.payload;
    const [responseData, responseTotal] = yield all([
      axios({
        method: 'GET',
        url: `${apiURL}/payments`,
        params: {
          ...(page && { _page: page }),
          ...(limit && { _limit: limit }),
          ...(search && { q: search }),
          // ...(status && { status: status }),
          ...(status && status !== 'all' ? { status: status } : { status: null }),
        },
      }),
      axios({
        method: 'GET',
        url: `${apiURL}/payments`,
        params: {
          ...(search && { q: search }),
          // ...(status && { status: status }),
          ...(status && status !== 'all' ? { status: status } : { status: null }),
        },
      }),
    ]);
    const data = {
      payments: responseData.data,
      total: responseTotal.data.length,
    };

    yield put({
      type: GET_PAYMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_PAYMENTS_FAIL,
      payload: error,
    });
  }
}

function* deletePayments(action) {
  try {
    const { id } = action.payload;
    const response = yield axios.delete(`${apiURL}/payments/${id}`);
    const data = response.data;

    yield put({
      type: DELETE_PAYMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_PAYMENTS_FAIL,
      payload: error,
    });
  }
}

function* updatePayments(action) {
  try {
    const { id, status } = action.payload;
    const response = yield axios.patch(`${apiURL}/payments/${id}`, {
      status,
    });
    const data = response.data;

    yield put({
      type: UPDATE_PAYMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_PAYMENTS_FAIL,
      payload: error,
    });
  }
}

function* getOrderDetail(action) {
  try {
    const { id } = action.payload;
    const response = yield axios.get(`${apiURL}/payments/${id}`);

    const data = response.data;

    yield put({
      type: GET_ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_ORDER_DETAIL_FAIL,
      payload: error,
    });
  }
}

export default function* paymentSaga() {
  yield takeEvery(CREATE_BILL, createBill);
  yield takeEvery(UPDATE_BILL, updateBillSaga);
  yield takeEvery(GET_BILL, getBillSaga);
  yield takeEvery(GET_PAYMENTS, getPayments);
  yield takeEvery(DELETE_PAYMENTS, deletePayments);
  yield takeEvery(UPDATE_PAYMENTS, updatePayments);
  yield takeEvery(GET_ORDER_DETAIL, getOrderDetail);
}
