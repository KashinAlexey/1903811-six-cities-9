import {createReducer} from '@reduxjs/toolkit';
import {
  addOffersAction,
  changeCityAction
} from './action';
import { DEFAULT_CITY } from '../const';
import { offers } from '../mocks/offers';

const initialState = {
  city: DEFAULT_CITY,
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    });
});

export {reducer};
