// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRd2VYUkCSuN-LgRkOE3pDqnsigjDgPdY",
  authDomain: "neumorphic-e140e.firebaseapp.com",
  projectId: "neumorphic-e140e",
  storageBucket: "neumorphic-e140e.firebasestorage.app",
  messagingSenderId: "566960957663",
  appId: "1:566960957663:web:d6526903aa65ce271da16a",
  measurementId: "G-PWXRQYBVYL"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
