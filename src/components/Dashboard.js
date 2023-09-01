import React, { useEffect, useState } from "react";
import { auth, messaging } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/messaging";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [error, setError] = useState("");

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
            axios
              .get(`${serverUrl}/api/get-notifications`, { params: {email: user.email} })
              .then((response) => {
                setNotifications(response.data);
              })
              .catch((error) => {
                console.error("Error fetching notifications:", error);
              });
          } else {
            alert("user is logged out");
            navigate("/login");
          }
        });
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    fetchUserData();
  }, [notifications, navigate, serverUrl]);

  useEffect(() => {
    const getTokenAndSubscribe = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          alert("please allow permission for notification");
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    getTokenAndSubscribe();
  }, []);
  
  const handleLogout = () => {
    navigate("/login");
  };

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  useEffect(() => {
    const email = user?.email;
    axios.post(`${serverUrl}/api/notificationPreferences`, {
      email,
      notificationEnabled,
    });
  }, [notificationEnabled, user?.email, serverUrl]);
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Welcome to the Dashboard</h2>
      {error && <p className="dashboard-error">{error}</p>}
      {user && (
        <div className="dashboard-user">
          <p>Hello, {user.displayName ? user.displayName : user.email}</p>
          <button onClick={handleLogout} className="dashboard-logout">
            Logout
          </button>

          {/* Display notifications */}
          <div className="dashboard-notifications">
            <h3>Notifications</h3>
            <ul>
              {notifications.map((notification) => (
                <li className="notification-item" key={notification._id}>
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>

          {/* Toggle notification */}
          <div className="notification-toggle">
            <label>
              Receive Notifications:
              <input
                type="checkbox"
                checked={notificationEnabled}
                onChange={toggleNotification}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
