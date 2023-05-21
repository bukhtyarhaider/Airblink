import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "./Login.css";
import { addUser, app } from "../Firebase/Firebase";

export const Login = () => {
  const auth = getAuth(app);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const verifyCode = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (confirmationResult) {
      confirmationResult
        .confirm(verificationCode)
        .then((result) => {
          addUser({
            id: result.user.uid,
            phoneNumber: result.user.phoneNumber,
          });
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
