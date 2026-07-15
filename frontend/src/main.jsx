import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import "./index.css"
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
        <ToastContainer position="top-right" />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
)
