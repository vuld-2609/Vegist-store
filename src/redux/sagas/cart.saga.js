import { put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';

import {
  ADD_CART,
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  GET_CART,
  GET_CART_FAIL,
  GET_CART_SUCCESS
} from '../constants';

const apiURL = process.env.REACT_APP_API_URL;

function* addCartSaga(action) {
  try {
    const { user, cartData } = action.payload;
    let response;
    const responseCheckUser = yield axios.get(`${apiURL}/carts?user=${user}`);
    if (responseCheckUser.data.length) {
      response = yield axios.patch(`${apiURL}/carts/${responseCheckUser.data[0].id}`, {
        cartData
      });
    } else {
      response = yield axios.post(`${apiURL}/carts`, action.payload);
    }
    const data = response.data;
    yield put({
      type: ADD_CART_SUCCESS,
      payload: data
    });
    localStorage.setItem('CartData', JSON.stringify(data.cartData));
  } catch (error) {
    yield put({
      type: ADD_CART_FAIL,
      payload: error
    });
  }
}

function* getCartDataSaga(action) {
  try {
    const { user } = action.payload;
    const response = yield axios({
      method: 'GET',
      url: `${apiURL}/carts?user=${user}`
    });
    const data = response.data;
    const dataCart = data[0]?.cartData || [];
    yield put({
      type: GET_CART_SUCCESS,
      payload: data[0]
    });
    localStorage.setItem('CartData', JSON.stringify(dataCart));
  } catch (error) {
    yield put({
      type: GET_CART_FAIL,
      payload: error
    });
  }
}

export default function* cartSaga() {
  yield takeEvery(ADD_CART, addCartSaga);
  yield takeEvery(GET_CART, getCartDataSaga);
}
