import {createReducer} from '@reduxjs/toolkit';
import {
  addOffersAction,
  changeCityAction,
  requireAuthorization,
  loadOfferAction,
  loadNearbyOfferAction
} from './action';
import { DEFAULT_CITY, AuthorizationStatus, EMPTY_OFFER } from '../const';
import { City, Offer, Offers } from '../types/offer';

type InitialState = {
  city: City,
  offers: Offers,
  offer: Offer,
  nearbyOffers: Offers,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isOfferLoaded: boolean,
  isNearbyOffersLoaded: boolean,
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  offer: EMPTY_OFFER,
  nearbyOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isOfferLoaded: false,
  isNearbyOffersLoaded: false,
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
    }).addCase(loadNearbyOfferAction, (state, action) => {
      state.nearbyOffers = action.payload;
      state.isNearbyOffersLoaded = true;
    });
});

export {reducer};
