// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user; // Assure-toi que `user` est bien défini ici
            state.token = action.payload.token;
            state.isAuthenticated = true;
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
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
