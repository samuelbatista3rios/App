import produce from 'immer';

const INITIAL_STATE = {
  pets: [],
  consults: [],
  address: null,
  addresses: [],
  specialties: [],
};

export default function account(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@account/PETS_SUCCESS':
      return produce(state, draft => {
        draft.pets = action.payload.pets;
      });
    case '@account/SPECIALTIES_SUCCESS':
      return produce(state, draft => {
        draft.specialties = action.payload.specialties;
      });
    default:
      return state;
  }
}