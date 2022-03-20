import {createReducer} from '@reduxjs/toolkit';
import {
  addOffersAction,
  changeCityAction,
  requireAuthorization,
  loadOfferAction
} from './action';
import { DEFAULT_CITY, AuthorizationStatus, EMPTY_OFFER } from '../const';
import { City, Offer, Offers } from '../types/offer';

type InitialState = {
  city: City,
  offers: Offers,
  offer: Offer,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isOfferLoaded: boolean,
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  offer: EMPTY_OFFER,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isOfferLoaded: false,
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
    }).addCase(loadOfferAction, (state, action) => {
      state.offer = action.payload;
      state.isOfferLoaded = true;
    });
});

export {reducer};
