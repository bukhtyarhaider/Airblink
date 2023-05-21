import React from "react";

import "./MessageItem.css";

export const MessageItem = ({ data, received }) => {
  const date = new Date(data.timestamp).toLocaleString();

  return (
    <div
      className={
        `message_item_container ` + `${received ? `received_message` : ``}`
      }
    >
      <div className={`message_item ` + `${received ? `received` : ``}`}>
        {data.message}
      </div>
      <div>{date}</div>
    </div>
  );
};
