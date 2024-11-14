import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance_cart from "../Axios instance/axiosinstance_cart";
import axios from "axios";
import { act } from "react";

const token = localStorage.getItem("token");

export const razorordercreation = createAsyncThunk(
  "order/ordercreation",
  async (price, { rejectWithValue }) => {
    try {
      console.log("Sending price:", price);
      const response = await axios.post(
        `https://localhost:7082/api/Order/ordercreation?price=${Math.floor(
          price
        )}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error response:", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// export const paymentvalidation = createAsyncThunk(
//   "order/payment",
//   async (params) => {
//     const response = await axiosinstance_cart.post(
//       "https://localhost:7082/api/Order/paymentvalidation",
//       params
//     );
//     return response.data;
//   }
// );

export const paymentvalidation = createAsyncThunk(
  "order/payment",
  async (params) => {
    const response = await axios.post(
      `https://localhost:7082/api/Order/paymentvalidation`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// export const createorder = createAsyncThunk(
//   "order/createorder",
//   async (params) => {
//     const response = await axiosinstance_cart.post(
//       `https://localhost:7082/api/Order/placeorder
// `,
//       params
//     );
//     return response.data;
//   }
// )

export const createorder = createAsyncThunk(
  "order/createorder",
  async (params) => {
    const response = await axios.post(
      `https://localhost:7082/api/Order/placeorder`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const Orderslice = createSlice({
  name: "order",
  initialState: {
    orderid: null,
    ret_msg: null,
    payment: null,
    placeorder: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(razorordercreation.fulfilled, (state, action) => {
      state.orderid = action.payload;
      console.log(action.payload);
    });
    builder.addCase(razorordercreation.rejected, (state, action) => {
      state.ret_msg = action.error;
    });

    builder.addCase(paymentvalidation.fulfilled, (state, action) => {
      state.payment = action.payload;
      console.log(action.payload);
    });
    builder.addCase(paymentvalidation.rejected, (state, action) => {
      state.ret_msg = action.error;
    });

    builder.addCase(createorder.fulfilled, (state, action) => {
      state.placeorder = action.payload;
      console.log(action.payload);
    });
    builder.addCase(createorder.rejected, (state, action) => {
      state.ret_msg = action.error;
    });
  },
});

export const selectrazorid = (state) => state.order.orderid;
export default Orderslice.reducer;
