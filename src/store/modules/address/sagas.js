import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import apiCustomer from '../../../services/apiCustomer';
import { addressListSuccess, addressCreateSuccess, requestDefaultAddressSucesss, addressListRequest } from './actions';

import * as GeneralActions from "../general/actions";
import { navigate } from "../../../services/navigation";


export function* getAddresses() {
  try {

    const response = yield call(apiCustomer.post, '/client/addresses',
      {
        per_page: 100,
        page: 1,
        query: {
        }
      });
    const { data } = response.data;
    yield put(addressListSuccess(data));
  } catch (error) {
    yield put(GeneralActions.setError(error));

  } finally {
  }
}

export function* createAddress(action) {
  const { address } = action.payload;
  yield put(GeneralActions.setLoading(true));
  try {
    const response = yield call(apiCustomer.post, '/client/address', address);
    const { data } = response.data;
    yield put(addressCreateSuccess(data));
    setTimeout(() => {
      addressListRequest()
      navigate("SCHEDULE_SELECT");
    }, 400);
  } catch (error) {
    yield put(GeneralActions.setError(error));

  } finally {
    yield put(GeneralActions.setLoading(false));
  }
}

export function* getDefaultAddress() {
  try {
    const response = yield call(apiCustomer.get, '/client/address');
    const { data } = response;
    yield put(requestDefaultAddressSucesss(data));
  } catch (error) {

  } finally {
  }
}

export default all([
  takeLatest('@address/LIST_REQUEST', getAddresses),
  takeLatest('@address/CREATE_REQUEST', createAddress),
  takeLatest('@address/DEFAULT_REQUEST', getDefaultAddress),
]);
