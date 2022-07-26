export function setLogged(logged) {
  return {
    type: '@user/SET_LOGGED',
    payload: { logged }
  };
}
export function setToken(token) {
  return {
    type: '@user/SET_TOKEN',
    payload: { token }
  };
}

export function loginRequest(email, password, notification_token) {
  return {
    type: '@user/LOGIN_REQUEST',
    payload: { email, password, notification_token }
  };
}

export function loginSuccess(user, token) {
  return {
    type: '@user/LOGIN_SUCCESS',
    payload: { user, token }
  };
}

export function loginFailure() {
  return {
    type: '@user/LOGIN_FAILURE'
  };
}


export function setUser(user) {
  return {
    type: '@user/SET_USER',
    payload: { user }
  };
}

export function logout() {
  return { type: '@user/LOGOUT' };
}
