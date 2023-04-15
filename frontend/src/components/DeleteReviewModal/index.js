import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteReview, thunkGetSpotReviews } from "../../store/reviews";
import { thunkGetSpot } from "../../store/spots";

function DeleteReviewModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async () => {
    await dispatch(thunkDeleteReview(reviewId));
    // console.log("deleted review");
    await dispatch(thunkGetSpotReviews(spotId));
    await dispatch(thunkGetSpot(spotId));
    closeModal();
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button className="delete" onClick={handleSubmit}>
        Yes (Delete Review)
      </button>
      <button className="no-delete" onClick={closeModal}>
        No (Keep Review)
      </button>
    </>
  );
}

export default DeleteReviewModal;
