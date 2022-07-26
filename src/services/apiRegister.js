import axios from 'axios';
import Store from '../store';
import Error from './errors';
import { AsyncStorage } from 'react-native';
import { logout } from '../store/modules/user/actions';
import { setError } from '../store/modules/general/actions';

const register = axios.create({
  baseURL: 'https://register-dev.petsvita.services/v1'
});

register.interceptors.request.use(async config => {
  // const { user } = Store.getState(state => state);
  const token = await AsyncStorage.getItem('token');
  if (!!token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

register.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    let code = '000000000000';
    if (error.response && error.response.data && error.response.data.code) {
      code = error.response.data.code;
      if (
        code === '10045' ||
        code === '20005' ||
        code === '10007' ||
        code === '10044'
      ) {
        Store.dispatch(logout());
      }
      Store.dispatch(setError(Error('PT_BR', code)));
    }
    return Promise.reject(error);
  }
);

export default register;
