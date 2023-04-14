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

// export const actionCreateReview = () => ({
//     type: CREATE_REVIEW
// })

// export const actionGetReviews = () => ({
//     type: GET_REVIEWS
// })

// export const actionDeleteReview = () => ({
//     type: DELETE_REVIEW
// })


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

// export const thunkCreateReview = () => async (dispatch) => {

// }


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
        default:
            return state;
    }
}

export default reviewsReducer;
