import { put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { all } from 'redux-saga/effects';
import axiosClient from '../config/axiosClient';
import {
  CREATE_PRODUCTS,
  CREATE_PRODUCTS_FAIL,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_HOME,
  GET_PRODUCT_HOME_FAIL,
  GET_PRODUCT_HOME_SUCCESS,
  GET_TOTAL_PRODUCTS,
  GET_TOTAL_PRODUCTS_FAIL,
  GET_TOTAL_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_SUCCESS,
} from '../constants';

const apiURL = process.env.REACT_APP_API_URL;

function* getProductHomeSaga() {
  try {
    const [responseNew, responseSale, responseSpecial] = yield all([
      axios({
        method: 'GET',
        url: `${apiURL}/products?new=true`,
      }),
      axios({
        method: 'GET',
        url: `${apiURL}/products?oldPrice_gte=1`,
      }),
      axios({
        method: 'GET',
        url: `${apiURL}/products?rate_gte=4`,
      }),
    ]);

    const data = {
      new: responseNew.data,
      sale: responseSale.data,
      special: responseSpecial.data,
    };

    yield put({
      type: GET_PRODUCT_HOME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCT_HOME_FAIL,
      payload: error,
    });
  }
}

function* getProductSaga(action) {
  try {
    const { page, limit, category, price, tag, sort, searchKey, sortId } = action.payload;
    const response = yield axiosClient({
      method: 'GET',
      url: `/user/products`,
      params: {
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
        ...(category && { categoryId: category }),
        ...(price && { newPrice_gte: price[0], newPrice_lte: price[1] }),
        ...(tag && { tagId: tag }),
        ...(sort === 'bestSelling' && { oldPrice_gte: 0 }),
        ...(sort === 'priceLowToHigh' && { _sort: 'newPrice', _order: 'asc' }),
        ...(sort === 'priceHighToLow' && { _sort: 'newPrice', _order: 'desc' }),
        ...(sort === 'date' && { news: true }),
        ...(searchKey && { q: searchKey }),
        ...(sortId && { _sort: 'id', _order: 'desc' }),
      },
    });
    const data = response.data.products;
    yield put({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCTS_FAIL,
      payload: error,
    });
  }
}

function* getTotalProductSaga(action) {
  try {
    const { category, price, tag, sort, searchKey } = action.payload;

    const response = yield axiosClient({
      method: 'GET',
      url: `/user/products`,
      params: {
        ...(category && { categoryId: category }),
        ...(price && { newPrice_gte: price[0], newPrice_lte: price[1] }),
        ...(tag && { tagId: tag }),
        ...(sort === 'bestSelling' && { oldPrice_gte: 0 }),
        ...(sort === 'priceLowToHigh' && { _sort: 'newPrice', _order: 'asc' }),
        ...(sort === 'priceHighToLow' && { _sort: 'newPrice', _order: 'desc' }),
        ...(sort === 'date' && { news: true }),
        ...(searchKey && { q: searchKey }),
      },
    });
    const data = response.data.products;
    yield put({
      type: GET_TOTAL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_TOTAL_PRODUCTS_FAIL,
      payload: error,
    });
  }
}

function* createProductSaga(action) {
  try {
    const response = yield axios.post(`${apiURL}/products`, {
      ...action.payload,
    });
    const data = response.data;
    yield put({
      type: CREATE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_PRODUCTS_FAIL,
      payload: error,
    });
  }
}
function* updateProductSaga(action) {
  try {
    const { id, ...other } = action.payload;

    const response = yield axios.patch(`${apiURL}/products/${id}`, { ...other });
    const data = response.data;
    yield put({
      type: UPDATE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_PRODUCTS_FAIL,
      payload: error,
    });
  }
}
function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;

    const response = yield axios.delete(`${apiURL}/products/${id}`);

    const data = response.data;
    yield put({
      type: DELETE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_PRODUCTS_FAIL,
      payload: error,
    });
  }
}
export default function* productSaga() {
  yield takeEvery(GET_PRODUCT_HOME, getProductHomeSaga);
  yield takeEvery(GET_PRODUCTS, getProductSaga);
  yield takeEvery(GET_TOTAL_PRODUCTS, getTotalProductSaga);
  yield takeEvery(CREATE_PRODUCTS, createProductSaga);
  yield takeEvery(UPDATE_PRODUCTS, updateProductSaga);
  yield takeEvery(DELETE_PRODUCTS, deleteProductSaga);
}
