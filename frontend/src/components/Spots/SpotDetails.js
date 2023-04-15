import { useDispatch, useSelector } from "react-redux";
import "./spotdetailspage.css";
import { thunkGetSpot } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { thunkGetSpotReviews } from "../../store/reviews";
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal";

const SpotDetails = () => {
  let dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots);
  const spotsObject = Object.values(spots || {});
  const spot = spotsObject.find((spot) => spot.id === parseInt(spotId));
  const currentUser = useSelector((state) => state.session.user);
  const reviewsObj = useSelector((state) => state.reviews);
  const reviewsArr = Object.values(reviewsObj || {});

  useEffect(() => {
    dispatch(thunkGetSpot(spotId));
    dispatch(thunkGetSpotReviews(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;
  // console.log("spots: ", spot);
  // if (!spot.SpotImages) return null;

  const dateConverter = (reviewDate) => {
    //2023-04-14T15:04:11.000Z
    const uglyDate = reviewDate.slice(0, 10);
    // console.log(uglyDate);
    const dateArray = uglyDate.split("-");
    // console.log(dateArray);
    const month = dateArray[1];
    const year = dateArray[0];
    const months = [
      "VoidMonth",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    for (let i = 0; i < months.length; i++) {
      const currentMonth = months[i];
      if (month.charAt(0) === "0") {
        if (month.charAt(1) === i.toString()) {
          // console.log(currentMonth);
          return `${currentMonth} ${year}`;
        }
      } else {
        if (parseInt(month) === i) {
          return currentMonth + year;
        }
      }
    }
  };

  reviewsArr.sort((a, b) => {
    a = new Date(a.createdAt).getTime();
    b = new Date(b.createdAt).getTime();
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });

  const handleReserveBtnClick = () => {
    alert("Feature Coming Soon...");
  };
  // information for Review authorizations
  const firstPersonToReview = <p>Be the first to post a review!</p>;

  console.log("REVIEWS ARRAYYYY: ", reviewsArr);

  let userHasPostedReview;
  if (currentUser) {
    userHasPostedReview = reviewsArr.find(
      (review) => review.userId === currentUser.id
    );
  }

  // userHasPostedReview = Object.values(userHasPostedReview);

  console.log("has posted a review: ", userHasPostedReview);

  return (
    <>
      <div>
        <div className="spot-name-and-location-subtitle">
          <h2>{spot.name}</h2>
          <p>
            {spot.city}, {spot.state}, {spot.country}
          </p>
        </div>

        <div className="spot-images">
          {spot.SpotImages?.map((image) => (
            <img key={image.id} src={image.url} alt={spot.name} />
          ))}
        </div>
        <div className="host-and-review-container">
          <div className="host-and-description">
            <h2>
              Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
            </h2>
            <p>{spot.description}</p>
          </div>

          <div className="callout-info-box">
            <div className="price">{`$${spot.price} night`}</div>

            <div className="star-reviews">
              {" "}
              <div className="review-header">
                <div className="edit-star-and-rating">
                  <i className="fa-solid fa-star" />
                  <p>
                    {spot.avgStarRating === null
                      ? "New"
                      : spot.avgStarRating % 1 === 0
                      ? spot.avgStarRating + ".0"
                      : spot.avgStarRating}
                  </p>
                  <p
                    className={spot.avgStarRating === null ? "hidden" : "shown"}
                  >
                    ·
                  </p>
                  <p>
                    {spot.numReviews === 0 ? null : (
                      <p>
                        {spot.numReviews}
                        {""}
                        {spot.numReviews > 1 ? " Reviews" : " Review"}
                      </p>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="reserve-button">
              <button onClick={handleReserveBtnClick}>Reserve</button>
            </div>
          </div>
        </div>
        <div className="review-container">
          <div className="review-header">
            <div className="edit-star-and-rating">
              <i className="fa-solid fa-star" />
              <p>
                {spot.avgStarRating === null
                  ? "New"
                  : spot.avgStarRating % 1 === 0
                  ? spot.avgStarRating + ".0"
                  : spot.avgStarRating}
              </p>
              <p className={spot.avgStarRating === null ? "hidden" : "shown"}>
                ·
              </p>
              <p>
                {spot.numReviews === 0 ? null : (
                  <p>
                    {spot.numReviews}
                    {""}
                    {spot.numReviews > 1 ? " Reviews" : " Review"}
                  </p>
                )}
                {/* {spot.numReviews} {spot.numReviews > 1 ? "Reviews" : "Review"} */}
              </p>
            </div>

            {currentUser &&
              reviewsArr.length === 0 &&
              currentUser.id !== spot.ownerId && (
                <p className="no-review">{firstPersonToReview}</p>
              )}

            {currentUser &&
              currentUser.id !== spot.ownerId &&
              !userHasPostedReview && (
                <OpenModalButton
                  modalComponent={<PostReviewModal spotId={spotId} />}
                  buttonText="Post Your Review"
                />
              )}
          </div>

          <div className="reviews">
            {reviewsArr.map((review) => (
              <div key={review.id} className="review">
                <p>{review.User.firstName}</p>
                <p>{dateConverter(review.createdAt)}</p>
                <p>{review.review}</p>

                {userHasPostedReview ? (
                  <OpenModalButton
                    modalComponent={
                      <DeleteReviewModal reviewId={review.id} spotId={spotId} />
                    }
                    buttonText="Delete"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpotDetails;
