// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        email:null,
        token: null,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user; 
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        rememberEmail: (state, action) => {
            state.email = action.payload;
        },
        forgetEmail: (state) => {
            state.email = null;
        },
        loginFailure: (state) => {
            state.error = 'Erreur lors de la connexion';
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        updateProfile:(state, action) => {
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
        }
    },
});

export const { loginSuccess, loginFailure, logout, updateProfile, rememberEmail, forgetEmail } = authSlice.actions;
export default authSlice.reducer;
