import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import apiCustomer from '../../../services/apiCustomer';
import { clientsRequestSuccess } from './actions';
import { setLoading, setError } from '../general/actions';
import Error from '../../../services/errors';
export function* getClientList() {
  yield put(setLoading(true));
  const user = yield select(state => state.user);
  try {
    apiCustomer.defaults.headers.Authorization = `Bearer ${user.token}`;
    const response = yield call(apiCustomer.post, '/client/myclients', {
      per_page: 100,
      page: 1
    });
    yield put(clientsRequestSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.code) {
      yield put(setError(Error('PT_BR')[error.response.data.code]));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export default all([takeLatest('@client/CLIENTS_REQUEST', getClientList)]);
