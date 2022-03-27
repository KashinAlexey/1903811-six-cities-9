import CitiesPlacesList from '../cities-places-list/cities-places-list';
import { City } from '../../types/offer';
import Map from '../map/map';
import { Offers} from '../../types/offer';
import Sort from '../sort/sort';
import { useState } from 'react';

type CitiesProps = {
  city: City,
  offers: Offers;
  onSortChange: (type: string) => void,
}

function Cities(props: CitiesProps): JSX.Element {
  const {city, offers, onSortChange} = props;
  const className = 'cities__map map';
  const listClassName = 'cities__places-list';
  const offersCount = offers.length;

  const [selectedOfferId, setSelectedOfferId] = useState<number>(0);

  const onOfferItemHover = (offerItemId: number) => {
    setSelectedOfferId(offerItemId);
  };

  if (offersCount === 0) {
    return (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersCount} places to stay in {city.name}</b>
          <Sort
            onSortChange={onSortChange}
          />
          <CitiesPlacesList
            offers={offers}
            onOfferItemHover={onOfferItemHover}
            listClassName={listClassName}
          />
        </section>
        <div className="cities__right-section">
          <Map
            offers={offers}
            city={city}
            selectedOfferId={selectedOfferId}
            className={className}
          />
        </div>
      </div>
    </div>
  );
}

export default Cities;
