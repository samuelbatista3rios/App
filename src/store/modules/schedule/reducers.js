import produce from 'immer';

const INITIAL_STATE = {
   addressSelected:null,
   addresses:[],
   specialties:[],
   specialtySelected:null,
   petSelected:{}
};

export default function schedule(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@schedule/SELECT_ADDRESS':
      return produce(state, draft => {
        draft.addresses = action.payload.addresses
        draft.addressSelected = action.payload.address
      }); 
    case '@schedule/SELECT_PET':
      return produce(state, draft => {
        draft.petSelected = action.payload.pet
      }); 
    default:
      return state;
  }
}