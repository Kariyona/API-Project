import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editBooking } from "../../store/bookings";

const EditBookingModal = ({ spotId, bookingId, booking }) => {
  const [bookings, setBookings] = useState([]);
  const [value, onChange] = useState([new Date(), new Date()]);
  const currentDate = new Date();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/spots/${spotId}/bookings`);
        const data = await response.json();
        setBookings(data.Bookings);
      } catch (error) {
      }
    };

    fetchBookings();
  }, [spotId]);

  const handleEdit = async () => {
    // Adjust the time zone offset
    const startDate = new Date(
      value[0].getTime() - value[0].getTimezoneOffset() * 60000
    );
    const endDate = new Date(
      value[1].getTime() - value[1].getTimezoneOffset() * 60000
    );

    const updatedBooking = {
      ...booking,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    await dispatch(editBooking(updatedBooking, bookingId));
    closeModal();
  };

  const isDayDisabled = ({ date }) => {
    const currentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    if (!bookings) return;

    const bookingObject = bookings.reduce((acc, booking) => {
      if (booking.id !== bookingId) {
        acc[booking.id] = booking;
        return acc;
      }
      return acc;
    }, {});


    for (const key in bookingObject) {
      const bookingStartDate = new Date(bookingObject[key].startDate);
      const bookingEndDate = new Date(bookingObject[key].endDate);


      if (currentDate >= bookingStartDate && currentDate <= bookingEndDate) {
        return true; // Disable the day
      }
    }

    return false; // Enable the day
  };

  const handleGoBack = () => {
    closeModal();
  };

  return (
    <div>
      <h2>Edit Booking</h2>
      <Calendar
        onChange={onChange}
        value={value}
        tileDisabled={isDayDisabled}
        selectRange={true}
        minDate={currentDate}
        goToRangeStartOnSelect={false}
        locale="en-EN"
      />
      <button onClick={handleGoBack}>Go Back</button>
      <button onClick={handleEdit}>Update</button>
    </div>
  );
};

export default EditBookingModal;
