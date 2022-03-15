import {createAction} from '@reduxjs/toolkit';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  ADD_OFFERS: 'ADD_OFFERS',
};

export const changeCityAction = createAction(Action.CHANGE_CITY, (city) => ({
  payload: city,
}));

export const addOffersAction = createAction(Action.ADD_OFFERS, (offers) => ({
  payload: offers,
}));
