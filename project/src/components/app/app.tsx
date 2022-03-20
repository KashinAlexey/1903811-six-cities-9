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
import {useState} from 'react';
import {store} from '../../store/index';
import {isCheckedAuth} from '../../offers';
import { resetAllOfferAction } from '../../store/action';
import { fetchCommentsAction, fetchNearbyOfferAction, fetchOfferAction } from '../../store/api-actions';

function App(): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  const [selectedOfferId, setSelectedOfferId] = useState<number>(0);

  const offers = store.getState().offers;

  const onOfferItemHover = (offerItemId: number) => {
    setSelectedOfferId(offerItemId);
  };

  const onMouseClick = () => {
    store.dispatch(resetAllOfferAction());
    store.dispatch(fetchOfferAction(selectedOfferId));
    store.dispatch(fetchNearbyOfferAction(selectedOfferId));
    store.dispatch(fetchCommentsAction(selectedOfferId));
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
              onMouseClick={onMouseClick}
              selectedOfferId={selectedOfferId}
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
                onMouseClick={() => null}
              />
            }
          />
          <Route path=':id'
            element={
              <PropertyScreen
                onMouseClick={() => null}
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
