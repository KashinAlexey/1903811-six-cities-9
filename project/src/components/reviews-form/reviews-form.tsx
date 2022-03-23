import {FormEvent, useState} from 'react';
import { REVIEW_LENGTH } from '../../const';
import {useAppSelector} from '../../hooks/index';
import {isUserAuth} from '../../offers';
import { store } from '../../store';
import { fetchCommentAction } from '../../store/api-actions';
import { UserComment } from '../../types/user-comment';

function ReviewsForm(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const {offer} = useAppSelector(({LOCAL_DATA}) => LOCAL_DATA);
  const isAuth = isUserAuth(authorizationStatus);

  const [formData, setFormData] = useState({
    review: '',
    rating: null,
  });

  const isValid = formData.rating !== null && formData.review !== '' && formData.review.length <= REVIEW_LENGTH;

  const fieldChangeHandle = (evt: { target: { name: string; value: string; }; }) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const ratingChangeHandle = (evt: { target: { name: string; value: string; }; }) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: +value});
  };

  const onSubmit = (reviewData: UserComment) => {
    store.dispatch(fetchCommentAction(reviewData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      comment: formData.review,
      rating: formData.rating,
      id: offer.id,
    });
  };


  return (
    <form
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        handleSubmit(evt);
      }}
      className="reviews__form form"
      action="#"
      method="post"
      hidden={!isAuth}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onChange={ratingChangeHandle} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={ratingChangeHandle} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={ratingChangeHandle} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={ratingChangeHandle} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={ratingChangeHandle} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea onChange={fieldChangeHandle} value={formData.review} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
