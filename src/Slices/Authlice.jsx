import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://localhost:7082/api/User/Register`,
        param // Pass the form data as the body of the request
      );
      return response.data; // On success, return the response data (e.g., success message)
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors (e.g., user already exists)
    }
  }
);

// Login Async Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://localhost:7082/api/User/Login`,
        param // Pass the login credentials as the body of the request
      );
      return response.data; // On success, return the response data (e.g., token)
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors (e.g., invalid credentials)
    }
  }
);

// Initial state
const initialState = {
  isRegistered: false,
  registrationMessage: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Logout action to clear token and authentication state
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.status = "loading"; // Indicate that the registration is loading
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "succeeded"; // Registration succeeded
      state.isRegistered = true; // Mark as registered
      state.registrationMessage = action.payload;
      console.log(action.payload); // Store success message
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed"; // Registration failed
      state.isRegistered = false; // Mark as not registered
      state.registrationMessage =
        action.payload?.message || action.error.message; // Store error message
    });

    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.token = action.payload;
      state.isAuthenticated = true;
      console.log(action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.token = null;
      state.isAuthenticated = false;
      state.registrationMessage =
        action.payload?.message || action.error.message; // Store error message
    });
  },
});

export const { logout } = authSlice.actions;

export const selectRegistrationStatus = (state) => state.auth.isRegistered;
export const selectRegistrationMessage = (state) =>
  state.auth.registrationMessage;
export const selectToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.isAuthenticated;
export const selectRequestStatus = (state) => state.auth.status;

export default authSlice.reducer;
