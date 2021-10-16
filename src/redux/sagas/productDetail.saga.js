import { put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { all } from 'redux-saga/effects';

import {
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  CREATE_COMMENT,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  GET_COUNT_COMMENT_FAIL,
  GET_COUNT_COMMENT_SUCCESS,
} from '../constants';

const apiURL = process.env.REACT_APP_API_URL;

function* getProductDetailSaga(action) {
  const productId = action.payload;
  try {
    const [response, responseNew] = yield all([
      axios({
        method: 'GET',
        url: `${apiURL}/products?id=${productId}`,
      }),
      axios({
        method: 'GET',
        url: `${apiURL}/products?news=true`,
      }),
    ]);
    const data = {
      product: response.data[0],
      relatedProduct: responseNew.data,
    };
    yield put({
      type: GET_PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCT_DETAIL_FAIL,
      payload: error,
    });
  }
}
function* createCommentSaga(action) {
  try {
    const response = yield axios.post(`${apiURL}/listComment`, action.payload);
    const data = response.data;
    yield put({
      type: CREATE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_COMMENT_FAIL,
    });
  }
}
function* getCommentSaga(action) {
  const { id, page, limit } = action.payload;
  try {
    const response = yield axios({
      method: 'GET',
      url: `${apiURL}/listComment`,
      params: {
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
        ...(id && { idProduct: id }),
        ...{ _sort: 'id', _order: 'desc' },
      },
    });
    const data = response.data;
    const responseData = yield axios.get(`${apiURL}/listComment?idProduct=${id}`);
    const dataRes = responseData.data.length;
    yield put({
      type: GET_COMMENT_SUCCESS,
      payload: data,
    });
    yield put({
      type: GET_COUNT_COMMENT_SUCCESS,
      payload: dataRes,
    });
  } catch (error) {
    yield put({
      type: GET_COMMENT_FAIL,
    });
    yield put({
      type: GET_COUNT_COMMENT_FAIL,
    });
  }
}

export default function* productDetailSaga() {
  yield takeEvery(GET_PRODUCT_DETAIL, getProductDetailSaga);
  yield takeEvery(CREATE_COMMENT, createCommentSaga);
  yield takeEvery(GET_COMMENT, getCommentSaga);
}
