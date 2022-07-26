import produce from 'immer';
const INITIAL_STATE = {
  loading: false,
  token: '',
  data: {},
  notification_token: '',
  logged: false
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `@user/SET_TOKEN`:
      return produce(state, draft => {
        draft.token = action.payload.token;
      });
    case '@user/SET_LOGGED':
      return produce(state, draft => {
        draft.logged = action.payload.logged;
      });
    case '@user/LOGOUT':
      return produce(state, draft => {
        draft.token = '';
        draft.data = {};
        draft.notification_token = '';
        draft.logged = false;
      });
    case '@user/LOGIN_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@user/LOGIN_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.data = action.payload.user;
        draft.loading = false;
        draft.logged = true;
      });
    case '@user/SET_USER':
      return produce(state, draft => {
        draft.data = action.payload.user;
        draft.loading = false;
        draft.logged = true;
      });
    case '@user/LOGIN_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
