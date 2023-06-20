import { csrfFetch } from "./csrf";

export const CREATE_BOOKING = "bookings/CREATE_BOOKING";
export const DELETE_BOOKING = "bookings/DELETE_BOOKING";
export const GET_ALL_BOOKINGS_BY_USER = "bookings/GET_ALL_BOOKINGS_BY_USER";

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
const bookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOOKING: {
      return { ...state, booking: action.booking };
    }
    case DELETE_BOOKING: {
      const newState = { ...state };
      delete newState[action.bookingId];
      return newState;
    }
    case GET_ALL_BOOKINGS_BY_USER: {
      const bookings = { ...state };
      action.bookings.Bookings.forEach((booking) => {
        bookings[booking.id] = booking;
      });
      return bookings;
    }
    default:
      return state;
  }
};

export default bookingsReducer;
