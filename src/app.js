import React, { useEffect } from 'react';
import Routes from './routes';
import { AsyncStorage, BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import { setNavigator } from './services/navigation';
import * as UserActions from './store/modules/user/actions';
import numeral from 'numeral';
let locales = require('numeral/locales');
numeral.locale('pt-br');

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(UserActions.setToken(token));
        return () => dispatch(UserActions.logout());
      }
    };
    getToken();
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, []);
  return (
    <Routes
      ref={el => {
        setNavigator(el);
      }}
    />
  );
}
