import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './service/store';
import Layout from './components/layout';
import Home from './pages/home';
import SignIn from './pages/signIn';
import Profile from './pages/profile';
import ProtectedRoute from './components/ProtectedRoute'; // Importer le composant ProtectedRoute

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute element={<Profile />} />, // Utiliser ProtectedRoute pour la route protégée
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
