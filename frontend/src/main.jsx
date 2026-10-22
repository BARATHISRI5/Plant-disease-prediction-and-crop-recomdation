import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-primary-green">Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
)