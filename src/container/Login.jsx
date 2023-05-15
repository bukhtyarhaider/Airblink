import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "./Login.css";
import { app } from "../Firebase/Firebase";

export const Login = () => {
  const auth = getAuth(app);
  const [phoneNumber, setPhoneNumber] = useState("+923410988683");
  const [showOtp, setShowOtp] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const verifyCode = (e) => {
    e.preventDefault();
  };

  const sendVerificationCode = async (e) => {
    e.preventDefault();

    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setShowOtp(true);
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        console.log(`SMS not sent ${error.message}`);
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
            <button onClick={sendCode}>Resend</button>
          </form>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};
