import { AppRoute } from '../../const';
import browserHistory from '../../browser-history';
import { isCheckedAuth } from '../../offers';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import HistoryRouter from '../history-router/history-router';
import LoginScreen from '../login-screen/login-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PropertyScreen from '../property-screen/property-screen';
import PrivateRoute from '../private-route/private-route';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index';

function App(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const {offers, isDataLoaded} = useAppSelector(({GLOBAL_DATA}) => GLOBAL_DATA);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen isDataLoaded={!isDataLoaded}/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainScreen
              offers={offers}
            />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route path={AppRoute.Offer}>
          <Route index
            element={<PropertyScreen />}
          />
          <Route path=':id'
            element={<PropertyScreen />}
          />
        </Route>
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
