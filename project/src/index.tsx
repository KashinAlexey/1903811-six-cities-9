import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { fetchOffersAction } from './store/api-actions';
import { checkAuthAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
