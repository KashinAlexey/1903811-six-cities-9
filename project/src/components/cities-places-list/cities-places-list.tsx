import {Offers} from '../../types/offer';
import CitiesPlacesCard from '../cities-places-card/cities-places-card';

type CitiesPlacesListProps = {
  offers: Offers;
  onOfferItemHover: (OfferItemId: number) => void;
  onMouseClick: (OfferItemId: number) => void;
  listClassName: string;
}

function CitiesPlacesList(props: CitiesPlacesListProps): JSX.Element {
  const {offers, onOfferItemHover, onMouseClick, listClassName} = props;

  const onMouseOver = (id: number) => {
    onOfferItemHover(id);
  };

  const Cards = new Set();
  for (let number = 0; number < offers.length; number++){
    Cards.add(
      <CitiesPlacesCard
        key={offers[number].id.toString()}
        offer={offers[number]}
        onMouseOver={onMouseOver}
        onMouseClick={onMouseClick}
      />);
  }

  return (
    <div className={`${listClassName} places__list tabs__content`}>
      {Cards}
    </div>
  );
}

export default CitiesPlacesList;
