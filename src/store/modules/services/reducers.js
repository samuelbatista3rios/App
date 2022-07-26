import produce from 'immer';

const INITIAL_STATE = {
  service: {
    data: [],
    page: 1,
    per_page: 100,
    pages: 0,
  },
  subservice: {
    data: [],
    page: 1,
    per_page: 100,
    pages: 0,
  }
};

export default function clients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@service/LIST_SUCCESS':
      return produce(state, draft => {
        draft.service = action.payload;
      });
    case '@service/SUB_LIST_REQUEST':
      return produce(state, draft => {
        draft.subservice = action.payload;
      });
    default:
      return state;
  }
}