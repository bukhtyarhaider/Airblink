import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { app } from "./firebase/Firebase";
import "./App.css";
import { Login } from "./container/Login";
import { Chat } from "./container/Chat/Chat";
function App() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p>Loading....</p>
      </div>
    );
  }

  return (
    <div className="container">
      {!!authUser ? <Chat user={authUser} /> : <Login />}
    </div>
  );
}

export default App;
