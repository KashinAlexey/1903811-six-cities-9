import { Offers } from './types/offer';
import { City } from './types/offer';

export const getOffers = (offers: Offers, city: City) => offers.slice().filter((offer) => offer.city.name === city.name);
