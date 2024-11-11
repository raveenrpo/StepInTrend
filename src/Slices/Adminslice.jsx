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
  async (params, { dispatch }) => {
    const response = await axiosinstance_cart.post(
      `https://localhost:7082/api/Product
`,
      params
    );
    dispatch(fetchproducts());
    return response.data;
  }
);

export const updateproduct = createAsyncThunk(
  "admin/updateproduct",
  async (params, { dispatch }) => {
    const response = await axiosinstance_cart.put(
      `https://localhost:7082/api/Product?id=${params.id}
`,
      params
    );
    dispatch(fetchproducts());
    return response.data;
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

export const blockuser = createAsyncThunk("admin/block", async (usid) => {
  const response =
    await axiosinstance_cart.put(`https://localhost:7082/api/User/Block?id=${usid}
`);
  return response.data;
});

export const unblockuser = createAsyncThunk("admin/unblock", async (usid) => {
  const response =
    await axiosinstance_cart.put(`https://localhost:7082/api/User/UnBlock?id=${usid}
`);
  return response.data;
});

const Adminslice = createSlice({
  name: "admin",
  initialState: {
    users: [],
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
  },
});

export const selectuser = (state) => state.admin.users;
export default Adminslice.reducer;
