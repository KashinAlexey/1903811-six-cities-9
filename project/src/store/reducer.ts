import {createReducer} from '@reduxjs/toolkit';
import {
  addOffersAction,
  changeCityAction,
  requireAuthorization,
  loadOfferAction,
  loadNearbyOfferAction,
  loadCommentsAction,
  resetAllOfferAction
} from './action';
import { DEFAULT_CITY, AuthorizationStatus, EMPTY_OFFER } from '../const';
import { City, Offer, Offers, Reviews } from '../types/offer';

type InitialState = {
  city: City,
  offers: Offers,
  offer: Offer,
  nearbyOffers: Offers,
  comments: Reviews,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isOfferLoaded: boolean,
  isCommentsLoaded: boolean,
  isNearbyOffersLoaded: boolean,
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  offer: EMPTY_OFFER,
  nearbyOffers: [],
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isOfferLoaded: false,
  isCommentsLoaded: false,
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
    }).addCase(loadCommentsAction, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoaded = true;
    }).addCase(resetAllOfferAction, (state) => {
      state.comments = [];
      state.isCommentsLoaded = false;
      state.nearbyOffers = [];
      state.isNearbyOffersLoaded = false;
      state.offer = EMPTY_OFFER;
      state.isOfferLoaded = false;
    });
});

export {reducer};
