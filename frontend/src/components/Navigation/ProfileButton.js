import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push(`/`);
    closeMenu();
  };

  const HandleManageSpotsClick = (e, spotId) => {
    e.preventDefault();
    history.push(`/spots/current`);
    closeMenu();
  };

  const HandleManageBookingsClick = (e, bookingId) => {
    e.preventDefault();
    history.push(`/bookings/current`);
    closeMenu();
  };

  const ulClassName = "profile-dropdown " + (showMenu ? "shown" : " hidden");

  return (
    <>
      <button className="profile-menu-btn" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>{" "}
        <i className="fas fa-user-circle" />
      </button>

        <div className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <p className="hello-user">Hello {user.firstName},</p>
              {user.email}
              <div className="line-profile-dropdown" />

              <button className="manage-btn" onClick={HandleManageSpotsClick}>Manage Spots</button>

              <button className="manage-btn" onClick={HandleManageBookingsClick}>Manage Bookings</button>

              <div className="line-profile-dropdown" />
<div className="logout-button">
              <button className="logout-btn" onClick={logout}>
                Log Out
              </button></div>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />

              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </>
          )}

      </div>
    </>
  );
}

export default ProfileButton;
