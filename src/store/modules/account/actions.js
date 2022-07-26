export function petsRequest() {
  return { type: '@account/PETS_REQUEST' };
}

export function requestPetsSucesss(pets) {
  return {
    type: '@account/PETS_SUCCESS',
    payload: { pets }
  };
}

export function requestAddressesSucesss(addresses) {
  return {
    type: '@account/ADDRESSES_SUCCESS',
    payload: { addresses }
  };
}

export function addressesRequest() {
  return { type: '@account/ADDRESSES_REQUEST' };
}

export function requestSpecialtiesSucesss(specialties) {
  return {
    type: '@account/SPECIALTIES_SUCCESS',
    payload: { specialties }
  };
}



export function specialtiesRequest() {
  return { type: '@account/SPECIALTIES_REQUEST' };
}