import { put, takeEvery } from '@redux-saga/core/effects';
import axiosClient from '../config/axiosClient';
import { toastSuccess, toastError } from '../../until/toast';

import {
  GET_DISCOUNT,
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAIL,
  CREATE_DISCOUNT,
  CREATE_DISCOUNT_FAIL,
  CREATE_DISCOUNT_SUCCESS,
  GET_DISCOUNT_DETAIL,
  GET_DISCOUNT_DETAIL_FAIL,
  GET_DISCOUNT_DETAIL_SUCCESS,
  DELETE_DISCOUNT,
  DELETE_DISCOUNT_FAIL,
  DELETE_DISCOUNT_SUCCESS,
} from '../constants';

const data = {
  discount: [
    {
      id: 1,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 2,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 3,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 4,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 5,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 6,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 7,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 8,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 9,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 10,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 11,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 12,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 13,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 14,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 15,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 16,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 17,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
    {
      id: 18,
      name: 'Mã giảm giá tháng 12',
      code: 'DISCOUNT12',
      percent: '20',
      startDate: '2021-12-07T08:22:36.108Z',
      endDate: '2021-12-18T08:22:36.108Z',
      quantity: 20,
    },
  ],
  total: 18,
};

function* getDiscountSaga() {
  try {
    // const { status, error, data } = axiosClient.get('/admin/discount');

    // if (status === 'failed' && error) {
    //   throw new Error(error.message);
    // }
    yield put({
      type: GET_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_DISCOUNT_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* getDiscountDetailSaga(action) {
  try {
    const { id } = action.payload;
    const { status, error, data } = axiosClient.get(`/admin/discount/${id}`);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }
    yield put({
      type: GET_DISCOUNT_DETAIL_SUCCESS,
      payload: {
        data: data,
      },
    });
    toastSuccess(data.message);
  } catch (error) {
    yield put({
      type: GET_DISCOUNT_DETAIL_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* createDiscountSaga(action) {
  try {
    // const { status, error, data } = axiosClient.post(`/admin/discount`, { ...action.payload });

    // if (status === 'failed' && error) {
    //   throw new Error(error.message);
    // }
    yield put({
      type: CREATE_DISCOUNT_SUCCESS,
      payload: action.payload,
    });
    toastSuccess(data.message);
  } catch (error) {
    yield put({
      type: CREATE_DISCOUNT_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* deleteDiscountSaga(action) {
  try {
    const { id } = action.payload;
    // const { status, error, data } = axiosClient.delete(`/admin/discount/${id}`);

    // if (status === 'failed' && error) {
    //   throw new Error(error.message);
    // }
    yield put({
      type: DELETE_DISCOUNT_SUCCESS,
      payload: id,
    });
    toastSuccess(data.message);
  } catch (error) {
    yield put({
      type: DELETE_DISCOUNT_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

export default function* discountSaga() {
  yield takeEvery(GET_DISCOUNT, getDiscountSaga);
  yield takeEvery(CREATE_DISCOUNT, createDiscountSaga);
  yield takeEvery(GET_DISCOUNT_DETAIL, getDiscountDetailSaga);
  yield takeEvery(DELETE_DISCOUNT, deleteDiscountSaga);
}
