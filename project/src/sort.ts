import { Offers } from './types/offer';
import { Reviews } from './types/offer';

export const SortType = {
  priceHi: 'Price: high to low',
  priceLow: 'Price: low to high',
  ratingHi: 'Top rated first',
  default: 'Popular',
};

// Compare functions in arr.sort(foo)
const getWeightForNull = (A: number, B: number) => {
  if (A === null && B === null) {
    return 0;
  }
  if (A === null) {
    return 1;
  }
  if (B === null) {
    return -1;
  }
  return null;
};

const sortNumber = (numberA: number, numberB: number, type: string) => {
  const weight = getWeightForNull(numberA, numberB);

  return type === 'Up'? weight ?? numberB - numberA : weight ?? numberA - numberB;
};

export const sortDate = (dayA: string, dayB: string, type: string) => {
  const _dayA = Date.parse(dayA);
  const _dayB = Date.parse(dayB);
  const weight = getWeightForNull(_dayA, _dayB);

  return type === 'Up'? weight ?? _dayB - _dayA : weight ?? _dayA - _dayB;
};

export const getSortedData = (data: Offers, sortType: string) => {
  let sortedData = data.slice();

  switch (sortType) {
    case SortType.priceHi:
      sortedData.sort((dataA, dataB) => sortNumber(dataA.price, dataB.price, 'Up'));
      break;
    case SortType.priceLow:
      sortedData.sort((dataA, dataB) => sortNumber(dataA.price, dataB.price, 'Down'));
      break;
    case SortType.ratingHi:
      sortedData.sort((dataA, dataB) => sortNumber(dataA.rating, dataB.rating, 'Up'));
      break;
    default:
      sortedData = data;
  }

  return sortedData;
};

export const getSortedReviews = (data: Reviews) => {
  const sortedData = data.slice();
  return sortedData.sort((dataA, dataB) => sortDate(dataA.date, dataB.date, 'Up'));
};
