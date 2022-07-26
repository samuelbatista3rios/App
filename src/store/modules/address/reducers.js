import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  page: 1,
  per_page: 100,
  pages: 0,
  selected: null,
  default: null,
};

export default function clients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@address/LIST_SUCCESS':
      return produce(state, draft => {
        const { data, page, pages } = action.payload;
        data.forEach(item => {
          item.selected = false;
          if (item.default) {
            draft.selected = item
            item.selected = true;
          }
        })
        draft.data = data;
        draft.page = page;
        draft.pages = pages;
      });
    case '@address/CREATE_SUCCESS':
      return produce(state, draft => {
        draft.selected = action.payload.address
      });
    case '@address/DEFAULT_SUCCESS':
      return produce(state, draft => {
        draft.default = action.payload.address;
      });
    default:
      return state;
  }
}