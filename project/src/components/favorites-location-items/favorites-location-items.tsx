import FavoriteCitiesCard from '../favorite-cities-card/favorite-cities-card';
import {Offers} from '../../types/offer';

type FavoritesLocationItemsProps = {
  locations: Offers;
}

function FavoritesLocationItems(props: FavoritesLocationItemsProps): JSX.Element {
  const {locations} = props;
  const name = locations[0].city.name;

  const Cards = new Set();
  for (let number = 0; number < locations.length; number++){
    Cards.add(
      <FavoriteCitiesCard
        key={locations[number].id.toString()}
        offer={locations[number]}
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
