import { all, takeLatest, put, call, select } from "redux-saga/effects";
import apiRegister from "../../../services/apiRegister";
import { serviceListSuccess, subServiceListSuccess } from "./actions";

import * as GeneralActions from "../general/actions";
import { navigate } from "../../../services/navigation";

export function* getServices() {
  try {
    const response = yield call(apiRegister.post, "/client/services", {
      per_page: 100,
      page: 1,
      query: {},
    });
    const { data } = response.data;
    yield put(serviceListSuccess(data));
  } catch (error) {
    yield put(GeneralActions.setError(error));
  } finally {
  }
}

export function* getSubServices() {
  try {
    const response = yield call(apiRegister.post, "/client/subservices", {
      per_page: 100,
      page: 1,
      query: {},
    });

    console.tron.log(response);
    const { data } = response.data;
    yield put(subServiceListSuccess(data));
  } catch (error) {
    yield put(GeneralActions.setError(error));
  } finally {
  }
}

export default all([
  takeLatest("@service/LIST_REQUEST", getServices),
  takeLatest("@service/SUB_LIST_REQUEST", getSubServices),
]);
