import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import "./css/main.css"
import { UserContextProvider } from './context/UserContext';
import { SnackbarProvider } from 'notistack'
import Fade from './Fade'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <SnackbarProvider maxSnack={3} autoHideDuration={6000} TransitionComponent={Fade} anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </SnackbarProvider>
);


