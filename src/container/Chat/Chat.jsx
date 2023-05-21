import { signOut, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { app, getUsers } from "../../firebase/Firebase";
import { Profile } from "../../Components/Profile/Profile";

import "./Chat.css";
import { FriendList } from "../../Components/FriendList/FriendList";
import { ChatRoom } from "../../Components/ChatRoom/ChatRoom";

export const Chat = ({ user }) => {
  const auth = getAuth(app);
  const [users, setUsers] = useState([{ id: "loading..." }]);
  const [activeUser, setActiveUser] = useState(null);

  const handleUserSelect = (user) => {
    setActiveUser(user);
  };

  const onLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  useEffect(() => {
    getUsers(user.uid).then((Response) => {
      return setUsers(Response);
    });
  }, [user]);

  return (
    <div className="chat_container">
      <div className="chat_left_container">
        <h3>ChatBox</h3>
        <Profile user={user} logout={onLogout} />
        <FriendList
          users={users}
          selectedUser={activeUser}
          onUserSelect={handleUserSelect}
        />
      </div>
      <div className="chat_right_container">
        <ChatRoom user={user} selectedUser={activeUser} />
      </div>
    </div>
  );
};
