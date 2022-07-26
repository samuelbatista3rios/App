import '../config/reactotron';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares = [sagaMiddleware];

const composer = __DEV__
  ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
  : applyMiddleware(...middlewares);

const store = createStore(rootReducer, composer);
sagaMiddleware.run(rootSaga);

export default store;
