import {createReducer} from '@reduxjs/toolkit';
import {
  addOffersAction,
  changeCityAction
} from './action';
import { DEFAULT_CITY } from '../const';
import { EMPTY_OFFER } from '../const';

const initialState = {
  city: DEFAULT_CITY,
  offers: [EMPTY_OFFER],
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
