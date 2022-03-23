import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../store';
import {store} from '../store';
import {Offers, Reviews} from '../types/offer';
import {addOffersAction, requireAuthorization, loadOfferAction, loadNearbyOfferAction, loadCommentsAction, loadFavoritesAction, changeFavoriteAction} from './action';
import {saveToken, dropToken, saveMail, dropMail} from '../services/token';
import {APIRoute, AuthorizationStatus} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {errorHandle} from '../services/error-handle';
import { UserComment } from '../types/user-comment';
import { PostFavorite } from '../types/post-favorite';

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      store.dispatch(addOffersAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferAction = createAsyncThunk(
  'data/fetchOffer',
  async (id: number) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}`);
      store.dispatch(loadOfferAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNearbyOfferAction = createAsyncThunk(
  'data/fetchNearbyhOffers',
  async (id: number) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
      store.dispatch(loadNearbyOfferAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  'data/fetchFavorites',
  async () => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Favorite}`);
      store.dispatch(loadFavoritesAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk(
  'data/fetchComments',
  async (id: number) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadCommentsAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSetIsFavoriteAction = createAsyncThunk(
  'data/fetchSetIsFavorite',
  async ({id, status}: PostFavorite) => {
    try {
      const {data} = await api.post<Reviews>(`${APIRoute.Favorite}/${id}/${status}`);
      store.dispatch(changeFavoriteAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);


export const fetchCommentAction = createAsyncThunk(
  'data/fetchComment',
  async ({comment, rating, id}: UserComment) => {
    try {
      const {data} = await api.post<Reviews>(`${APIRoute.Comments}/${id}`, {comment, rating});
      store.dispatch(loadCommentsAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      saveMail(email);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dropMail();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);
