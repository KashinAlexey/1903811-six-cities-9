import {createAction} from '@reduxjs/toolkit';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  ADD_OFFERS: 'ADD_OFFERS',
  LOAD_OFFER: 'LOAD_OFFER',
  LOAD_NEARBY_OFFERS: 'LOAD_NEARBY_OFFERS',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  AUTHORIZATION: 'AUTHORIZATION',
  RESET_OFFER: 'RESET_OFFER',
};

export const resetAllOfferAction = createAction(Action.RESET_OFFER);

export const changeCityAction = createAction(Action.CHANGE_CITY, (city) => ({
  payload: city,
}));

export const addOffersAction = createAction(Action.ADD_OFFERS, (offers) => ({
  payload: offers,
}));

export const loadOfferAction = createAction(Action.LOAD_OFFER, (offer) => ({
  payload: offer,
}));

export const loadNearbyOfferAction = createAction(Action.LOAD_NEARBY_OFFERS, (nearbyOffers) => ({
  payload: nearbyOffers,
}));

export const loadCommentsAction = createAction(Action.LOAD_COMMENTS, (comments) => ({
  payload: comments,
}));

export const requireAuthorization = createAction(Action.AUTHORIZATION, (status) => ({
  payload: status,
}));
