import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  loading: false,
  error: false,
  updating: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminSignInStart: (state) => {
      state.loading = true;
    },
    adminSignInSuccess: (state, action) => {
      state.loading = false;
      state.currentAdmin = action.payload;
      state.error = false;
    },
    adminSignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminSignOutStart: (state) => {
      state.loading = true;
    },
    adminSignOutSuccess: (state) => {
      state.loading = false;
      state.currentAdmin = null;
      state.error = false;
    },
    updatingUserStart: (state) => {
      state.loading = true;
      state.updating = true;
    },
    updatingUserSuccess: (state) => {
      state.loading = false;
      state.updating = false;
    },
    updatingUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.updating = false;
    },
  },
});

export const {
  adminSignInStart,
  adminSignInSuccess,
  adminSignInFailure,
  adminSignOutStart,
  adminSignOutSuccess,
  updatingUserStart,
  updatingUserSuccess,
  updatingUserFailure,
} = adminSlice.actions;
export default adminSlice.reducer;
