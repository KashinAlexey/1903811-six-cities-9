import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {AuthorizationStatus} from '../../const';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import LoginScreen from '../login-screen/login-screen';
import PropertyScreen from '../property-screen/property-screen';
import PrivateRoute from '../private-route/private-route';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {Offer} from '../../types/offer';
import {useState} from 'react';
import {store} from '../../store/index';

function App(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>();

  const offers = store.getState().offers;

  const onOfferItemHover = (offerItemId: number) => {
    const currentOffer = offers.find((offer) => offer.id === offerItemId);

    setSelectedOffer(currentOffer);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainScreen
              offers={offers}
              onOfferItemHover={onOfferItemHover}
              selectedOffer={selectedOffer}
            />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesScreen offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route path={AppRoute.Offer}>
          <Route index
            element={
              <PropertyScreen
                selectedOffer={selectedOffer}
                offers={offers}
                onOfferItemHover={onOfferItemHover}
              />
            }
          />
          <Route path=':id'
            element={
              <PropertyScreen
                selectedOffer={selectedOffer}
                offers={offers}
                onOfferItemHover={onOfferItemHover}
              />
            }
          />
        </Route>
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
