import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const {requireAuthorization} = userProcess.actions;
