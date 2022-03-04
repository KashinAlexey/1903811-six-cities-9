import { Locations } from '../../types/offer';
import FavoritesLocationItems from '../favorites-location-items/favorites-location-items';

type FavoritesListProps = {
  locations: Locations;
}

function FavoritesList(props: FavoritesListProps): JSX.Element {

  const {locations} = props;

  const Cards = new Set();
  for (let number = 0; number < locations.length; number++){
    Cards.add(
      <FavoritesLocationItems
        key={number}
        locations={locations[number]}
      />);
  }

  return (
    <ul className="favorites__list">
      {Cards}
    </ul>
  );
}

export default FavoritesList;
