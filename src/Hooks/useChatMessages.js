import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/Firebase";
db;

export const useChatMessages = (senderId, receiverId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (senderId && receiverId) {
      const messagesQuery = query(
        collection(db, "Messages"),
        where("senderId", "in", [senderId, receiverId]),
        where("receiverId", "in", [senderId, receiverId]),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messages);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [senderId, receiverId]);

  return messages;
};
