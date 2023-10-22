import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './Context/GoogleContext.tsx'
import { PlaidAuthProvider } from './Context/PlaidContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlaidAuthProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PlaidAuthProvider>
  </React.StrictMode>,
)