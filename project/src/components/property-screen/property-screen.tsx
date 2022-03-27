import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import CitiesPlacesList from '../cities-places-list/cities-places-list';
import {useAppSelector} from '../../hooks/index';
import LoadingScreen from '../loading-screen/loading-screen';
import {useParams} from 'react-router-dom';
import {store} from '../../store/index';
import { fetchCommentsAction, fetchNearbyOfferAction, fetchOfferAction } from '../../store/api-actions';
import { resetAllOfferAction } from '../../store/app-local-data/app-local-data';
import {useEffect, useState} from 'react';
import Header from '../header/header';
import { isUserAuth } from '../../offers';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import { fetchSetIsFavoriteAction } from '../../store/api-actions';

function PropertyScreen() {
  // TODO Неадекватное поведение компонента при добавлении и удалении из Избранного
  const params = useParams();
  const [selectedOfferId, setSelectedOfferId] = useState<number>(0);
  const {offer, nearbyOffers, comments, isOfferLoaded, isNearbyOffersLoaded, isCommentsLoaded} = useAppSelector(({LOCAL_DATA}) => LOCAL_DATA);
  const className = 'property__map map';
  const listClassName = 'near-places__list';
  const {isPremium, price, title, rating, goods, type, bedrooms, maxAdults, description, host, city, images, isFavorite, id} = offer;
  const [isChechedFavorite, setIsChechedFavorite] = useState(isFavorite);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  const navigate = useNavigate();

  useEffect(() => {
    if (params.id && +params.id !== selectedOfferId) {
      setSelectedOfferId(+params.id);
      store.dispatch(resetAllOfferAction());
      store.dispatch(fetchOfferAction(+params.id));
      store.dispatch(fetchNearbyOfferAction(+params.id));
      store.dispatch(fetchCommentsAction(+params.id));
    }
  }, [selectedOfferId, params]);

  const changeIsFavorite = () => {
    if (!isUserAuth(authorizationStatus)) {
      navigate(AppRoute.Login);
      return;
    }

    const status = isChechedFavorite ? 0 : 1;
    store.dispatch(fetchSetIsFavoriteAction({id, status}));
    setIsChechedFavorite(!isChechedFavorite);
  };

  const isLoaded = isOfferLoaded && isNearbyOffersLoaded && isCommentsLoaded;

  if (!isLoaded) {
    return (
      <LoadingScreen isDataLoaded={isLoaded}/>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0,6).map((image, index) => {
                const keyValue = `${index}-${image}`;
                return (
                  <div
                    key={keyValue}
                    className="property__image-wrapper"
                  >
                    <img className="property__image" src={image} alt="studio" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button onClick={() => changeIsFavorite()} className={`property__bookmark-button ${isChechedFavorite && isUserAuth(authorizationStatus) ? 'property__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, index) => {
                    const keyValue = `${index}-${good}`;
                    return (
                      <li
                        className="property__inside-item"
                        key={keyValue}
                      >
                        {good}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  <span className="property__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <ReviewsList reviews={comments}/>
            </div>
          </div>
          <Map
            offers={[...nearbyOffers, offer]}
            city={city}
            selectedOfferId={id}
            className={className}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CitiesPlacesList
              offers={nearbyOffers}
              onOfferItemHover={() => null}
              listClassName={listClassName}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyScreen;
