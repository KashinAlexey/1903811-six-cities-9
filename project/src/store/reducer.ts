import {createReducer} from '@reduxjs/toolkit';
import {
  addOffersAction,
  changeCityAction,
  requireAuthorization
} from './action';
import { DEFAULT_CITY, AuthorizationStatus } from '../const';
import { City, Offers } from '../types/offer';

type InitialState = {
  city: City,
  offers: Offers,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addOffersAction, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    }).addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    }).addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
