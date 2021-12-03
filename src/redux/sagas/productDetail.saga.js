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
} from '../constants';

const apiURL = process.env.REACT_APP_API_URL;

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
        data:data
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
    const response = yield axios.post(`${apiURL}/listComment`, action.payload);

    // if (response.status === 'failed' && response.error) throw new Error(response.error);

    const data = response.data;

    yield put({
      type: CREATE_COMMENT_SUCCESS,
      payload: {
        data: data
      },
    });
    toastSuccess(response.message);

  } catch (error) {
    yield put({
      type: CREATE_COMMENT_FAIL,
    });
    toastError(error);
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
      },
    });

    // if (response.status === 'failed' && response.error) throw new Error(response.error);

    const data = response.data;

    yield put({
      type: GET_COMMENT_SUCCESS,
      payload: {
        data:data,
        total:response.total
      },
    });
  } catch (error) {
    yield put({
      type: GET_COMMENT_FAIL,
    });
    toastError(error);
  }
}

export default function* productDetailSaga() {
  yield takeEvery(GET_PRODUCT_DETAIL, getProductDetailSaga);
  yield takeEvery(CREATE_COMMENT, createCommentSaga);
  yield takeEvery(GET_COMMENT, getCommentSaga);
}
