// where all the action and reducers are for spots
// need action types, action creators, thunk action creators, and reducer

import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const GET_SPOTS = "spots/GET_SPOTS";
export const GET_SPOT = "spots/GET_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const DELETE_SPOT = "spots/DELETE_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";
export const GET_ALL_SPOTS_BY_USER = "spots/GET_ALL_SPOTS_BY_USER";
export const CREATE_IMAGE = "spots/CREATE_IMAGE";

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
  spotPayload,
});

export const actionGetAllSpotsByUser = (spotsPayload) => ({
  type: GET_ALL_SPOTS_BY_USER,
  spotsPayload,
});

export const actionCreateImage = (imagePayload) => ({
  type: CREATE_IMAGE,
  imagePayload,
});

/** Thunk Action Creators: */
export const thunkGetAllSpots = () => async (dispatch) => {
  console.log("thunkGetAllSpots start");
  const response = await csrfFetch(`/api/spots`);
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const spots = await response.json();
    console.log("thunkGetAllSpots dispatching actionGetAllSpots");
    dispatch(actionGetAllSpots(spots));
    return dispatch;
  }
};

export const thunkGetSpot = (spotId) => async (dispatch) => {
  console.log("thunkGetSpot start");
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const spot = await response.json();
    console.log("thunkGetSpot dispatching actionGetSpot");
    dispatch(actionGetSpot(spot));
    return dispatch;
  }
};

export const thunkUpdateSpot = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
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
    return dispatch;
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
    // return;
  }
};

export const thunkCreateSpot = (newSpot, imageArr) => async (dispatch) => {
  console.log(
    "thunk create spot running. this is new spot: ",
    newSpot,
    "this is imageArray: ",
    imageArr
  );
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSpot),
  });
  if (!response.ok) {
    const errors = await response.json();
    console.log("response is not okay. this is errors: ", errors);
    return errors;
  } else {
    const spot = await response.json();

    console.log("else this is created spot: ", spot);
    // loop through imageArr

    // i have a spot object
    // i need the key SpotImages
    // SpotImages holds an array of image objects
    // those objects have id and url and preview info
    let finalImageArr = [];
    for (let i = 0; i < imageArr.length; i++) {
      console.log("this is image array at thunk at i: ", imageArr[i]);
      const imageRes = await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageArr[i]),
      });
      const createdImage = await imageRes.json();
      console.log(
        "image creation for loop running, this is created image: ",
        createdImage
      );
      finalImageArr.push(imageRes);
    }
    spot.SpotImages = finalImageArr;
    console.log("final spot object before we put in reducer: ", spot);
    dispatch(actionCreateSpot(spot));
    return spot;
  }
};

export const thunkGetAllSpotsByUser = () => async (dispatch) => {
  console.log("thunkGetAllSpotsByUser called");
  const response = await csrfFetch(`/api/spots/current`);
  console.log("response", response);
  if (!response.ok) {
    const errors = await response.json();
    console.log("Error occurred:", errors);
    return errors;
  } else {
    const spot = await response.json();
    console.log("Dispatching actionGetAllSpotsByUser with payload:", spot);
    dispatch(actionGetAllSpotsByUser(spot));
    console.log("dispatched actionGetAllSpotsByUser");
    return dispatch;
  }
};

// export const thunkCreateImage = (newImage, spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}/images`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(newImage)
//   })
//   if (!response.ok) {
//     const errors = await response.json();
//     return errors;
//   } else {
//     const image = await response.json()
//     dispatch(actionCreateImage(image))
//     return dispatch
//   }
// }

/** Reducers */
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SPOTS: {
      const spotsState = {};
      action.spotsPayload.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }
    case GET_SPOT: {
      return { ...state, [action.spotPayload.id]: action.spotPayload };
    }
    case UPDATE_SPOT: {
      return { ...state, [action.spotPayload.id]: action.spotPayload };
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotIdPayload];
      return newState;
    }
    case GET_ALL_SPOTS_BY_USER:
      const spotsByUserState = {};
      action.spotsPayload.Spots.forEach((spot) => {
        spotsByUserState[spot.id] = spot;
      });
      return spotsByUserState;
    default:
      return state;
  }
};

export default spotsReducer;
// import in store index.js
