import { all, takeLatest } from 'redux-saga/effects';

import user from './user/sagas';
import clients from './clients/sagas';
import account from './account/sagas';
import schedule from './schedule/sagas';
import address from './address/sagas';
import services from "./services/sagas";
import general from "./general/sagas";

export default function* rootSaga() {
  return yield all([
    user,
    clients,
    account,
    schedule,
    address,
    services,
    general
  ]);
}
