import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../aeriebnb-logo.png"
import icon from "../../aeriebnb-icon.png"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("is LOADED?????: ", isLoaded);
  return (
    <>
    <div className="NavBar">
      <div className="leftNav">
        <ul>
          <NavLink className="navlink" exact to="/">
            <img className="icon" src={icon} />
            <img className="logo" src={logo} />
          </NavLink>
        </ul>
      </div>
      <div className="rightNav">
        {sessionUser && (
          <NavLink to="/spots/new">
            <div><button className="create-spot-btn">Create a New Spot</button></div>
          </NavLink>
        )}
        <ul>{isLoaded && <ProfileButton user={sessionUser} />}</ul>
      </div>
    </div>
    <div className="line"></div>
</>
  );
}

export default Navigation;
