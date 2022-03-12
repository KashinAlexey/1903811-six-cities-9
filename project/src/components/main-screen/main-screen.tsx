import CitiesPlacesList from '../cities-places-list/cities-places-list';
import LocationsList from '../locations-list/locations-list';
import Logo from '../logo/logo';
import {Cities, Offers, Offer, City} from '../../types/offer';
import {useState} from 'react';
import Map from '../map/map';
import {DEFAULT_CITY} from '../../const';

type MainScreenProps = {
  offers: Offers;
  cities: Cities;
  onOfferItemHover: (OfferItemId: number) => void;
  selectedOffer: Offer | undefined;
}

function MainScreen(props: MainScreenProps): JSX.Element {
  const {offers, cities, onOfferItemHover, selectedOffer} = props;
  const className = 'cities__map map';
  const listClassName = 'cities__places-list';
  const offersCount = offers.length;

  const [selectedCity, setSelectedCity] = useState<City>(
    DEFAULT_CITY,
  );

  const onListItemHover = (listItemName: string) => {
    const currentCity = cities.find((city) => city.name === listItemName) || DEFAULT_CITY;

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
            cities={cities}
            onListItemHover={onListItemHover}
            selectedCity={selectedCity}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {selectedCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <CitiesPlacesList
                offers={offers}
                onOfferItemHover={onOfferItemHover}
                listClassName={listClassName}
              />
            </section>
            <div className="cities__right-section">
              <Map
                selectedCity={selectedCity}
                offers={offers}
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
