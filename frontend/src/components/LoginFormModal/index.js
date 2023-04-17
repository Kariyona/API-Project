  import React, { useState, useEffect } from "react";
  import * as sessionActions from "../../store/session";
  import { useDispatch } from "react-redux";
  import { useModal } from "../../context/Modal";
  import "./LoginForm.css";

  function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const [disableBtn, setDisableBtn] = useState(false);

    const handleDemoLogin = (e) => {
      e.preventDefault();
      setErrors({});

      const demoUser = {
        credential: "Demo-lition",
        password: "password",
      };

      return dispatch(sessionActions.login(demoUser))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    };

    //disable the button if the credential is less than 4 chars and password is less than 6 chars

    useEffect(
      () =>
        credential.length < 4 || password.length < 6
          ? setDisableBtn(true)
          : setDisableBtn(false),
      [credential, password]
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});

      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    };

    return (
      <div className="login-container">
        <>
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit}>
            <div className="login-form-field">
          <label>
            Username or Email
            <div className="login-form-field"></div>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          </div>
          <div className="login-form-field">
          <label>
            Password
            <div className="login-form-field"></div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          </div>
          <div className="login-demouser-btn">
          {errors.credential && <p>{errors.credential}</p>}
          <button type="submit" className={`login-button ${disableBtn ? 'disabled' : ''}`} disabled={disableBtn}>
            Log In
          </button>
          <div className="login-form-field"></div>
          <button className="demouser-btn" onClick={handleDemoLogin}>Demo User</button>
          </div>
        </form>
        </>
      </div>
    );
  }

  export default LoginFormModal;
