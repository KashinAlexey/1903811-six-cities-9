import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {CITIES} from './mocks/cities';
import {store} from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        offers = {offers}
        cities = {CITIES}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
