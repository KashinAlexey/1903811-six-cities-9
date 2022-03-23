import {createSlice} from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import {AppGlobalData} from '../../types/state';

const initialState: AppGlobalData = {
  offers: [],
  favorites: [],
  isDataLoaded: false,
  isFavoritesLoaded: false,
};

export const appGlobalData = createSlice({
  name: NameSpace.globalData,
  initialState,
  reducers: {
    addOffersAction: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadFavoritesAction: (state, action) => {
      state.favorites = action.payload;
      state.isFavoritesLoaded = true;
    },
    changeFavoriteAction: (state, action) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers = [...state.offers.slice(0, index), action.payload, ...state.offers.slice(index + 1)];
    },
  },
});

export const {addOffersAction, loadFavoritesAction, changeFavoriteAction} = appGlobalData.actions;
