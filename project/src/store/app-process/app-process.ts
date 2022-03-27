import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const';
import { NameSpace } from '../../const';
import {AppProcess} from '../../types/state';

const initialState: AppProcess = {
  city: DEFAULT_CITY,
};

export const appProcess = createSlice({
  name: NameSpace.process,
  initialState,
  reducers: {
    changeCityAction: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const {changeCityAction} = appProcess.actions;
