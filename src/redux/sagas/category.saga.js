import { put, takeEvery } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';
import axiosClient from '../config/axiosClient';

import {
  GET_CATEGORY,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  GET_SIDEBAR,
  GET_SIDEBAR_FAIL,
  GET_SIDEBAR_SUCCESS,
} from '../constants';

function* getCategorySaga() {
  try {
    const { data, status, error } = yield axiosClient({
      method: 'GET',
      url: `/user/Category`,
    });

    if (status === 'failed' && error) throw new Error(error.message);

    yield put({
      type: GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_CATEGORY_FAIL,
      payload: error,
    });
  }
}

function* getSidebarSaga() {
  try {
    const [responseCategory, responseTags] = yield all([
      axiosClient({
        method: 'GET',
        url: `/user/Category`,
      }),
      axiosClient({
        method: 'GET',
        url: `/user/tags`,
      }),
    ]);

    if (
      (responseCategory.status === 'failed' && responseCategory.error) ||
      (responseTags.status === 'failed' && responseTags.error)
    )
      throw new Error(responseTags.error);

    const data = {
      categoryData: responseCategory.data.categories,
      tagsData: responseTags.data.tags,
    };

    yield put({
      type: GET_SIDEBAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_SIDEBAR_FAIL,
      payload: error,
    });
  }
}
export default function* categorySaga() {
  yield takeEvery(GET_CATEGORY, getCategorySaga);
  yield takeEvery(GET_SIDEBAR, getSidebarSaga);
}
