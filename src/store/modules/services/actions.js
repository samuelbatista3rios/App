export function serviceListRequest() {
  return { type: '@service/LIST_REQUEST' };
}

export function serviceListSuccess(data) {
  return {
    type: '@service/LIST_SUCCESS',
    payload: { data }
  };
}

export function subServiceListRequest() {
  return { type: '@service/SUB_LIST_REQUEST' };
}

export function subServiceListSuccess(data) {
  return {
    type: '@service/SUB_LIST_SUCCESS',
    payload: { data }
  };
}