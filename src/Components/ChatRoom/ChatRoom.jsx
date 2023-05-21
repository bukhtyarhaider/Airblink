import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import { sendMessage, getChatMessages } from "../../firebase/Firebase";
import { MessageItem } from "../MessgeItem/MessageItem";

export const ChatRoom = ({ user, selectedUser }) => {
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState([]);

  const onSendMessage = () => {
    sendMessage(user.uid, selectedUser.id, message)
      .then((response) => {
        setChatMessage([...chatMessage, response]);
      })
      .finally(() => {
        setMessage("");
      });
  };

  useEffect(() => {
    if (selectedUser) {
      getChatMessages(user.uid, selectedUser.id).then((Response) => {
        return setChatMessage(Response);
      });
    }
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <div className="empty_chat_room">
        <p>No User Yet!</p>
      </div>
    );
  }

  return (
    <div className="chat_room_container">
      <h3>{chatMessage.length ? selectedUser.phoneNumber : "Loading..."}</h3>
      <div className="chat_message_container">
        {chatMessage &&
          chatMessage.map((message) => (
            <MessageItem
              key={message.id}
              data={message}
              received={message.senderId !== user.uid}
            />
          ))}
      </div>
      <div className="message_input_container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%" }}
        />
        <button onClick={onSendMessage}>send</button>
      </div>
    </div>
  );
};
