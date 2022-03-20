import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks/index';
import {AppRoute} from '../../const';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import LoginScreen from '../login-screen/login-screen';
import PropertyScreen from '../property-screen/property-screen';
import PrivateRoute from '../private-route/private-route';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {Offer} from '../../types/offer';
import {useState} from 'react';
import {store} from '../../store/index';
import {isCheckedAuth} from '../../offers';
import { fetchCommentsAction, fetchNearbyOfferAction, fetchOfferAction } from '../../store/api-actions';

function App(): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>();

  const offers = store.getState().offers;

  const onOfferItemHover = (offerItemId: number) => {
    store.dispatch(fetchOfferAction(offerItemId));
    store.dispatch(fetchNearbyOfferAction(offerItemId));
    store.dispatch(fetchCommentsAction(offerItemId));
    const currentOffer = store.getState().offer;

    setSelectedOffer(currentOffer);
  };

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

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
              authorizationStatus={authorizationStatus}
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
                onOfferItemHover={onOfferItemHover}
              />
            }
          />
          <Route path=':id'
            element={
              <PropertyScreen
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
