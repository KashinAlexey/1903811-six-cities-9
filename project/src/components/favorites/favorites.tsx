import { Offers } from '../../types/offer';
import FavoritesList from '../favorites-list/favorites-list';

type FavoritesProps = {
  offers: Offers;
}

function Favorites(props: FavoritesProps): JSX.Element {
  const {offers} = props;

  const Cities = new Set();
  for(const offer of offers) {
    if(offer.isFavorite) {
      Cities.add(offer.city.name);
    }
  }

  const locations = [];
  for (let number = 0; number < Cities.size; number++) {
    locations.push(offers.filter((offer) => offer.city.name === [...Cities][number] && offer.isFavorite));
  }

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <FavoritesList locations={locations}/>
    </section>
  );
}

export default Favorites;
