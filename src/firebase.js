// firebase.js

import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBaDS9abZM0www01PlQ_s1wOOsaVBLckQ4",
  authDomain: "task-9818f.firebaseapp.com",
  projectId: "task-9818f",
  storageBucket: "task-9818f.appspot.com",
  messagingSenderId: "211548274908",
  appId: "1:211548274908:web:6b3dcdce41122b6bc67419",
  measurementId: "G-TLJ3HN8NQ5",
};


const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app);

export const auth = getAuth(app);
export default app;
