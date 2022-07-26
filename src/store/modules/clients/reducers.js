import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  page: 1,
  per_page: 100,
  pages: 0
};

export default function clients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@client/CLIENTS_REQUEST_SUCCESS':
      return produce(state, draft => {
        const { data, page, pages } = action.payload.data;
        draft.data = data;
        draft.page = page;
        draft.pages = pages;
      });
    default:
      return state;
  }
}
