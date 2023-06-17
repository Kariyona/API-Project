import { csrfFetch } from "./csrf";

export const CREATE_BOOKING = "bookings/CREATE_BOOKING"

export const createNewBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
})

export const createBooking = (spotId, newBooking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking)
    })
    if (!response.ok) {
        const errors = await response.json();
        return errors;
    } else {
        const booking = await response.json()
        dispatch(createNewBooking(booking))
        return booking;
    }
}

const bookingsReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_BOOKING: {
            return { ...state, booking: action.booking }
        }
        default:
            return state;
    }
}

export default bookingsReducer;
