import {Offers} from '../../types/offer';
import CitiesPlacesCard from '../cities-places-card/cities-places-card';
import {useState} from 'react';

type CitiesPlacesListProps = {
  offers: Offers;
  onOfferItemHover: (OfferItemId: number) => void;
}

function CitiesPlacesList(props: CitiesPlacesListProps): JSX.Element {
  const {offers, onOfferItemHover} = props;
  const [offerId, setOfferId] = useState(0);

  const onMouseOver = (id: number) => {
    setOfferId(id);
    onOfferItemHover(offerId);
  };

  const Cards = new Set();
  for (let number = 0; number < offers.length; number++){
    Cards.add(
      <CitiesPlacesCard
        key={offers[number].id.toString()}
        offer={offers[number]}
        onMouseOver={onMouseOver}
      />);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {Cards}
    </div>
  );
}

export default CitiesPlacesList;
