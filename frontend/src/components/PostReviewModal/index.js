import './PostReviewModal.css';
import { useState, useEffect } from "react";
import { thunkCreateReview } from "../../store/reviews";
import { thunkGetSpot } from "../../store/spots";
const { useDispatch, useSelector } = require("react-redux");
const { useModal } = require("../../context/Modal");

function PostReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stars, setStars] = useState(0);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const errors = {};
    if (stars === 0) {
      errors.stars = "Star rating required";
    }
    if (review.length < 10) {
      errors.review = "Review must be at least 10 characters";
    }
    setErrors(errors);
  }, [stars, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (Object.values(errors).length === 0) {
        const newReview = {
            User: {
                firstName: user.firstName,
                lastName: user.lastName,
                id: user.id
            },
            review,
            stars
        }
        // const review = await dispatch
        const finalReview = await dispatch(thunkCreateReview(newReview, spotId))
        if (finalReview.errors) {
            setErrors(finalReview.errors)
        } else {
            closeModal();
            await dispatch(thunkGetSpot(spotId))
        }
    }
    // console.log("STAAARSSS: ", stars);
  };

  return (
    <>
      <div>
        <h2>How was your stay?</h2>

        {errors.rating && (
          <p className={isSubmitted ? "errors" : "hidden"}>{errors.rating}</p>
        )}

        {errors.review && (
          <p className={isSubmitted ? "errors" : "hidden"}>{errors.review}</p>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setReview(e.target.value)}
            value={review}
            placeholder="Leave your review here..."
          />

          <div>
            <button
              type="button"
              className={stars >= 1 || rating >= 1 ? "filled" : "empty"}
              onMouseEnter={() => setRating(1)}
              onMouseLeave={() => setRating(0)}
              onClick={() => setStars(1)}
            >
              <i className="fa-solid fa-star star"></i>
            </button>

            <button
              type="button"
              className={stars >= 2 || rating >= 2 ? "filled" : "empty"}
              onMouseEnter={() => setRating(2)}
              onMouseLeave={() => setRating(0)}
              onClick={() => setStars(2)}
            >
              <i className="fa-solid fa-star star"></i>
            </button>

            <button
              type="button"
              className={stars >= 3 || rating >= 3 ? "filled" : "empty"}
              onMouseEnter={() => setRating(3)}
              onMouseLeave={() => setRating(0)}
              onClick={() => setStars(3)}
            >
              <i className="fa-solid fa-star star"></i>
            </button>

            <button
              type="button"
              className={stars >= 4 || rating >= 4 ? "filled" : "empty"}
              onMouseEnter={() => setRating(4)}
              onMouseLeave={() => setRating(0)}
              onClick={() => setStars(4)}
            >
              <i className="fa-solid fa-star star"></i>
            </button>

            <button
              type="button"
              className={stars >= 5 || rating >= 5 ? "filled" : "empty"}
              onMouseEnter={() => setRating(5)}
              onMouseLeave={() => setRating(0)}
              onClick={() => setStars(5)}
            >
              <i className="fa-solid fa-star star"></i>
            </button>

            <p>Stars</p>
          </div>

          <button type="submit" disabled={Object.keys(errors).length > 0}>
            Submit Your Review
          </button>
        </form>
      </div>
    </>
  );
}

export default PostReviewModal;
