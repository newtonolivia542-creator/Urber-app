// Firebase CDN imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBpYr-nlK2I5B9hYfNrzW5zsHSbcvC1OhM",
  authDomain: "urber-liberia.firebaseapp.com",
  databaseURL: "https://urber-liberia.firebaseapp.com/",
  projectId: "urber-liberia",
  storageBucket: "urber-liberia.firebasestorage.app",
  messagingSenderId: "386626435763",
  appId: "1:386626435763:web:5155dd8cc71adc3c814ec6",
  measurementId: "G-WYKKCHLCJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const analytics = getAnalytics(app);