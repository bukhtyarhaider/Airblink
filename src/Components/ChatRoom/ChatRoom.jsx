import React, { useState } from "react";
import "./ChatRoom.css";
import { sendMessage } from "../../firebase/Firebase";
import { MessageItem } from "../MessgeItem/MessageItem";
import { useChatMessages } from "../../Hooks/useChatMessages";

export const ChatRoom = ({ user, selectedUser }) => {
  const [message, setMessage] = useState("");
  const messages = useChatMessages(user.uid, selectedUser?.id);

  const onSendMessage = () => {
    sendMessage(user.uid, selectedUser.id, message).finally(() => {
      setMessage("");
    });
  };

  if (!selectedUser) {
    return (
      <div className="empty_chat_room">
        <p>No User Yet!</p>
      </div>
    );
  }

  return (
    <div className="chat_room_container">
      <h3>{messages.length ? selectedUser.phoneNumber : "Loading..."}</h3>
      <div className="chat_message_container">
        {messages &&
          messages.map((message) => (
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
