import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./bookings.css";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../store/bookings";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


const Reservation = () => {
  const dispatch = useDispatch();
  const [value, onChange] = useState([new Date(), new Date()]);

  const currentDate = new Date();
  const { spotId } = useParams();
  const userId = useSelector((state) => state.session.user.id);

  console.log("user id: ", userId);
  console.log("this is start date", value[0]);
  console.log("this is end date", value[1]);

  // const isDayDisabled = (date) => {
  //   const bookings = []
  //   return bookings.some((booking) => {
  //     const startDate = new Date(booking.startDate)
  //     const endDate = new Date(booking.endDate)
  //     return date >= startDate && date <= endDate
  //   })
  // }

  const handleReservation = async () => {
    // Adjust the time zone offset
    const startDate = new Date(
      value[0].getTime() - value[0].getTimezoneOffset() * 60000
    );
    const endDate = new Date(
      value[1].getTime() - value[1].getTimezoneOffset() * 60000
    );
    console.log("start date original: ", startDate)
    console.log("end date original: ", endDate)
    const newBooking = {
      spot: spotId,
      userId: userId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    console.log("new booking dot start date: ", newBooking.startDate)
    console.log("new booking dot end date: ", newBooking.endDate)
    const booking = await dispatch(createBooking(spotId, newBooking));
    console.log("this is booking:", booking);
  };

  return (
    <div>
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
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={true}
        minDate={currentDate}
        goToRangeStartOnSelect={false}
        locale="en-EN"
        tileDisabled={isDayDisabled}
      />
    </div>
  );
};

export default Reservation;
