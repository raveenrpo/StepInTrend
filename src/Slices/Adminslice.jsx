import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance_cart from "../Axios instance/axiosinstance_cart";
import { fetchproducts } from "./Shopeslice";
import axios from "axios";
import { act } from "react";

export const getallusers = createAsyncThunk("admin/getallusers", async () => {
  const response =
    await axiosinstance_cart.get(`https://localhost:7082/api/User/GetAllUser
`);
  return response.data;
});

export const getuserbyyid = createAsyncThunk(
  "admin/getuserbyid",
  async (usid) => {
    const response =
      await axiosinstance_cart.get(`https://localhost:7082/api/User/GetUserByID?id=
${usid}`);
    return response.data;
  }
);

export const addproduct = createAsyncThunk(
  "admin/addproduct",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      console.log(params);
      console.log(params.title);
      const response = await axiosinstance_cart.post(
        "https://localhost:7082/api/Product",
        params,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the header for multipart form data
          },
        }
      );

      dispatch(fetchproducts());

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateproduct = createAsyncThunk(
  "admin/updateproduct",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    console.log("product id" + id);
    console.log(data);
    try {
      const response = await axiosinstance_cart.put(
        `https://localhost:7082/api/Product/${id}`,
        data
      );
      dispatch(fetchproducts());
      return response.data;
    } catch {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteproduct = createAsyncThunk(
  "admin/deleteproduct",
  async (prid, { dispatch }) => {
    const response =
      await axiosinstance_cart.delete(`https://localhost:7082/api/Product?id=
${prid}`);
    dispatch(fetchproducts());
    return response.data;
  }
);

export const blockuser = createAsyncThunk(
  "admin/block",
  async (usid, { dispatch }) => {
    const response =
      await axiosinstance_cart.put(`https://localhost:7082/api/User/Block?id=${usid}
`);
    dispatch(getallusers);
    return response.data;
  }
);

export const unblockuser = createAsyncThunk(
  "admin/unblock",
  async (usid, { dispatch }) => {
    const response =
      await axiosinstance_cart.put(`https://localhost:7082/api/User/UnBlock?id=${usid}
`);
    dispatch(getallusers());
    return response.data;
  }
);

export const getorders = createAsyncThunk("admin/getorder", async () => {
  const response = await axiosinstance_cart.get(
    "https://localhost:7082/api/Order/get_all_order"
  );
  return response.data;
});

export const getorderbyid = createAsyncThunk(
  "admin/getorderbyid",
  async (usid) => {
    const response = await axiosinstance_cart.get(
      `https://localhost:7082/api/Order/orderbyid/${usid}`
    );
    return response.data;
  }
);

export const getrevenue = createAsyncThunk("admin/getrevenu", async () => {
  const response = await axiosinstance_cart.get(
    "https://localhost:7082/api/Order/total"
  );
  return response.data;
});

export const getpurchasedprd = createAsyncThunk("admin/purchase", async () => {
  const response = await axiosinstance_cart.get(
    "https://localhost:7082/api/Order/purchased_product"
  );
  return response.data;
});

const Adminslice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    orders: [],
    order: [],
    revenue: null,
    purchase: null,
    loading: false,
    msg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getallusers.fulfilled, (state, action) => {
      state.users = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getallusers.rejected, (state, action) => {
      state.msg = action.error;
      console.log(action.payload);
    });

    builder.addCase(updateproduct.fulfilled, (state, action) => {
      state.msg = action.payload;
      console.log(action.payload);
    });
    builder.addCase(updateproduct.rejected, (state, action) => {
      state.msg = action.payload;
      console.log(action.payload);
    });

    builder.addCase(addproduct.fulfilled, (state, acion) => {
      state.msg = acion.payload;
      console.log(action.payload);
    });
    builder.addCase(addproduct.rejected, (state, action) => {
      state.msg = action.payload;
      console.log(action.payload);
    });

    builder.addCase(deleteproduct.fulfilled, (state, action) => {
      state.msg = action.payload;
      console.log(action.payload);
    });
    builder.addCase(deleteproduct.rejected, (state, action) => {
      state.msg = action.payload;
    });

    builder.addCase(getorders.fulfilled, (state, action) => {
      state.orders = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getorders.rejected, (state, action) => {
      state.msg = action.error;
      console.log(action.payload);
    });

    builder.addCase(getrevenue.fulfilled, (state, action) => {
      state.revenue = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getrevenue.rejected, (state, action) => {
      state.msg = action.error;
      console.log(action.payload);
    });

    builder.addCase(getpurchasedprd.fulfilled, (state, action) => {
      state.purchase = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getpurchasedprd.rejected, (state, action) => {
      state.msg = action.error;
      console.log(action.payload);
    });

    builder.addCase(getorderbyid.fulfilled, (state, action) => {
      state.order = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getorderbyid.rejected, (state, action) => {
      state.msg = action.error;
      console.log(action.payload);
    });
  },
});

export const selectuser = (state) => state.admin.users;
export default Adminslice.reducer;
