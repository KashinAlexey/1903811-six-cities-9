import { Offers } from './types/offer';
import { City } from './types/offer';
import {AuthorizationStatus} from './const';

export const getOffers = (offers: Offers, city: City) => offers.slice().filter((offer) => offer.city.name === city.name);

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const isUserAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Auth;

export const getRandomIntegerInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
