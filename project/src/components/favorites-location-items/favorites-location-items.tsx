import { Offers } from '../../types/offer';
import CitiesPlacesCard from '../cities-places-card/cities-places-card';

type FavoritesLocationItemsProps = {
  locations: Offers;
}

function FavoritesLocationItems(props: FavoritesLocationItemsProps): JSX.Element {
  const {locations} = props;
  const placeClassName = 'favorites__card';
  const imageClassName = 'favorites__image-wrapper';
  const cardClassName = 'favorites__card-info';
  const name = locations[0].city.name;

  const Cards = new Set();
  for (let number = 0; number < locations.length; number++){
    Cards.add(
      <CitiesPlacesCard
        key={locations[number].id.toString()}
        offer={locations[number]}
        onMouseOver={() => null}
        placeClassName={placeClassName}
        imageClassName={imageClassName}
        cardClassName={cardClassName}
      />);
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a href="#section" className="locations__item-link">
            <span>{name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {Cards}
      </div>
    </li>
  );
}

export default FavoritesLocationItems;
