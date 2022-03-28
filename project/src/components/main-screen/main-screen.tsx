import LocationsList from '../locations-list/locations-list';
import { Offers} from '../../types/offer';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DEFAULT_CITY } from '../../const';
import { store } from '../../store/index';
import { changeCityAction } from '../../store/app-process/app-process';
import { getOffers } from '../../offers';
import { CITIES } from '../../const';
import { getSortedData } from '../../sort';
import Cities from '../cities/cities';
import Header from '../header/header';
import { resetFavoritesAction } from '../../store/app-global-data/app-global-data';
import { useAppSelector } from '../../hooks';

type MainScreenProps = {
  offers: Offers;
}

function MainScreen(props: MainScreenProps): JSX.Element {
  const {offers} = props;
  const {city} = useAppSelector(({PROCESS}) => PROCESS);
  const [currentOffers, setCurrentOffers] = useState(getOffers(offers, city));

  useEffect(() => {
    store.dispatch(resetFavoritesAction());
  }, []);

  const onListItemHover = useCallback((listItemName: string) => {
    const currentCity = CITIES.find((_city) => _city.name === listItemName) || DEFAULT_CITY;

    if (city.name !== currentCity.name) {
      store.dispatch(changeCityAction(currentCity));
      setCurrentOffers(getOffers(offers, currentCity));
    }
  }, [offers, city.name]);

  const onSortChange = useCallback((type: string) => {
    setCurrentOffers(getSortedData(getOffers(offers, city), type));
  }, [city, offers]);

  return (
    <div className={`page page--gray page--main ${currentOffers.length !== 0 ? '' : 'page__main--index-empty'}`}>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList
            cities={CITIES}
            onListItemHover={onListItemHover}
            selectedCity={city}
          />
        </div>
        <Cities
          city={city}
          offers={currentOffers}
          onSortChange={onSortChange}
        />
      </main>
    </div>
  );
}

export default MainScreen;
