import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getFirestore,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCW-5qHRoeV0N2A17My_jEzolkI3nvd92o",
  authDomain: "airblink-assessment.firebaseapp.com",
  projectId: "airblink-assessment",
  storageBucket: "airblink-assessment.appspot.com",
  messagingSenderId: "554158840773",
  appId: "1:554158840773:web:93afae4e8759b71cb409ac",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const addUser = async (user) => {
  try {
    const userRef = await setDoc(doc(db, "Users", user.id), user);
    console.log(userRef.id);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (currentUserId) => {
  try {
    const userSnapshot = await getDocs(collection(db, "Users"));
    const usersData = [];

    userSnapshot.forEach((doc) => {
      if (currentUserId !== doc.data().id) usersData.push(doc.data());
    });

    return usersData;
  } catch (error) {
    console.log("Error getUsers:", error);
  }
};

export const sendMessage = async (senderId, receiverId, message) => {
  const newMessage = {
    senderId,
    receiverId,
    message,
    timestamp: new Date().getTime(),
  };

  try {
    const messageRef = await addDoc(collection(db, "Messages"), newMessage);
    return { ...newMessage, id: messageRef.id };
  } catch (error) {
    console.log(`Error sendMessage:${error}`);
  }
};

export const getChatMessages = async (senderId, receiverId) => {
  try {
    const messagesQuery = query(
      collection(db, "Messages"),
      where("senderId", "in", [senderId, receiverId]),
      where("receiverId", "in", [senderId, receiverId]),
      orderBy("timestamp", "asc")
    );

    const querySnapshot = await getDocs(messagesQuery);

    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return messages;
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return [];
  }
};
