import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
      {
        path: "game/:game_id",
        element: <App currentView={'game'}/>,
        loader: ( { params } ) => params.game_id,
      },
      {
        path: "/",
        element: <App currentView={'site'}/>,
        loader: ( { params } ) => false,
      }, 
], { basename: process.env.REACT_APP_PUBLIC_URL } );
console.log(process.env.REACT_APP_PUBLIC_URL)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
