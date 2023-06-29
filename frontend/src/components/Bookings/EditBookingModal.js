import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editBooking } from "../../store/bookings";

const EditBookingModal = ({ spotId, bookingId, booking }) => {
  const [bookings, setBookings] = useState([]);
  const [value, onChange] = useState([new Date(), new Date()]);
  const currentDate = new Date();
  const dispatch = useDispatch();
  const { closeModal } = useModal()


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/spots/${spotId}/bookings`);
        const data = await response.json();
        setBookings(data.Bookings);
        console.log("whats data: ", data);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [spotId]);

  const handleEdit = async () => {
    dispatch(editBooking(booking))
    closeModal()
  }

  const isDayDisabled = ({ date }) => {
    const currentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    console.log("where are the bookings: ", bookings);
    if (!bookings) return;

    const bookingObject = bookings.reduce((acc, booking) => {
        console.log("booking dot id and bookingId:", booking.id, bookingId)
      if (booking.id !== bookingId) {
        acc[booking.id] = booking;
        return acc;
      }
      return acc;
    }, {});

    console.log("whats our booking obj look like: ", bookingObject);

    for (const key in bookingObject) {
      const bookingStartDate = new Date(bookingObject[key].startDate);
      const bookingEndDate = new Date(bookingObject[key].endDate);

      console.log("the key of the booking: ", bookings[key]);

      if (currentDate >= bookingStartDate && currentDate <= bookingEndDate) {
        return true; // Disable the day if it's within a booked date range
      }
    }

    return false; // Enable the day if it's not within any booked date range
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
      <button onClick={handleEdit}>Update</button>
    </div>
  );
};

export default EditBookingModal;
