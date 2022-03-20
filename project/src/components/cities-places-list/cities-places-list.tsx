import {Offers} from '../../types/offer';
import CitiesPlacesCard from '../cities-places-card/cities-places-card';

type CitiesPlacesListProps = {
  offers: Offers;
  onOfferItemHover: (OfferItemId: number) => void;
  listClassName: string;
}

function CitiesPlacesList(props: CitiesPlacesListProps): JSX.Element {
  const {offers, onOfferItemHover, listClassName} = props;

  const onMouseOver = (id: number) => {
    onOfferItemHover(id); // TODO неадекватное поведение объектов рядом
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
    <div className={`${listClassName} places__list tabs__content`}>
      {Cards}
    </div>
  );
}

export default CitiesPlacesList;
