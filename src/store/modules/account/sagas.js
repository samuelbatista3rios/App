import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import apiCustomer from '../../../services/apiCustomer';

import {
  requestPetsSucesss,
  requestSpecialtiesSucesss
} from './actions';

export function* getPets() {
  try {
    const response = yield call(apiCustomer.post, '/client/pets',
      {
        per_page: 100,
        page: 1,
        query: {
        }
      });
    const { data } = response.data;
    yield put(requestPetsSucesss(data));
  } catch (error) {

  } finally {
  }
}


export function* getSpecialties() {
  try {
    const response = yield call(apiCustomer.post, '/client/specialties',
      {
        per_page: 100,
        page: 1,
        query: {
        }
      });
    const { data } = response.data;
    yield put(requestSpecialtiesSucesss(data));
  } catch (error) {
  } finally {
  }
}
export default all([
  takeLatest('@account/PETS_REQUEST', getPets),
  takeLatest('@account/SPECIALTIES_REQUEST', getSpecialties),
]);
