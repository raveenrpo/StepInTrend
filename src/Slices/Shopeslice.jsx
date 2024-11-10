import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Product_url = "https://localhost:7082/api/Product";

const Product_url_id = "https://localhost:7082/api/Product";

export const fetchproducts = createAsyncThunk(
  "shop/fetchproducts",
  async () => {
    const response = await axios.get(Product_url);
    return response.data;
  }
);

export const fetchproductbyid = createAsyncThunk(
  "shop/fetchproductbyid",
  async (id) => {
    const response = await axios.get(
      `https://localhost:7082/api/Product/byid/${id}`
    );
    return response.data;
  }
);

export const fetchproductbycategory = createAsyncThunk(
  "shop/fetchcategory",
  async (name) => {
    const response = await axios.get(
      `https://localhost:7082/api/Product/GetProductByCategory?name=${name}`
    );
    return response.data;
  }
);

export const searchproduct = createAsyncThunk(
  "shop/searchproduct",
  async (searche) => {
    const response = await axios.get(
      `https://localhost:7082/api/Product/SearchProduct?name=${searche}`
    );
    return response.data;
  }
);

const Shopeslice = createSlice({
  name: "shop",
  initialState: {
    products: [],
    product: [],
    product_by_category: [],
    searchproducts: [],
    currency: "$",
    deliveryFee: 10,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchproducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchproducts.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(fetchproductbyid.fulfilled, (state, action) => {
      state.product = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchproductbyid.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(fetchproductbycategory.fulfilled, (state, action) => {
      state.product_by_category = action.payload;
    });
    builder.addCase(fetchproductbycategory.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(searchproduct.fulfilled, (state, action) => {
      state.searchproducts = action.payload;
    });
    builder.addCase(searchproduct.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const selectproducts = (state) => state.shop.products;
export const selectproductbyid = (state) => state.shop.product;
export const selectproductbycategory = (state) =>
  state.shop.product_by_category;
export const searchproducts = (state) => state.shop.searchproducts;

export default Shopeslice.reducer;
