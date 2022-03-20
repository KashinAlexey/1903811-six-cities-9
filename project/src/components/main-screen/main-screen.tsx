import CitiesPlacesList from '../cities-places-list/cities-places-list';
import LocationsList from '../locations-list/locations-list';
import Logo from '../logo/logo';
import { City, Offers} from '../../types/offer';
import {useState} from 'react';
import Map from '../map/map';
import {DEFAULT_CITY} from '../../const';
import {store} from '../../store/index';
import { changeCityAction } from '../../store/action';
import { getOffers } from '../../offers';
import {CITIES} from '../../mocks/cities';
import Sort from '../sort/sort';
import { getSortedData } from '../../sort';
import HeaderNav from '../header-nav/header-nav';

type MainScreenProps = {
  offers: Offers;
  onOfferItemHover: (OfferItemId: number) => void;
  onMouseClick: (OfferItemId: number) => void;
  selectedOfferId: number;
}

function MainScreen(props: MainScreenProps): JSX.Element {
  const {offers, onOfferItemHover, onMouseClick, selectedOfferId} = props;
  const className = 'cities__map map';
  const listClassName = 'cities__places-list';
  const city = store.getState().city;

  const [selectedCity, setSelectedCity] = useState<City>(
    DEFAULT_CITY,
  );

  const [currentOffers, setCurrenOffers] = useState(getOffers(offers, city));

  const offersCount = currentOffers.length;

  const onListItemHover = (listItemName: string) => {
    const currentCity = CITIES.find((_city) => _city.name === listItemName) || DEFAULT_CITY;

    store.dispatch(changeCityAction(currentCity));
    setSelectedCity(currentCity);
    setCurrenOffers(getOffers(offers, currentCity));
  };

  const onSortChange = (type: string) => {
    setCurrenOffers(getSortedData(getOffers(offers, city), type));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList
            cities={CITIES}
            onListItemHover={onListItemHover}
            selectedCity={selectedCity}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {selectedCity.name}</b>
              <Sort
                onSortChange={onSortChange}
              />
              <CitiesPlacesList
                offers={currentOffers}
                onOfferItemHover={onOfferItemHover}
                onMouseClick={onMouseClick}
                listClassName={listClassName}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={currentOffers}
                selectedOfferId={selectedOfferId}
                className={className}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
