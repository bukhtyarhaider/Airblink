import React from "react";
import avatar from "../../assets/avatar.png";
import "./Profile.css";

export const Profile = ({ user, logout }) => {
  return (
    <div className="profile_container">
      <img
        src={avatar}
        alt="User Avatar"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />

      <p>{`User ID : ${user.uid}`}</p>
      <p>{`User Phone Number :${user.phoneNumber}`}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
