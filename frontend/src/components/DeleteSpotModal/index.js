import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteSpot } from "../../store/spots";
import "./DeleteSpotModal.css";

function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    dispatch(thunkDeleteSpot(spotId));
    closeModal();
  };

  return (

  );
}

export default DeleteSpotModal;
