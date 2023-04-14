import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteSpot } from "../../store/spots";

function DeleteSpotModal({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        dispatch(thunkDeleteSpot(spotId));
        closeModal();
    }

    return (
        <>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remve this spot?</p>
        <button onClick={handleDelete}>Yes (Delete Spot)</button>
        <button onClick={closeModal}>No (Keep Spot)</button>
        </>
    )
}

export default DeleteSpotModal
