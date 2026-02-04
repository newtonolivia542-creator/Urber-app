// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
//import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
//import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
//import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

//import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBpYr-nlK2I5B9hYfNrzW5zsHSbcvC1OhM",
  authDomain: "urber-liberia.firebaseapp.com",
  projectId: "urber-liberia",
  storageBucket: "urber-liberia.firebasestorage.app",
  messagingSenderId: "386626435763",
  appId: "1:386626435763:web:5155dd8cc71adc3c814ec6",
  measurementId: "G-WYKKCHLCJ0"
};

const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);
//const db = getFirestore(app);


//export { auth, db };
// Initialize Firebase
//const app = initializeApp(firebaseConfig);

// EXPORT these so app.js can see them
//export const auth = getAuth(app);
//export const db = getFirestore(app);
//export const analytics = getAnalytics(app);