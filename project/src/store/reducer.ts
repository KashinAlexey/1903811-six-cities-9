import {createReducer} from '@reduxjs/toolkit';
import {
  addOffersAction,
  changeCityAction,
  requireAuthorization,
  loadOfferAction,
  loadNearbyOfferAction,
  loadCommentsAction,
  resetAllOfferAction,
  loadFavoritesAction,
  changeFavoriteAction
} from './action';
import { DEFAULT_CITY, AuthorizationStatus, EMPTY_OFFER } from '../const';
import { City, Offer, Offers, Reviews } from '../types/offer';

type InitialState = {
  city: City,
  offers: Offers,
  offer: Offer,
  nearbyOffers: Offers,
  favorites: Offers,
  comments: Reviews,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isOfferLoaded: boolean,
  isCommentsLoaded: boolean,
  isNearbyOffersLoaded: boolean,
  isFavoritesLoaded: boolean,
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  offer: EMPTY_OFFER,
  nearbyOffers: [],
  favorites: [],
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isOfferLoaded: false,
  isCommentsLoaded: false,
  isNearbyOffersLoaded: false,
  isFavoritesLoaded: false,
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
    }).addCase(loadFavoritesAction, (state, action) => {
      state.favorites = action.payload;
      state.isFavoritesLoaded = true;
    }).addCase(resetAllOfferAction, (state) => {
      state.comments = [];
      state.isCommentsLoaded = false;
      state.nearbyOffers = [];
      state.isNearbyOffersLoaded = false;
      state.offer = EMPTY_OFFER;
      state.isOfferLoaded = false;
    }).addCase(changeFavoriteAction, (state, action) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers = [...state.offers.slice(0, index), action.payload, ...state.offers.slice(index + 1)];
    });
});

export {reducer};
