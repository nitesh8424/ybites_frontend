importScripts("https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.3/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBaDS9abZM0www01PlQ_s1wOOsaVBLckQ4",
  authDomain: "task-9818f.firebaseapp.com",
  projectId: "task-9818f",
  storageBucket: "task-9818f.appspot.com",
  messagingSenderId: "211548274908",
  appId: "1:211548274908:web:6b3dcdce41122b6bc67419",
  measurementId: "G-TLJ3HN8NQ5",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }
  self.registration
    .showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/pwa/icon-512x512.png",
      badge: "/favicon.ico",
      tag: "renotify",
      renotify: true,
      //actions: [{action: 'google', url: "https://www.google.fr"}]
    })
    .then(() => self.registration.getNotifications())
    .then((notifications) => {
      setTimeout(
        () => notifications.forEach((notification) => notification.close()),
        3000
      );
    });
});
