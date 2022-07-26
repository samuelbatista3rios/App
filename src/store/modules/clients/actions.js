export function clientsRequest() {
  return { type: '@card/CLIENTS_REQUEST' };
}

export function clientsRequestSuccess(data) {
  return {
    type: '@card/CLIENTS_REQUEST_SUCCESS',
    payload: { data }
  };
}
