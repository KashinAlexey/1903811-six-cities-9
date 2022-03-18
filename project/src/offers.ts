import { Offers } from './types/offer';
import { City } from './types/offer';
import {AuthorizationStatus} from './const';

export const getOffers = (offers: Offers, city: City) => offers.slice().filter((offer) => offer.city.name === city.name);

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
