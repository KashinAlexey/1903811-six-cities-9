import { AppRoute } from '../../const';
import { fetchFavoritesAction } from '../../store/api-actions';
import { fetchSetIsFavoriteAction } from '../../store/api-actions';
import { isUserAuth } from '../../offers';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { Offer } from '../../types/offer';
import { store } from '../../store';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CitiesPlacesCardProps = {
  offer: Offer;
  onMouseOver: (id: number) => void;
  placeClassName: string;
  imageClassName: string;
  cardClassName: string;
}

function CitiesPlacesCard(props: CitiesPlacesCardProps): JSX.Element {
  const {offer, onMouseOver, placeClassName, imageClassName, cardClassName} = props;
  const {isPremium, price, title, id, isFavorite, images, rating} = offer;

  const [isChechedFavorite, setIsChechedFavorite] = useState(isFavorite);

  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  const navigate = useNavigate();

  const changeIsFavorite = async () => {
    if (!isUserAuth(authorizationStatus)) {
      navigate(AppRoute.Login);
      return;
    }

    setIsChechedFavorite(!isChechedFavorite);
    const status = isChechedFavorite ? 0 : 1;
    await store.dispatch(fetchSetIsFavoriteAction({id, status}));
    await store.dispatch(fetchFavoritesAction());
  };

  return (
    <article className={`${placeClassName} place-card`} onMouseOver={() => onMouseOver(id)}>
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ''}
      <div className={`${imageClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={images[0]} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className={`${cardClassName} lace-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={() => changeIsFavorite()} className={`place-card__bookmark-button ${isChechedFavorite && isUserAuth(authorizationStatus) ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
}

export default memo(CitiesPlacesCard, (prevProps, nextProps) => prevProps.offer.isFavorite === nextProps.offer.isFavorite);
