export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const DEFAULT_CITY = {
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12,
  },
  name: 'Paris',
};

export const EMPTY_OFFER = {
  bedrooms: null,
  city: {
    location: {
      latitude: null,
      longitude: null,
      zoom: null,
    },
    name: '',
  },
  description: '',
  goods: [''],
  host: {
    avatarUrl: '',
    id: null,
    isPro: null,
    name: '',
  },
  id: null,
  images: [''],
  isFavorite: null,
  isPremium: null,
  location: {
    latitude: null,
    longitude: null,
    zoom: null,
  },
  maxAdults: null,
  previewImage: '',
  price: null,
  rating: null,
  title: '',
  type: '',
};

export const DEFAULT_ICON = {
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

export const ICON_SIZE = 40;
export const ICON_ANCHER = 20;

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
}
