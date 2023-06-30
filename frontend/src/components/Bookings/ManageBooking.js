import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getBookings } from "../../store/bookings";
import DeleteBookingModal from "./DeleteBookingModal";
import OpenModalButton from "../OpenModalButton";
import EditBookingModal from "./EditBookingModal";

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

  // const currentDate = new Date();

  const hasDateExpired = (dateString) => {
    const date = new Date(dateString);
    return date < currentDate;
  };

  return (
    <>
      <div>
        <h2>Manage Bookings</h2>

        {!!bookingsObject.length &&
          bookingsObject.map((booking) => (
            <div key={booking.id} className="booking-container">
              <div className="image-container">
                {booking.Spot && booking.Spot.previewImage && (
                  <img
                    src={booking.Spot.previewImage}
                    alt="spot-preview"
                    className="spot-preview"
                  />
                )}
              </div>
              <div className="text-container">
                {booking.Spot && (
                  <>
                    <h3>{booking.Spot.name}</h3>
                    <p className="text-location">
                      {booking.Spot.city}, {booking.Spot.state}
                    </p>
                  </>
                )}
                <p
                  className={`text-container-date ${
                    hasDateExpired(booking.endDate) ? "date-passed" : ""
                  }`}
                >
                  <span style={{ fontWeight: "bold" }}>Start Date:</span>{" "}
                  <span
                    className={
                      hasDateExpired(booking.endDate) ? "date-passed" : ""
                    }
                  >
                    {booking.startDate.substring(0, 10)}
                  </span>
                </p>
                <p
                  className={`text-container-date ${
                    hasDateExpired(booking.endDate) ? "date-passed" : ""
                  }`}
                >
                  <span style={{ fontWeight: "bold" }}>End Date:</span>{" "}
                  {booking.endDate.substring(0, 10)}
                </p>
              </div>
              <div className="buttons-group">
                <h3></h3>
                <OpenModalButton
                  giveClass="edit-button-1"
                  // modalComponent={<EditBookingModal bookingId={booking.id} />}
                  modalComponent={
                    <EditBookingModal
                      spotId={booking.spotId}
                      bookingId={booking.id}
                      booking={booking}
                    />
                  }
                  buttonText="Edit"
                />
                <OpenModalButton
                  giveClass="delete-button-1"
                  modalComponent={<DeleteBookingModal bookingId={booking.id} />}
                  buttonText="Delete"
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ManageBooking;
