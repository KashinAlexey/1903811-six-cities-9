import { Offers } from './types/offer';

export const SortType = {
  priceHi: 'PriceHi',
  priceLow: 'PriceLow',
  ratingHi: 'RatingHi',
  default: 'Default',
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


