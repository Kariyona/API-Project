// action and reducers for reviews

import { csrfFetch } from "./csrf";

/** Action Type Constants: */

export const GET_SPOT_REVIEWS = "reviews/GET_REVIEWS";
export const CREATE_REVIEW = "reviews/CREATE_REVIEW";
export const DELETE_REVIEW = "reviews/DELETE_REVIEW";

export const actionGetSpotReviews = (reviewsPayload) => ({
    type: GET_SPOT_REVIEWS,
    reviewsPayload
})

export const actionCreateReview = (reviewPayload) => ({
    type: CREATE_REVIEW,
    reviewPayload
})


export const actionDeleteReview = (reviewIdPayload) => ({
    type: DELETE_REVIEW,
    reviewIdPayload,
})


/** Thunk Action Creators: */
export const thunkGetSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (!response.ok) {
        const errors = await response.json();
        return errors;
    } else {
        const review = await response.json()
        dispatch(actionGetSpotReviews(review))
        return review;
    }
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const errors = await response.json();
        return errors;
    } else {
        dispatch(actionDeleteReview(reviewId))
    }
}

export const thunkCreateReview = (newReview, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview)
    })
    if (!response.ok) {
        const errors = await response.json();
        return errors;
    } else {
        const review = await response.json()
        dispatch(actionCreateReview(review))
        const reviews = await dispatch(thunkGetSpotReviews(spotId))
        return reviews;
    }

}


/** Reducers */
const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            const reviewsBySpotState = {};
            action.reviewsPayload.Reviews.forEach((review) => {
                reviewsBySpotState[review.id] = review;
            })
            return reviewsBySpotState;
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.reviewIdPayload];
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
