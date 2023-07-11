import "react-calendar/dist/Calendar.css";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./bookings.css";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, getAllBookingsBySpotId } from "../../store/bookings";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";


const Reservation = () => {
  const dispatch = useDispatch();
  const [value, onChange] = useState([new Date(), new Date()]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const currentDate = new Date();
  const { spotId } = useParams();
  const [userId, bookings] = useSelector((state) => [
    state.session.user.id,
    state.bookings,
  ]);
  const history = useHistory();



  const isDayDisabled = ({ date }) => {
    const currentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    for (const key in bookings) {
      const bookingStartDate = new Date(bookings[key].startDate);
      const bookingEndDate = new Date(bookings[key].endDate);
      if (currentDate >= bookingStartDate && currentDate <= bookingEndDate) {
        return true; // Disable the day if it's within a booked date range
      }
    }
    return false; // Enable the day if it's not within any booked date range
  };

  const handleReservation = async () => {
    // Adjust the time zone offset
    const startDate = new Date(
      value[0].getTime() - value[0].getTimezoneOffset() * 60000
    );
    const endDate = new Date(
      value[1].getTime() - value[1].getTimezoneOffset() * 60000
    );

    const newBooking = {
      spot: spotId,
      userId: userId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    const booking = await dispatch(createBooking(spotId, newBooking));
    setShowCalendar(false);
    // setSuccessMessage();
  };


  return (
    <div>
      <div>
        {showCalendar && (
          <div className="reservation">
            {value && (
              <div className="start-end-date">
                <p>
                  Start Date: {value[0].toLocaleDateString()} - End Date:{" "}
                  {value[1].toLocaleDateString()}
                </p>
                <button className="book-now-button" onClick={handleReservation}>
                  Click to reserve
                </button>
              </div>
            )}
          </div>
        )}
        {!showCalendar && (
          <div className="success-message-container">
            <div className="success-message">
              <p>Successfully booked for:</p>
              <p>
                {value[0].toLocaleDateString()} -{" "}
                {value[1].toLocaleDateString()}.
              </p>
              <p>We look forward to your stay!</p>
              <p>Click <Link to="/bookings/current">here</Link> to manage your reservations.</p>

            </div>
          </div>
        )}
        {showCalendar && (
          <Calendar
            onChange={onChange}
            value={value}
            selectRange={true}
            minDate={currentDate}
            goToRangeStartOnSelect={false}
            locale="en-EN"
            tileDisabled={isDayDisabled}
          />
        )}
      </div>
    </div>
  );
};

export default Reservation;
