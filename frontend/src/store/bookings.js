import { csrfFetch } from "./csrf";

export const GET_BOOKINGS_BY_SPOT = "bookings/GET_BOOKINGS_BY_SPOT";
export const CREATE_BOOKING = "bookings/CREATE_BOOKING";
export const DELETE_BOOKING = "bookings/DELETE_BOOKING";
export const GET_ALL_BOOKINGS_BY_USER = "bookings/GET_ALL_BOOKINGS_BY_USER";
export const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";

export const getBookingsBySpot = (bookings) => ({
  type: GET_BOOKINGS_BY_SPOT,
  bookings,
});
export const createNewBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

export const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId,
});

export const getAllBookingsByUser = (bookings) => ({
  type: GET_ALL_BOOKINGS_BY_USER,
  bookings,
});

export const updateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  booking
})

export const getAllBookingsBySpotId = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const bookings = await response.json();
    dispatch(getBookingsBySpot(bookings));
    return bookings;
  }
};

export const createBooking = (spotId, newBooking) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  });
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const booking = await response.json();
    dispatch(createNewBooking(booking));
    return booking;
  }
};

export const deleteBookingById = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    dispatch(deleteBooking(bookingId));
  }
};

// GET ALL OF THE CURRENT USER'S BOOKINGS!!
export const getBookings = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`);
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const booking = await response.json();
    dispatch(getAllBookingsByUser(booking));
    return booking;
  }
};

export const editBooking = (booking, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking)
  })
  if (!response.ok) {
    const errors = await response.json()
    return errors;
  } else {
    const booking = await response.json()
    dispatch(updateBooking(booking))
    return booking;
  }
}

const bookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BOOKINGS_BY_SPOT: {
      const bookings = {};
      action.bookings.Bookings.forEach((booking) => {
        bookings[booking.id] = booking;
      });
      return bookings;
    }
    case CREATE_BOOKING: {
      return { ...state, booking: action.booking };
    }
    case DELETE_BOOKING: {
      const newState = { ...state };
      delete newState[action.bookingId];
      return newState;
    }
    case GET_ALL_BOOKINGS_BY_USER: {
      const bookings = {};
      action.bookings.Bookings.forEach((booking) => {
        bookings[booking.id] = booking;
      });
      return bookings;
    }
    case UPDATE_BOOKING: {
      return { ...state, [action.booking.id]: action.booking}
    }
    default:
      return state;
  }
};

export default bookingsReducer;
