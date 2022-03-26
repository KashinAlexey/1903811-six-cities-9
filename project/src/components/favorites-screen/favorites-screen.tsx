import Favorites from '../favorites/favorites';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavoritesAction } from '../../store/api-actions';
import { useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

function FavoritesScreen(): JSX.Element {
  // TODO Изменить карточку избранного, 1.1.4 ТЗ
  const {favorites, isFavoritesLoaded} = useAppSelector(({GLOBAL_DATA}) => GLOBAL_DATA);

  useEffect(() => {
    store.dispatch(fetchFavoritesAction());
  }, []);

  if (!isFavoritesLoaded) {
    return (
      <LoadingScreen isDataLoaded={!isFavoritesLoaded}/>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <Header />
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <Favorites offers={favorites} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
