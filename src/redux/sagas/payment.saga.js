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
export default function* paymentSaga() {
  yield takeEvery(CREATE_BILL, createBill);
  yield takeEvery(UPDATE_BILL, updateBillSaga);
  yield takeEvery(GET_BILL, getBillSaga);
}
