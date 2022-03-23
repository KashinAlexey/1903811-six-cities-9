import Logo from '../logo/logo';
import Favorites from '../favorites/favorites';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavoritesAction } from '../../store/api-actions';
import { useEffect } from 'react';

function FavoritesScreen(): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('<FavoritesScreen />');

  const {favorites, isFavoritesLoaded} = useAppSelector((state) => state);

  useEffect(() => {
    store.dispatch(fetchFavoritesAction());
  }, []);

  if (!isFavoritesLoaded) {
    return (
      <LoadingScreen isDataLoaded={!isFavoritesLoaded}/>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a href="#section" className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a href="#section" className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <Favorites offers={favorites} />
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
