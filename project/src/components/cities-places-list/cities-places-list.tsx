import {Offers} from '../../types/offer';
import CitiesPlacesCard from '../cities-places-card/cities-places-card';
import {useState} from 'react';

type CitiesPlacesListProps = {
  offers: Offers;
}

function CitiesPlacesList(props: CitiesPlacesListProps): JSX.Element {
  const {offers} = props;
  const [offerId, setOfferId] = useState(0);

  const onMouseOver = (id: number) => {
    setOfferId(id);
    // eslint-disable-next-line no-console
    console.log(offerId);
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
