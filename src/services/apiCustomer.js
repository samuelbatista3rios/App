import axios from 'axios';
import Store from '../store';
import Error from '../services/errors';
import { AsyncStorage } from 'react-native';
import { setError } from '../store/modules/general/actions';
import { logout } from '../store/modules/user/actions';

const apiCustomer = axios.create({
  baseURL: 'https://customer-dev.petsvita.services/v1'
});

apiCustomer.interceptors.request.use(async config => {
  // const { user } = Store.getState(state => state);
  const token = await AsyncStorage.getItem('token');
  if (!!token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log(`\n config request :${JSON.stringify(config)} \n`);
  return config;
});

apiCustomer.interceptors.response.use(
  function(response) {
    
    return response;
  },
  function(error) {
    let code = '000000000000';
    if (error.response && error.response.data && error.response.data.code) {
      code = error.response.data.code;
      console.log(`\n error :${JSON.stringify(error.response.data)} \n`);
      if (code === '10045' || code === '20005' || code === '10044') {
        Store.dispatch(logout());
      }
      Store.dispatch(setError(Error('PT_BR', code))); 
    }

    return Promise.reject(error);
  }
);

//criado em separado para não mostras mensagens de erro padrão
apiCustomer.checkToken = axios.create({
  baseURL: 'https://customer-dev.petsvita.services/v1/client/user'
});
apiCustomer.checkToken.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (!!token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiCustomer;
