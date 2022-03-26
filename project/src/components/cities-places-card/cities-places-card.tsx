import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import { store } from '../../store';
import { fetchSetIsFavoriteAction } from '../../store/api-actions';
import { memo, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { isUserAuth } from '../../offers';
import {AppRoute} from '../../const';
import { useAppSelector } from '../../hooks';

type CitiesPlacesCardProps = {
  offer: Offer;
  onMouseOver: (id: number) => void;
}

function CitiesPlacesCard(props: CitiesPlacesCardProps): JSX.Element {
  const {offer, onMouseOver} = props;
  const {isPremium, price, title, id, isFavorite, images} = offer;
  const [isChechedFavorite, setIsChechedFavorite] = useState(isFavorite);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  const navigate = useNavigate();

  const changeIsFavorite = () => {
    if (!isUserAuth(authorizationStatus)) {
      navigate(AppRoute.Login);
      return;
    }

    setIsChechedFavorite(!isChechedFavorite);
    const status = isChechedFavorite ? 0 : 1;
    store.dispatch(fetchSetIsFavoriteAction({id, status}));
  };

  return (
    <article className="cities__place-card place-card" onMouseOver={() => onMouseOver(id)}>
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={images[0]} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
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
            <span style={{width: '80%'}}></span>
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
