import { Reviews } from '../../types/offer';
import ReviewsForm from '../reviews-form/reviews-form';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList(props: ReviewsListProps) {
  const {reviews} = props;
  const reviewsCount = reviews.length;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review, index) => {
          const keyValue = `${index}-${review.id}`;
          const date = new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

          return (
            <li
              className="reviews__item"
              key={keyValue}
            >
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
                </div>
                <span className="reviews__user-name">
                  {review.user.name}
                </span>

              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: '80%'}}></span>
                    <span className="visually-hidden">{review.rating}</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {review.comment}
                </p>
                <time className="reviews__time" dateTime={date}>{date}</time>
              </div>
            </li>
          );
        })}
      </ul>
      <ReviewsForm />
    </section>
  );
}

export default ReviewsList;
