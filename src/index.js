import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.js'
import './index.css'
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <GoogleOAuthProvider clientId='978352595764-9nlrl4hfiblfmnfgpradda52mq4qafch.apps.googleusercontent.com'>
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
)
