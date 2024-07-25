import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/RootReducer';
import thunk from "redux-thunk"
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"   // BootstrapCss importieren, damit es automatisch formatiert wird
import { BrowserRouter } from 'react-router-dom';

const initialState = {}
const middelwares = [thunk];
const store = createStore(rootReducer,initialState,applyMiddleware(...middelwares))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Provider ist ein React-Komponente - High-Order-Component - FKT: Verbindung React mit Redux 
  <BrowserRouter>
  <Provider store={store}>
      <App />
  </Provider>
  </BrowserRouter>
);

