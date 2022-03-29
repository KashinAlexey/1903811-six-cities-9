import {FormEvent, useState, Fragment} from 'react';
import { MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH } from '../../const';
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
    rating: 0,
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const isValid = formData.rating !== null && formData.review !== '' && formData.review.length <= MAX_REVIEW_LENGTH && formData.review.length >= MIN_REVIEW_LENGTH;

  const fieldChangeHandle = (evt: { target: { name: string; value: string; }; }) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const ratingChangeHandle = (evt: { target: { name: string; value: string; }; }) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: +value});
  };

  const onSubmit = async (reviewData: UserComment) => {
    setIsDisabled(true);
    await store.dispatch(fetchCommentAction(reviewData));
    setFormData({
      review: '',
      rating: 0,
    });
    setIsDisabled(false);
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
        {[[5, 'perfect'], [4, 'good'], [3, 'not bad'], [2, 'badly'], [1, 'terribly']].map((rating, index) => {
          const [number, title] = rating;
          const keyValue = `${index}-${rating}`;
          return (
            <Fragment key={keyValue}>
              <input
                onChange={ratingChangeHandle}
                className="form__rating-input visually-hidden"
                name="rating"
                value={number}
                id={`${number}-stars`}
                type="radio"
                checked={number === formData.rating}
                disabled={isDisabled}
              />
              <label
                htmlFor={`${number}-stars`}
                className="reviews__rating-label form__rating-label" title={`${title}`}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea
        onChange={fieldChangeHandle}
        value={formData.review}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        disabled={isDisabled}
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
