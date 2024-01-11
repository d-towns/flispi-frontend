import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0ProviderWithNavigate } from './context/Auth0Provider';
import { BrowserRouter } from 'react-router-dom';


// Render the root component
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    
      <App />
      
  </React.StrictMode>
);
