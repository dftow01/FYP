// src/integrations/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGYfRlASMQMKwHtd5K2w-jh5i8Vm7xoTM",
  authDomain: "disease-outbreak-tft-data.firebaseapp.com",
  projectId: "disease-outbreak-tft-data",
  storageBucket: "disease-outbreak-tft-data.appspot.com", // <-- FIXED
  messagingSenderId: "126304939449",
  appId: "1:126304939449:web:60605c6609c8786c729a68",
  measurementId: "G-S76J3DCEEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };