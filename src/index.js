import React from 'react';
import './config/yellowbox';
import { StatusBar } from 'react-native';
import App from './app';
import storaData from './store';
import Loading from './components/General/LoadingWallet';
import Error from './components/General/Error';
import Message from './components/General/Message';
import { Provider } from 'react-redux';
const Index = () => {
  return (
    <Provider store={storaData}>
      <StatusBar barStyle="dark-content" />
      <App />
      <Loading />
      <Error />
      <Message />
    </Provider>
  );
};

export default Index;
