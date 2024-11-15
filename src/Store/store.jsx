import { configureStore } from "@reduxjs/toolkit";
import shopereducer from "../Slices/Shopeslice";
import authreducer from "../Slices/Authlice";
import cartreducer from "../Slices/Cartslice";
import wishreducer from "../Slices/Wishlist";
import adminreducer from "../Slices/Adminslice";
import orderreducer from "../Slices/Orderslice";
const store = configureStore({
  reducer: {
    shop: shopereducer,
    auth: authreducer,
    cart: cartreducer,
    wish: wishreducer,
    admin: adminreducer,
    order: orderreducer,
  },
});

export default store;
