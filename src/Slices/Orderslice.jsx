import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance_cart from "../Axios instance/axiosinstance_cart";

export const razorordercreation = createAsyncThunk(
  "order/ordercreation",
  async (price, { rejectWithValue }) => {
    try {
      const response = await axiosinstance_cart.post(
        "https://localhost:7082/api/Order/ordercreation",
        { price }
      );
      return response.data;
    } catch {
      return rejectWithValue(error.response.data);
    }
  }
);

export const paymentvalidation = createAsyncThunk(
  "order/payment",
  async (params) => {
    const response = await axiosinstance_cart.post(
      "https://localhost:7082/api/Order/paymentvalidation",
      params
    );
    return response.data;
  }
);

export const createorder = createAsyncThunk(
  "order/createorder",
  async (params) => {
    const response = await axiosinstance_cart.post(
      `https://localhost:7082/api/Order/placeorder
`,
      params
    );
    return response.data;
  }
);

const Orderslice = createSlice({
  name: "order",
  initialState: {
    orderid: null,
    ret_msg: null,
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

    builder.addCase(paymentvalidation.fulfilled, (state, action) => {});
    builder.addCase(paymentvalidation.rejected, (state, action) => {
      state.ret_msg = action.error;
    });

    builder.addCase(createorder.fulfilled, (state, action) => {});
    builder.addCase(createorder.rejected, (state, action) => {
      state.ret_msg = action.error;
    });
  },
});

export const selectrazorid = (state) => state.order.orderid;
export default Orderslice.reducer;
