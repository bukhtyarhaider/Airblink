import React from "react";

import "./MessageItem.css";

export const MessageItem = ({ data, received }) => {
  const date = new Date(data.timestamp).toLocaleString();

  return (
    <div
      className={
        `message_item_container ` +
        `${received ? `received_message_container` : ``}`
      }
    >
      <div
        className={`message_item ` + `${received ? `received_message` : ``}`}
      >
        {data.message}
      </div>
      <div className="timestamp">{date}</div>
    </div>
  );
};
