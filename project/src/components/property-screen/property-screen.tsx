import Logo from '../logo/logo';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import CitiesPlacesList from '../cities-places-list/cities-places-list';
import HeaderNav from '../header-nav/header-nav';
import {useAppSelector} from '../../hooks/index';
import LoadingScreen from '../loading-screen/loading-screen';
import {useParams} from 'react-router-dom';
import {store} from '../../store/index';
import { fetchCommentsAction, fetchNearbyOfferAction, fetchOfferAction } from '../../store/api-actions';
import { resetAllOfferAction } from '../../store/action';
import {useEffect, useState} from 'react';

function PropertyScreen() {
  const params = useParams();
  const [selectedOfferId, setSelectedOfferId] = useState<number>(0);
  const {offer, nearbyOffers, comments, isOfferLoaded, isNearbyOffersLoaded, isCommentsLoaded} = useAppSelector((state) => state);
  const className = 'property__map map';
  const listClassName = 'near-places__list';
  const {isPremium, price, title, rating, goods, type, bedrooms, maxAdults, description, host, city} = offer;

  useEffect(() => {
    if (params.id && +params.id !== selectedOfferId) {
      setSelectedOfferId(+params.id);
      store.dispatch(resetAllOfferAction());
      store.dispatch(fetchOfferAction(+params.id));
      store.dispatch(fetchNearbyOfferAction(+params.id));
      store.dispatch(fetchCommentsAction(+params.id));
    }
  }, [selectedOfferId, params]);

  if (!isOfferLoaded && !isNearbyOffersLoaded && !isCommentsLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              <div className="property__image-wrapper">
                <img className="property__image" src="img/room.jpg" alt="studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-02.jpg" alt="studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-03.jpg" alt="studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/studio-01.jpg" alt="studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="studio" />
              </div>
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>{isPremium ? 'Premium' : ''}</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: '80%'}}></span>
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
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
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
            offers={nearbyOffers}
            city={city}
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
