import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.scss"
import {Authcontextprovider} from "./Authcontext.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authcontextprovider>
    <App />
    </Authcontextprovider>
    
  </React.StrictMode>,
)
