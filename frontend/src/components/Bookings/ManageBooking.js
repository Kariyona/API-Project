import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllBookingsByUser, getBookings } from "../../store/bookings";
import SpotIndexItem from "../Spots/SpotIndexItem";

const ManageBooking = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  const bookings = useSelector((state) => state.bookings);
  const bookingsObject = Object.values(bookings || {});
  console.log("bookings object for manage bookings: ", bookingsObject);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  return (
    <>
      <div>
        <h2>Manage Bookings</h2>

        {bookingsObject.map((booking) => (
          <div key={booking.id} className="booking-container">
            <div className="image-container">
              <img
                src={booking.Spot.previewImage}
                alt="spot-preview"
                className="spot-preview"
              />
            </div>
            <div className="text-container">
              <h3>{booking.Spot.name}</h3>
              <p>
                {booking.Spot.city}, {booking.Spot.state}
              </p>
              <p>${booking.Spot.price}</p>
              <p>Start Date: {booking.startDate}</p>
              <p>End Date: {booking.endDate}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageBooking;
