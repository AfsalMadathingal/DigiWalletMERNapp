import { createSlice, current } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading : false,
    error: false,
    count:false
};


const userSlice = createSlice({

    name:"user",
    initialState,
    reducers :{

        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess:(state,action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = false;

        },
        signInFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutStart : (state) => {
            state.loading = true;
        },
        signOutSuccess:(state) => {

            state.loading = false;
            state.currentUser = null;
            state.error = false;

        },
        updateStart:(state)=>{
            state.loading = true
        },
        updateSuccess:(state,action)=>{
            state.loading = false
            state.currentUser = action.payload
            state.error = false
        },
        updateFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        updateCount:(state)=>{
            state.count ++
        },
        isLogin:(state, action) => {
            state.currentUser = action.payload
        }
    }

})


export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  updateCount,
  isLogin,
} = userSlice.actions;
export default userSlice.reducer