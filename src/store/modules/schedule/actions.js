export function setAddressSelected(addresses,address) {
  addresses.forEach(element => {
      element.selected = false
      if(element.id == address.id)
      {
        element.selected = true;
      } 
  });
  return {
    type: '@schedule/SELECT_ADDRESS',
    payload: { addresses,address }
  };
}


export function setPetSelected(pet) {
  return {
    type: '@schedule/SELECT_PET',
    payload: {pet}
  };
}


