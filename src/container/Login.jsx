import React, { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import "./Login.css";
import { app } from "../Firebase/Firebase";

export const Login = () => {
  const auth = getAuth(app);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const verifyCode = (e) => {
    e.preventDefault();
  };

  const sendCode = async (e) => {
    e.preventDefault();
    setShowOtp(true);
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
        <form onSubmit={sendCode} className="box">
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
