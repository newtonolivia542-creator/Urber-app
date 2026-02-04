// 1. Import initialized instances from your local setup file
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
//import { initializeApp } from "firebase/app";
//import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ================= REGISTER ================= */
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Save user role to Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        email: email,
        role: role
      });

      // Redirect based on role
      if (role === "driver") {
        window.location.href = "driver-registration.html";
      } else {
        window.location.href = "dashboard.html";
      }

    } catch (err) {
      console.error("Register Error:", err);
      alert(err.message);
    }
  });
}

/* ================= LOGIN ================= */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, "users", cred.user.uid));

      if (snap.exists()) {
        const role = snap.data().role;
        // Correct redirection
        if (role === "driver") {
          window.location.href = "driver-dashboard.html";
        } else {
          window.location.href = "dashboard.html";
        }
      }

    } catch (err) {
      console.error("Login Error:", err);
      alert(err.message);
    }
  });
}

/* ================= PAGE PROTECTION ================= */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Optional: Redirect to login if not authenticated and on a private page
    return;
  }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists()) return;

    const role = snap.data().role;
    const page = window.location.pathname;

    // Protection logic
    if (page.includes("driver-dashboard.html") && role !== "driver") {
      window.location.href = "dashboard.html";
    }
    if (page.includes("dashboard.html") && role === "driver") {
      window.location.href = "driver-dashboard.html";
    }
  } catch (err) {
    console.error("Auth State Error:", err);
  }
});

/* ================= LOGOUT ================= */
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}