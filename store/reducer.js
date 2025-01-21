const initalState = {
  
  openCart: false,
  showCart: false,
  totalQuantity: 0,
  showCheckoutModal: false,
  showMobileModal: false,
};

export const reducer = (state = initalState, action) => {
  if (action.type === "openCart") {
    return {
      ...state,
      openCart: !state.openCart,
    };
  }
  if (action.type === "showCart") {
    return {
      ...state,
      showCart: !state.showCart,
    };
  }
  if (action.type === "showTotalQuantity") {
    return {
      ...state,
      totalQuantity: action.quantity,
    };
  }
  if (action.type === "showCheckoutModal") {
    return {
      ...state,
      showCheckoutModal: !state.showCheckoutModal,
    };
  }
  if (action.type === "showMobileModal") {
    return {
      ...state,
      showMobileModal: !state.showMobileModal,
    };
  }
  return state;
};
