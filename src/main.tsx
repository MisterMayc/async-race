import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Garage from './pages/Garage';
import Winners from './pages/Winners';
import WinnerContext from './WinnerContext';
import fetchData from './api';
import { IWinner } from './types';

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

function App() {
  const [winner, setWinner] = useState<number | null>(null);
  const [winners, setWinners] = useState<IWinner[]>([]);

  const getWinners = async () => {
    await fetchData(`${import.meta.env.VITE_BACKEND_API}/winners`).then((r) =>
      setWinners(r),
    );
  };

  useEffect(() => {
    getWinners();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <WinnerContext.Provider value={{ winner, setWinner, winners, setWinners }}>
      <RouterProvider router={router} />
    </WinnerContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
