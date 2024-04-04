import React from 'react';
import ReactDOM from 'react-dom/client';
// TODO check if we gonna need to add tsx after App
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
