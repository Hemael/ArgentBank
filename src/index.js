import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Layout from './components/layout';
import Home from './pages/home';
import SignIn from './pages/signIn';
import User from './pages/user';



const router = createBrowserRouter([
  {
    element:<Layout/>,
    children: [

      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/signin",
        element: <SignIn/>,
      },
      {
      path: "/user", 
      element: <User />, 
      },
    ],
  },
]);







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
