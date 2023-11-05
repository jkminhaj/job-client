import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// react router
import { RouterProvider } from "react-router-dom";
import { router } from '../Routes';
import AuthProvider from '../AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
