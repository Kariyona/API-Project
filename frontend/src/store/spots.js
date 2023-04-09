// where all the action and reducers are for spots
// need action types, action creators, thunk action creators, and reducer

import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const GET_SPOTS = "spots/GET_SPOTS";
export const GET_SPOT = "spots/GET_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const DELETE_SPOT = "spots/DELETE_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";

/** Action Creators: */
export const actionGetAllSpots = (spotsPayload) => ({
  type: GET_SPOTS,
  spotsPayload,
});

export const actionGetSpot = (spotPayload) => ({
  type: GET_SPOT,
  spotPayload,
});

export const actionUpdateSpot = (spotPayload) => ({
  type: UPDATE_SPOT,
  spotPayload,
});

export const actionDeleteSpot = (spotIdPayload) => ({
  type: DELETE_SPOT,
  spotIdPayload,
});

export const actionCreateSpot = (spotPayload) => ({
    type: CREATE_SPOT,
    spotPayload
})

/** Thunk Action Creators: */
export const thunkGetAllSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const spots = await response.json();
    dispatch(actionGetAllSpots(spots));
    return dispatch
  }
};

export const thunkGetSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const spot = await response.json();
    dispatch(actionGetSpot(spot));
    return dispatch
  }
};

export const thunkUpdateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const spot = await response.json();
    dispatch(actionUpdateSpot(spot));
    return dispatch
  }
};

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    dispatch(actionDeleteSpot(spotId));
    return
  }
};

export const thunkCreateSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
    });
    if (!response.ok) {
        const errors = await response.json();
        return errors;
    } else {
        const spot = await response.json()
        dispatch(actionGetSpot(spot));
    }
}

/** Reducers */
const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const spotsState = {};
            action.spotsPayload.Spots.forEach((spot) => {
                spotsState[spot.id] = spot;
            });
            return spotsState;
        case GET_SPOT:
            return { ...state, [action.spotPayload.id]: action.spotPayload };
        case UPDATE_SPOT:
            return { ...state, [action.spotPayload.id]: action.spotPayload };
        case DELETE_SPOT:
            const newState = { ...state };
            delete newState[action.spotId];
            return newState
        default:
            return state;
    }
};

export default spotsReducer;
// import in store index.js 
