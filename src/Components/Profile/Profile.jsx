import React from "react";

import "./Profile.css";

export const Profile = ({ user, logout }) => {
  return (
    <div className="profile_container">
      <h1>User</h1>
      <p>{`User ID : ${user.uid}`}</p>
      <p>{`User Phone Number :${user.phoneNumber}`}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
};
