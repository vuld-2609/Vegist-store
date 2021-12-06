import { put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import axiosClient from '../config/axiosClient';
import { all } from 'redux-saga/effects';
import { toastSuccess, toastError } from '../../until/toast';

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
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  GET_COMMENT_ADMIN,
  GET_COMMENT_ADMIN_SUCCESS,
  GET_COMMENT_ADMIN_FAIL,
} from '../constants';

function* getProductDetailSaga(action) {
  const productId = action.payload;

  try {
    const [response, responseNew] = yield all([
      axiosClient({
        method: 'GET',
        url: `user/products/${productId}`,
      }),
      axiosClient({
        method: 'GET',
        url: `user/products?isNew=true`,
      }),
    ]);

    if (
      (response.status === 'failed' && response.error) ||
      (responseNew.status === 'failed' && responseNew.error)
    )
      throw new Error(response.error);

    const data = {
      product: response.data.product,
      relatedProduct: responseNew.data.products,
    };

    yield put({
      type: GET_PRODUCT_DETAIL_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCT_DETAIL_FAIL,
      payload: error,
    });
    toastError(error);
  }
}

function* createCommentSaga(action) {
  try {
    const { productId } = action.payload;
    const response = yield axiosClient.post(`user/review/${productId}`, action.payload);

    if (response.status === 'failed' && response.error) throw new Error(response.error);

    const data = response.data;

    yield put({
      type: CREATE_COMMENT_SUCCESS,
      payload: {
        data: data,
      },
    });

    toastSuccess(data.message);
  } catch (error) {
    yield put({
      type: CREATE_COMMENT_FAIL,
    });
    toastError(error);
  }
}

function* getCommentSaga(action) {
  const { productId, page, limit } = action.payload;

  try {
    const response = yield axiosClient({
      method: 'GET',
      url: `user/review/${productId}`,
      params: {
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
      },
    });

    if (response.status === 'failed' && response.error) throw new Error(response.error);

    const data = response.data;

    yield put({
      type: GET_COMMENT_SUCCESS,
      payload: {
        data: data.reviews,
        total: data.total,
      },
    });
  } catch (error) {
    yield put({
      type: GET_COMMENT_FAIL,
    });
    toastError(error.message);
  }
}

function* getCommentAdminSaga(action) {
  const { search, page, limit } = action.payload;

  try {
    const response = yield axiosClient({
      method: 'GET',
      url: `/admin/review`,
      params: {
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
        ...(search && { q: search }),
      },
    });

    if (response.status === 'failed' && response.error) throw new Error(response.error);

    const data = response.data;

    yield put({
      type: GET_COMMENT_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_COMMENT_ADMIN_FAIL,
    });
  }
}

function* deleteCommentSaga(action) {
  const { id } = action.payload;
  try {
    const response = yield axiosClient.delete(`/admin/review/${id}`);

    if (response.status === 'failed' && response.error) throw new Error(response.error);

    const data = response.data;

    yield put({
      type: DELETE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_COMMENT_FAIL,
      payload: error,
    });
  }
}

export default function* productDetailSaga() {
  yield takeEvery(GET_PRODUCT_DETAIL, getProductDetailSaga);
  yield takeEvery(CREATE_COMMENT, createCommentSaga);
  yield takeEvery(GET_COMMENT, getCommentSaga);
  yield takeEvery(DELETE_COMMENT, deleteCommentSaga);
  yield takeEvery(GET_COMMENT_ADMIN, getCommentAdminSaga);
}
