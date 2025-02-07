import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  openCart: false,
  showCart: false,
  totalQuantity: 0,
  showCheckoutModal: false,
  showMobileModal: false,
  loginTrigger: false,
};

const allSlice = createSlice({
  name: "all",
  initialState: initalState,
  reducers: {
    openCart: (state) => {
      state.openCart = !state.openCart;
    },
    showCart: (state) => {
      state.showCart = !state.showCart;
    },
    triggerToken: (state) => {
      state.loginTrigger = !state.loginTrigger;
    },
    showTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
    showCheckoutModal: (state) => {
      state.showCheckoutModal = !state.showCheckoutModal;
    },
    showMobileModal: (state) => {
      state.showMobileModal = !state.showMobileModal;
    },
  },
});

export const {
  openCart,
  showCart,
  showTotalQuantity,
  showCheckoutModal,
  showMobileModal,
  triggerToken,
} = allSlice.actions;

export default allSlice.reducer;
