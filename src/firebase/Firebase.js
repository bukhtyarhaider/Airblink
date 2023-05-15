import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCW-5qHRoeV0N2A17My_jEzolkI3nvd92o",
  authDomain: "airblink-assessment.firebaseapp.com",
  projectId: "airblink-assessment",
  storageBucket: "airblink-assessment.appspot.com",
  messagingSenderId: "554158840773",
  appId: "1:554158840773:web:93afae4e8759b71cb409ac",
};

export const app = initializeApp(firebaseConfig);
