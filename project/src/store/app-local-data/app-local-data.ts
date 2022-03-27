import { createSlice } from '@reduxjs/toolkit';
import { EMPTY_OFFER } from '../../const';
import { NameSpace } from '../../const';
import {AppLocalData} from '../../types/state';

const initialState: AppLocalData = {
  offer: EMPTY_OFFER,
  nearbyOffers: [],
  comments: [],
  isOfferLoaded: false,
  isCommentsLoaded: false,
  isNearbyOffersLoaded: false,
};

export const appLocalData = createSlice({
  name: NameSpace.localData,
  initialState,
  reducers: {
    loadOfferAction: (state, action) => {
      state.offer = action.payload;
      state.isOfferLoaded = true;
    },
    loadNearbyOfferAction: (state, action) => {
      state.nearbyOffers = action.payload;
      state.isNearbyOffersLoaded = true;
    },
    loadCommentsAction: (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoaded = true;
    },
    resetAllOfferAction: (state) => {
      state.comments = [];
      state.isCommentsLoaded = false;
      state.nearbyOffers = [];
      state.isNearbyOffersLoaded = false;
      state.offer = EMPTY_OFFER;
      state.isOfferLoaded = false;
    },
  },
});

export const {loadOfferAction, loadNearbyOfferAction, loadCommentsAction, resetAllOfferAction} = appLocalData.actions;
