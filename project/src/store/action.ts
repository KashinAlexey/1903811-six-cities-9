import {createAction} from '@reduxjs/toolkit';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  ADD_OFFERS: 'ADD_OFFERS',
  LOAD_OFFER: 'LOAD_OFFER',
  AUTHORIZATION: 'AUTHORIZATION',
};

export const changeCityAction = createAction(Action.CHANGE_CITY, (city) => ({
  payload: city,
}));

export const addOffersAction = createAction(Action.ADD_OFFERS, (offers) => ({
  payload: offers,
}));

export const loadOfferAction = createAction(Action.LOAD_OFFER, (offer) => ({
  payload: offer,
}));

export const requireAuthorization = createAction(Action.AUTHORIZATION, (status) => ({
  payload: status,
}));
