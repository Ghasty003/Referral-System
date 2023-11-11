import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
      <Toaster position='top-right' />
    </React.StrictMode>
  </BrowserRouter>,
)
