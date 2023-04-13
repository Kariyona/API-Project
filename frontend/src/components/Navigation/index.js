import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="NavBar">
      <div className="leftNav">
        <ul>
          <NavLink exact to="/">
            Home
          </NavLink>
        </ul>
      </div>
      <div className="rightNav">
        {sessionUser && (
          <NavLink to="/spots/new">
            <div className="create-spot-btn"><button>Create a New Spot</button></div>
          </NavLink>
        )}
        <ul>{isLoaded && <ProfileButton user={sessionUser} />}</ul>
      </div>
    </div>
  );
}

export default Navigation;
