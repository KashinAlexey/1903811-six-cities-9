import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {CITIES} from './mocks/cities';

ReactDOM.render(
  <React.StrictMode>
    <App
      offers = {offers}
      cities = {CITIES}
    />
  </React.StrictMode>,
  document.getElementById('root'));
