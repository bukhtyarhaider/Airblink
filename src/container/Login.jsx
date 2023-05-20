import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from "firebase/auth";
import "./Login.css";
import { app } from "../Firebase/Firebase";

export const Login = () => {
  const auth = getAuth(app);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const verifyCode = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (confirmationResult) {
      confirmationResult
        .confirm(verificationCode)
        .then((result) => {
          setUser(result.user);
          console.log(result.user);
          console.log(result.user.phoneNumber);
          console.log(result.user.uid);
        })
        .catch((error) => {
          setDisabled(false);
          setErrorMessage(`Code not confirmed ${error.message}`);
        });
    }
  };

  const sendVerificationCode = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setShowOtp(true);
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        setErrorMessage(`SMS not sent ${error.message}`);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {
            console.log("error");
          },
        },
        auth
      );
    }
  }, []);

  if (!!user) {
    return (
      <div className="box">
        <h1>User</h1>
        <p>{`User ID : ${user.uid}`}</p>
        <p>{`User Phone Number :${user.phoneNumber}`}</p>
      </div>
    );
  }

  return (
    <div>
      {!!errorMessage && (
        <div className="error_container">
          <p className="error"> {errorMessage}</p>
        </div>
      )}
      {!showOtp && (
        <form onSubmit={sendVerificationCode} className="box">
          <label>
            Phone Number:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <button type="submit">Send Code</button>
        </form>
      )}
      {showOtp && (
        <>
          <form onSubmit={verifyCode} className="box">
            <label>
              Verification Code:
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </label>
            <button type="submit">Verify Code</button>
            <button disabled={disabled} onClick={sendVerificationCode}>
              Resend
            </button>
          </form>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};
