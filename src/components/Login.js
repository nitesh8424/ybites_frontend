import React, { useState } from "react";
import { auth,
// getMessaging,
} from "../firebase";
// import { getToken } from "firebase/messaging";
import {
  signInWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithPopup,
} from "firebase/auth";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [fcmToken, setFcmToken] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setError("please check username or password");
      });
  };

  const handleGoogleLogin = async () => {
    // try {
    //   const provider = new GoogleAuthProvider();

    //   const permission = await Notification.requestPermission();
    //   if (permission === "granted") {
    //     const vapidKey =
    //       "BGpKZ8eV9v1us7Oqy3HOPKP9Y1FT-1Z8hStGTmCgYLYLdj-8dX4kf0y4gEhk2UlFU3I-hyxNaAT4Qf7GpMkRm34";
    //     const token = await getToken(messaging, { vapidKey });
    //     setFcmToken(token);
    //   }
    //   signInWithPopup(auth, provider)
    //     .then((result) => {
    //       const credential = GoogleAuthProvider.credentialFromResult(result);
    //       const token = credential.accessToken;
    //       const user = result.user;
    //       // const email = result.user.email;
    //       // const name = result.user.name;
    //       console.log('user')
    //       // if (user) {
    //       //   axios.post(`${serverUrl}/api/register`, {
    //       //     email,
    //       //     name,
    //       //     fcmToken,
    //       //   });
    //       //   navigate("/dashboard");
    //       // }
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       const email = error.customData.email;
    //       const credential = GoogleAuthProvider.credentialFromError(error);
    //     });
    // } catch (error) {
    //   console.error("Google login error:", error);
    //   setError("Google login failed");
    // }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        <p
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            navigate("/register");
          }}
        >
          {" "}
          Register Now?{" "}
        </p>
      </form>
      <div>
        <p style={{ textAlign: "center" }}>Or</p>
        <button className="login-button" onClick={handleGoogleLogin}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
