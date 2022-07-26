import produce from 'immer';
const INITIAL_STATE = {
  loading: false,
  message: '',
  error: ''
};

export default function general(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@general/SET_LOADING':
      return produce(state, draft => {
        draft.loading = action.payload.loading;
      });
    case '@general/SET_MESSAGE':
      return produce(state, draft => {
        draft.message = action.payload.message;
      });
    case '@general/SET_ERROR':
      return produce(state, draft => {
        draft.error = action.payload.error;
      });
    default:
      return state;
  }
}
