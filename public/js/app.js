// 1. Import initialized instances from your local setup file
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
//import { initializeApp } from "firebase/app";
//import { getAuth, onAuthStateChanged } from "firebase/auth";
import { sendPasswordResetEmail } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth, db, rtdb } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref,
  onValue
}
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


//import { getDatabase, ref, onValue } 
//from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
        window.location.href = "../html/driver-registration.html";
      } else {
        window.location.href = "../html/dashboard.html";
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

      let role = "passenger";

      if (snap.exists()) {
        role = snap.data().role;
     }

     if (role === "admin") {
      window.location.href = "../html/admin.html";
     }
      else if (role === "driver") {
        window.location.href = "../html/driver-dashboard.html";
      }
      else {
        window.location.href = "../html/dashboard.html";
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
    if (page.includes("admin.html") && role !== "admin") {
      window.location.href = "../html/dashboard.html";
    }
    if (page.includes("driver-dashboard.html") && role !== "driver") {
      window.location.href = "../html/dashboard.html";
    }
    if (page.includes("dashboard.html") && role === "driver") {
      window.location.href = "../html/driver-dashboard.html";
    }
  } catch (err) {
    console.error("Auth State Error:", err);
  }
});

//const db = getDatabase();
//const rtdb = getDatabase();
//import { rtdb } from "./firebase.js";
//const driversRef = ref(db, "drivers");
const driversRef = ref(rtdb, "drivers");

onValue(driversRef, (snapshot) => {

  const drivers = snapshot.val();

  for (let id in drivers) {

    const driver = drivers[id];

    new google.maps.Marker({
      position: {
        lat: driver.lat,
        lng: driver.lng
      },
      map: map,
      title: "Driver Available"
    });

  }

});
/*========= RIDE REQUEST ================*/

const requestRideBtn =
  document.getElementById("requestRide");

if (requestRideBtn) {

  requestRideBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    console.log("Ride request button clicked");

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    const pickup =
      document.getElementById("from").value.trim();

    const destination =
      document.getElementById("to").value.trim();

    if (!pickup || !destination) {

      alert("Enter pickup and destination");
      return;
    }

    try {

      console.log("Saving ride to Firestore...");

      const rideRef = await addDoc(
        collection(db, "rides"),
        {

          passengerId: user.uid,

          pickup: pickup,

          destination: destination,

          status: "searching",

          createdAt: serverTimestamp()

        }
      );

      console.log("Ride saved:", rideRef.id);

      alert("Ride request sent successfully!");

    } catch (error) {

      console.error("Ride Request Error:", error);

      alert(error.message);
    }
  });
}

/* ================= LOGOUT ================= */
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "../html/login.html";
  });
}
const resetBtn = document.getElementById("resetPasswordBtn");

if (resetBtn) {
  resetBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;

    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
    } catch (err) {
      alert(err.message);
    }
  });
}

/* ================= AVAILABLE DRIVERS ================= */

const driverList =
  document.getElementById("driverList");

if (driverList) {

  const q = query(
    collection(db, "users"),
    where("role", "==", "driver"),
    where("online", "==", true)
  );

  onSnapshot(q, (snapshot) => {

    driverList.innerHTML = "";

    if (snapshot.empty) {

      driverList.innerHTML =
        "<p>No drivers online.</p>";

      return;
    }

    snapshot.forEach((docSnap) => {

      const driver = docSnap.data();

      const div = document.createElement("div");

      div.classList.add("driver-card");

      div.innerHTML = `
        <h3>🚖 Driver Available</h3>

        <p>Status: 🟢 Online</p>

        <p>Driver ID: ${docSnap.id}</p>
      `;

      driverList.appendChild(div);
    });
  });
}

/* ================= ACTIVE RIDE ================= */

const resultBox =
  document.getElementById("result");

onAuthStateChanged(auth, (user) => {

  if (!user) return;

  const ridesQuery = query(
    collection(db, "rides"),
    where("passengerId", "==", user.uid)
  );

  onSnapshot(ridesQuery, async (snapshot) => {

    let activeRideFound = false;

    snapshot.forEach(async (docSnap) => {

      const ride = docSnap.data();

      // Ignore old completed rides
      if (
        ride.status === "completed" ||
        ride.status === "cancelled"
      ) {
        return;
      }

      activeRideFound = true;

      /* ===== SEARCHING ===== */

      if (ride.status === "searching") {

        resultBox.innerHTML = `

          <div class="searching-ride">

            <h2>🔎 Searching for Driver...</h2>

            <p><b>Pickup:</b>
              ${ride.pickup}
            </p>

            <p><b>Destination:</b>
              ${ride.destination}
            </p>

            <button
              onclick="cancelRide('${docSnap.id}')"
            >
              Cancel Request
            </button>

          </div>
        `;
      }

      /* ===== ACCEPTED ===== */

      else if (ride.status === "accepted") {

        trackDriver(ride.driverId);

        const driverRef =
          doc(db, "users", ride.driverId);

        const driverSnap =
          await getDoc(driverRef);

        let driverName = "Driver";

        if (driverSnap.exists()) {

          const driverData =
            driverSnap.data();

          driverName =
            driverData.fullName || "Driver";
        }

        resultBox.innerHTML = `

          <div class="accepted-ride">

            <h2>🚖 Driver Found!</h2>

            <p><b>Driver:</b>
              ${driverName}
            </p>

            <p><b>Pickup:</b>
              ${ride.pickup}
            </p>

            <p><b>Destination:</b>
              ${ride.destination}
            </p>

            <p>Status: ✅ Driver Accepted</p>

          </div>
        `;
      }
    });

    if (!activeRideFound) {

      resultBox.innerHTML = `
        <p>No active rides.</p>
      `;
    }
  });
});

/* ================= CANCEL REQUEST ================= */

window.cancelRide = async function(rideId) {

  const confirmCancel =
    confirm("Cancel this ride request?");

  if (!confirmCancel) return;

  try {

    await updateDoc(
      doc(db, "rides", rideId),
      {
        status: "cancelled"
      }
    );

    alert("Ride request cancelled");

  } catch(error) {

    console.error(error);

    alert("Failed to cancel request");
  }
};

/* ================= MAP ================= */

let map = L.map('map').setView([6.3000, -10.7969], 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(map);

/* ================= LIVE DRIVER TRACKING ================= */

let driverMarker = null;

function trackDriver(driverId) {

  const driverRef =
    ref(rtdb, "driversLocation/" + driverId);

  onValue(driverRef, (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    const position = [data.lat, data.lng];

    if (!driverMarker) {

      driverMarker = L.marker(position)
        .addTo(map)
        .bindPopup("🚖 Driver");

    } else {

      driverMarker.setLatLng(position);
    }

    map.setView(position, 15);
  });
}