export function addressListRequest() {
  return { type: '@address/LIST_REQUEST' };
}

export function addressListSuccess(data) {
  return {
    type: '@address/LIST_SUCCESS',
    payload: { data }
  };
}

export function addressCreateRequest(address) {
  return { 
    type: '@address/CREATE_REQUEST',
    payload: { address }
   };
}

export function addressCreateSuccess(address) {
  return {
    type: '@address/CREATE_SUCCESS',
    payload: { address }
  };
}



export function requestDefaultAddressSucesss(address) {
  return {
    type: '@address/DEFAULT_SUCCESS',
    payload: { address }
  };
}

export function defaultAddressRequest() {
  return { type: '@address/DEFAULT_REQUEST' };
}