import CitiesPlacesList from '../cities-places-list/cities-places-list';
import LocationsList from '../locations-list/locations-list';
import Logo from '../logo/logo';
import { Offer, City, Offers} from '../../types/offer';
import {useState} from 'react';
import Map from '../map/map';
import {DEFAULT_CITY} from '../../const';
import {store} from '../../store/index';
import { changeCityAction } from '../../store/action';
import { getOffers } from '../../offers';
import {CITIES} from '../../mocks/cities';
import Sort from '../sort/sort';


type MainScreenProps = {
  offers: Offers;
  onOfferItemHover: (OfferItemId: number) => void;
  selectedOffer: Offer | undefined;
}

function MainScreen(props: MainScreenProps): JSX.Element {
  const {offers, onOfferItemHover, selectedOffer} = props;
  const className = 'cities__map map';
  const listClassName = 'cities__places-list';

  const city = store.getState().city;

  const [selectedCity, setSelectedCity] = useState<City>(
    DEFAULT_CITY,
  );

  const currentOffers = getOffers(offers, city);
  const offersCount = currentOffers.length;

  const onListItemHover = (listItemName: string) => {
    const currentCity = CITIES.find((_city) => _city.name === listItemName) || DEFAULT_CITY;

    store.dispatch(changeCityAction(currentCity));
    setSelectedCity(currentCity);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#section">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#section">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
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
              <Sort />
              <CitiesPlacesList
                offers={currentOffers}
                onOfferItemHover={onOfferItemHover}
                listClassName={listClassName}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={currentOffers}
                selectedOffer={selectedOffer}
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
