import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Garage from './pages/Garage';
import Winners from './pages/Winners';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Garage />,
  },
  {
    path: '/winners',
    element: <Winners />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
