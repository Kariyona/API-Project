import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteBookingById } from "../../store/bookings";

function DeleteBookingModal({ bookingId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    dispatch(deleteBookingById(bookingId))
    closeModal();
  };

  return (
    <div className="confirm-delete-box">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to cancel your reservation?</p>
      <div className="button-class">
        <button className="delete" onClick={handleDelete}>
          Yes (Delete Reservation)
        </button>
        <button className="no-delete" onClick={closeModal}>
          No (Keep Reservation)
        </button>
      </div>
    </div>
  );
}

export default DeleteBookingModal;
