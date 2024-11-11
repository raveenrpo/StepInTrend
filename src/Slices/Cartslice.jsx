import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosinstance_cart from "../Axios instance/axiosinstance_cart";
import { act } from "react";
// const token = localStorage.getItem("token");
// console.log(token);
// export const fetchcart = createAsyncThunk("cart/fetchcart", async () => {
//   const response = await axios.get(`https://localhost:7082/api/Cart`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// });
export const fetchcart = createAsyncThunk("cart/fetchcart", async () => {
  const response = await axiosinstance_cart.get(
    `https://localhost:7082/api/Cart`
  );
  return response.data;
});

export const addtocart = createAsyncThunk(
  "cart/addtocart",
  async (prid, { dispatch }) => {
    const response = await axiosinstance_cart.post(
      `https://localhost:7082/api/Cart/Add_to_cart/${prid}`
    );
    dispatch(fetchcart());
    return response.data;
  }
);

export const remove_prd_fromcart = createAsyncThunk(
  "cart/removecart",
  async (prid, { dispatch }) => {
    const response = await axiosinstance_cart.delete(
      `https://localhost:7082/api/Cart/Remove_from_cart/${prid}`,
      { productId: prid }
    );
    dispatch(fetchcart());
    return response.data;
  }
);

export const quantity_increment = createAsyncThunk(
  "cart/increase_quantity",
  async (prid, { dispatch }) => {
    const response = await axiosinstance_cart.put(
      `https://localhost:7082/api/Cart/Incriment/${prid}`
    );
    dispatch(fetchcart());
    return response.data;
  }
);

export const quantity_decrement = createAsyncThunk(
  "cart/decrease_quantity",
  async (prid, { dispatch }) => {
    const response = await axiosinstance_cart.put(
      `https://localhost:7082/api/Cart/Decriment/${prid}`
    );
    dispatch(fetchcart());
    return response.data;
  }
);

const Cartslice = createSlice({
  name: "cart",
  initialState: {
    cartitems: [],
    cart_return: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchcart.fulfilled, (state, action) => {
      state.cartitems = action.payload;
    });
    builder.addCase(fetchcart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = true;
    });

    builder.addCase(addtocart.fulfilled, (state, action) => {
      // state.cartitems.push(action.payload);
      state.cart_return = action.payload;
    });
    builder.addCase(addtocart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = true;
    });
    builder.addCase(remove_prd_fromcart.fulfilled, (state, action) => {
      state.cart_return = action.payload;
      console.log(action.payload);
    });
    builder.addCase(remove_prd_fromcart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = true;
    });

    builder.addCase(quantity_increment.fulfilled, (state, action) => {
      state.cart_return = action.payload;
      console.log(action.payload);
    });
    builder.addCase(quantity_increment.rejected, (state, action) => {
      state.error = action.error;
      state.loading = true;
    });

    builder.addCase(quantity_decrement.fulfilled, (state, action) => {
      state.cart_return = action.payload;
      console.log(action.payload);
    });
    builder.addCase(quantity_decrement.rejected, (state, action) => {
      state.error = action.error;
      state.loading = true;
    });
  },
});
export const selectcart = (state) => state.cart.cartitems;
export default Cartslice.reducer;
