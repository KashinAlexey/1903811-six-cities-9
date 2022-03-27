import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appGlobalData } from './app-global-data/app-global-data';
import { appLocalData } from './app-local-data/app-local-data';
import { appProcess } from './app-process/app-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.globalData]: appGlobalData.reducer,
  [NameSpace.localData]: appLocalData.reducer,
  [NameSpace.process]: appProcess.reducer,
  [NameSpace.user]: userProcess.reducer,
});
