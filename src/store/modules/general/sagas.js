import { all, put, takeLatest } from "redux-saga/effects";
import getError from "../../../services/errors";
import { navigate } from "../../../services/navigation";

import * as UserActions from "../user/actions";
import * as GeneralActions from "./actions";

export function* getErrorAndResolve(action) {
  const { error } = action.payload;
  let code = error.response?.data?.code || "0";
  switch (code) {
    case "10044":
      return yield put(UserActions.logout());
    case "10045":
      return yield put(UserActions.logout());
    case "20005":
      return yield put(UserActions.logout());
    default:
      const errorMessage = getError("PT_BR", code);
      yield put(GeneralActions.setError(errorMessage));
      break;
  }
}

export default all([
  takeLatest("@general/CHECK_ERROR_AND_RESOLVE", getErrorAndResolve)
]);
