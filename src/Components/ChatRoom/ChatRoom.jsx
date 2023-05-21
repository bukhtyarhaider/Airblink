import React, { useState, useRef, useEffect } from "react";
import "./ChatRoom.css";
import { sendMessage } from "../../firebase/Firebase";
import { MessageItem } from "../MessgeItem/MessageItem";
import { useChatMessages } from "../../Hooks/useChatMessages";

export const ChatRoom = ({ user, selectedUser }) => {
  const [message, setMessage] = useState("");
  const messages = useChatMessages(user.uid, selectedUser?.id);
  const messagesEndRef = useRef(null);

  const onSendMessage = () => {
    sendMessage(user.uid, selectedUser.id, message).finally(() => {
      setMessage("");
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="empty_chat_room">
        <p>Send and Receive messages!</p>
      </div>
    );
  }

  return (
    <div className="chat_room_container">
      <h3>{messages.length ? selectedUser.phoneNumber : "Loading..."}</h3>
      <p>{selectedUser.id}</p>
      <div className="chat_message_container">
        {messages &&
          messages.map((message) => (
            <MessageItem
              key={message.id}
              data={message}
              received={message.senderId !== user.uid}
            />
          ))}
        <div ref={messagesEndRef} />
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
