import { combineReducers } from 'redux';

import user from './user/reducers';
import general from './general/reducers';
import clients from './clients/reducers';
import account from './account/reducers';
import schedule from './schedule/reducers';
import services from './services/reducers';
import address from './address/reducers';

const reducers = combineReducers({
  user,
  general,
  clients,
  account,
  schedule,
  address,
  services
});

export default reducers;
