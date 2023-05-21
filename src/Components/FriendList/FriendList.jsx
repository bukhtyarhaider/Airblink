import React from "react";
import avatar from "../../assets/avatar.png";
import "./FriendList.css";

export const FriendList = ({ users, onUserSelect }) => {
  return (
    <div className="friend_list">
      {users.map((user) => (
        <div
          className="user_item_container"
          key={user.id}
          onClick={() => onUserSelect(user)}
        >
          <img
            src={avatar}
            alt="User Avatar"
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
          <p>{user.id}</p>
        </div>
      ))}
    </div>
  );
};
