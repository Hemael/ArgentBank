// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Assure-toi que le chemin est correct

const store = configureStore({
  reducer: {
    auth: authReducer, // Ajouter les reducers ici
  },
});

export default store;
