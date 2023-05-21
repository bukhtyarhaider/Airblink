import React from "react";
import "./FriendList.css";

export const FriendList = ({ users, onUserSelect }) => {
  return (
    <div className="_list">
      {users.map((user) => (
        <div
          className="user_item_container"
          key={user.id}
          onClick={() => onUserSelect(user)}
        >
          {user.id}
        </div>
      ))}
    </div>
  );
};
