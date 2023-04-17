import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(
    () =>
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      username.length < 4 ||
      password.length < 6
        ? setDisableBtn(true)
        : setDisableBtn(false),
    [email, username, firstName, lastName, password, confirmPassword]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="signup-container">
      <h2 className="h2-signup">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="separator">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        </div>
        {errors.email && <p>{errors.email}</p>}
        <div className="separator-1">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        </div>
        {errors.username && <p>{errors.username}</p>}
        <div className="separator">
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        </div>
        {errors.firstName && <p>{errors.firstName}</p>}
        <div className="separator-1">
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        </div>
        {errors.lastName && <p>{errors.lastName}</p>}
        <div className="separator">
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        {errors.password && <p>{errors.password}</p>}
        <div className="separator-1">
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        </div>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <div className="signup-button"><button type="submit" className={`login-button ${disableBtn ? 'disabled' : ''}`} disabled={disableBtn}>
          Sign Up
        </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
