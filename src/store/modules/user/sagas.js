import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import apiCustomer from '../../../services/apiCustomer';
import errors from '../../../services/errors';
import { navigate } from '../../../services/navigation';
import { Alert } from 'react-native';
import apiRegister from '../../../services/apiRegister';

import {
  loginSuccess,
  loginFailure,
  setToken,
  getBalanceSucesss,
  resumeRequestSucesss,
  setLogged
} from './actions';

export function* login({ payload }) {
  const { email, password, notification_token } = payload;
  try {
    const response = yield call(apiCustomer.post, '/auth/signin', {
      username: email,
      password,
      notification_token: notification_token ? notification_token : ''
    });

    const { user, token, type } = response.data;
    yield put(loginSuccess(user, token));
    yield call(AsyncStorage.setItem, 'token', token);
    let typeRedirect = (type == 'client'?'OWNER':'VET');
    if (user.step_register === 4) {
      switch(type) {
        case "client":
          return navigate('DASHBOARD_OWNER');
      }   
    } else {
      switch (user.step_register) {
        case 0:
          navigate(`REGISTER_${typeRedirect}_INFO`);
          break;
        case 1:
          navigate(`REGISTER_${typeRedirect}_ADDRESS`);
          break;
        case 2:
          navigate(`REGISTER_${typeRedirect}_DOCUMENTS`);
          break;
        case 3:
          navigate('CONFIRMREGISTER');
          break;
        default:
          break;
      }
    }
  } catch (error) {
 
    // yield put(loginFailure());
    if (error.response && error.response.data.code) {
      const { code } = error.response.data;
      if (code === '10009') {
        return navigate('CONFIRMREGISTER', {
          username: values.username
        });
      }
      if (code === '10010') {
        return navigate('REGISTERPENDING');
      }

      yield put(loginFailure());
    }
  }
}

export function* logout() {
  yield call(AsyncStorage.removeItem, 'token');
  navigate('LOGIN');
}
export function* setTokenIntoLocalStorage(action) {
  yield call(AsyncStorage.setItem, 'token', action.payload.token);
}

export default all([
  takeLatest('@user/SET_TOKEN', setTokenIntoLocalStorage),
  takeLatest('@user/LOGIN_REQUEST', login),
  takeLatest('@user/LOGOUT', logout)
]);
