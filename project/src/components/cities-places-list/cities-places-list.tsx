import {Offers} from '../../types/offer';
import CitiesPlacesCard from '../cities-places-card/cities-places-card';

type CitiesPlacesListProps = {
  offers: Offers;
}

function CitiesPlacesList(props: CitiesPlacesListProps): JSX.Element {
  const {offers} = props;

  const Cards = new Set();
  for (let number = 0; number < offers.length; number++){
    Cards.add(
      <CitiesPlacesCard
        key={offers[number].id.toString()}
        offer={offers[number]}
      />);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {Cards}
    </div>
  );
}

export default CitiesPlacesList;
