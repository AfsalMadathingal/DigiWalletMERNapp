import { createSlice, current } from "@reduxjs/toolkit";


const initialState = {
    currentAdmin: null,
    loading : false,
    error: false,
};


const adminSlice = createSlice({

    name:"admin",
    initialState,
    reducers :{

        adminSignInStart : (state) => {
            state.loading = true;
        },
        adminSignInSuccess:(state,action) => {
            state.loading = false;
            state.currentAdmin = action.payload;
            state.error = false;

        },
        adminSignInFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        adminSignOutStart : (state) => {
            state.loading = true;
        },
        adminSignOutSuccess:(state) => {

            state.loading = false;
            state.currentAdmin = null;
            state.error = false;

        },
    }

})


export const {adminSignInStart,adminSignInSuccess,adminSignInFailure ,adminSignOutStart,adminSignOutSuccess} = adminSlice.actions;
export default adminSlice.reducer