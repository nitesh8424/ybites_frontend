import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import "firebase/messaging";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [fcmToken, setFcmToken] = useState("");

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getTokenAndSubscribe = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const vapidKey =
            "BGpKZ8eV9v1us7Oqy3HOPKP9Y1FT-1Z8hStGTmCgYLYLdj-8dX4kf0y4gEhk2UlFU3I-hyxNaAT4Qf7GpMkRm34";
          const token = await getToken(messaging, { vapidKey });
          setFcmToken(token);
          console.log("token", token);
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    getTokenAndSubscribe();
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    // if (fcmToken) {
    //   console.log("token", fcmToken);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: displayName,
          });
          axios.post(`${serverUrl}/api/register`, {
            email,
            displayName,
            fcmToken,
          });
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          console.log(errorCode, errorMessage);
        });
    // }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="registration-form" onSubmit={handleRegistration}>
        <div>
          <label>Email:</label>
          <input
            className="registration-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="registration-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            className="registration-input"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <button className="registration-button" type="submit">
          Register
        </button>
        <p
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          {" "}
          Login Now?{" "}
        </p>
      </form>
    </div>
  );
};

export default Registration;
