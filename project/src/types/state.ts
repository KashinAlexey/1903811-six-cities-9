import {store} from '../store/index.js';
import { City } from '../types/offer';
import { Offer } from '../types/offer';
import { Offers } from '../types/offer';
import { Reviews } from '../types/offer';
import { AuthorizationStatus } from '../const';

export type AppGlobalData = {
  offers: Offers,
  favorites: Offers,
  isDataLoaded: boolean,
  isFavoritesLoaded: boolean,
};

export type AppLocalData = {
  offer: Offer,
  nearbyOffers: Offers,
  comments: Reviews,
  isOfferLoaded: boolean,
  isCommentsLoaded: boolean,
  isNearbyOffersLoaded: boolean,
};

export type AppProcess = {
  city: City,
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type State = ReturnType<typeof store.getState>;
