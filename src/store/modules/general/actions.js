export function setLoading(loading) {
  return { type: "@general/SET_LOADING", payload: { loading } };
}
export function setError(error) {
  return { type: "@general/SET_ERROR", payload: { error } };
}
export function setMessage(message) {
  return { type: "@general/SET_MESSAGE", payload: { message } };
}
export function checkErrorAndResolve(error) {
  return { type: "@general/CHECK_ERROR_AND_RESOLVE", payload: { error } };
}
