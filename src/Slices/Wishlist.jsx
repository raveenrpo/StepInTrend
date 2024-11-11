import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosinstance_cart from "../Axios instance/axiosinstance_cart";
import { act } from "react";

export const getwishlist = createAsyncThunk("wishlist/get", async () => {
  const response =
    await axiosinstance_cart.get(`https://localhost:7082/api/Wishlist
`);
  return response.data;
});

export const addtowishlist = createAsyncThunk(
  "wish/add",
  async (prid, { dispatch }) => {
    const response =
      await axiosinstance_cart.post(`https://localhost:7082/api/Wishlist/Addwishlist/${prid}
`);
    dispatch(getwishlist());
    return response.data;
  }
);

export const removefromwishlist = createAsyncThunk(
  "wish/remove",
  async (prid, { dispatch }) => {
    const response =
      await axiosinstance_cart.delete(`https://localhost:7082/api/Wishlist/removewishlist/${prid}
`);
    dispatch(getwishlist());
    return response.data;
  }
);

const Wishlist = createSlice({
  name: "wish",
  initialState: {
    Wishlist: [],
    wish_msg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getwishlist.fulfilled, (state, action) => {
      state.Wishlist = action.payload;
    });
    builder.addCase(getwishlist.rejected, (state, action) => {
      wish_msg = action.error;
    });

    builder.addCase(addtowishlist.fulfilled, (state, action) => {
      state.wish_msg = action.payload;
      console.log(action.payload);
    });
    builder.addCase(addtowishlist.rejected, (state, action) => {
      state.wish_msg = action.error;
      console.log(action.payload);
    });

    builder.addCase(removefromwishlist.fulfilled, (state, action) => {
      state.wish_msg = action.payload;
      console.log(action.payload);
    });
    builder.addCase(removefromwishlist.rejected, (state, action) => {
      state.Wishlist = action.error;
      console.log(action.payload);
    });
  },
});
export const selectwishlist = (state) => state.wish.Wishlist;

export default Wishlist.reducer;
