import React, { useState } from "react";
import "./Login.css";

export const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const verifyCode = () => {};

  const sendCode = () => {
    setShowOtp(true);
  };

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
    </div>
  );
};
