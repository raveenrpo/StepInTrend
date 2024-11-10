import { configureStore } from "@reduxjs/toolkit";
import shopereducer from "../Slices/Shopeslice";
import authreducer from "../Slices/Authlice";
import cartreducer from "../Slices/Cartslice";
const store = configureStore({
  reducer: {
    shop: shopereducer,
    auth: authreducer,
    cart: cartreducer,
  },
});

export default store;
