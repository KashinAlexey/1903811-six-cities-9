export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '*',
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
  bedrooms: 0,
  city: {
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    name: '',
  },
  description: '',
  goods: [''],
  host: {
    avatarUrl: '',
    id: 0,
    isPro: false,
    name: '',
  },
  id: 0,
  images: [''],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
  maxAdults: 0,
  previewImage: '',
  price: 0,
  rating: 0,
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
export const REVIEW_LENGTH = 50;

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite'
}

export const CITIES = [
  {
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12,
    },
    name: 'Paris',
  },
  {
    location: {
      latitude: 50.9375,
      longitude: 6.9603,
      zoom: 12,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.8476,
      longitude: 4.3572,
      zoom: 12,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.3676,
      longitude: 4.9041,
      zoom: 12,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 12,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.2277,
      longitude: 6.7735,
      zoom: 12,
    },
    name: 'Dusseldorf',
  },
];
