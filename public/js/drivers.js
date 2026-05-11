import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import {
  getDatabase,
  ref,
  set,
}
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


/* ================= FIREBASE CONFIG ================= */

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
  

/* ================= INITIALIZE ================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const rtdb = getDatabase(app);

/* ================= ELEMENTS ================= */

const driverName = document.getElementById("driverName");

const toggleStatusBtn = document.getElementById("toggleStatus");

const statusText = document.getElementById("statusText");

const ridesContainer = document.getElementById("rides");

/* ================= VARIABLES ================= */

let currentDriver = null;

let isOnline = false;

/* ================= AUTH ================= */

onAuthStateChanged(auth, async (user) => {

  if (!user) {

    window.location.href = "../html/login.html";
    return;
  }

  currentDriver = user;

  const userRef = doc(db, "users", user.uid);

  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {

    alert("Driver not found");
    return;
  }

  const userData = userSnap.data();

  if (userData.role !== "driver") {

    alert("Drivers only");

    window.location.href = "../html/dashboard.html";
    return;
  }

  driverName.innerText =
    "Welcome, " + (userData.fullName || "Driver");

  isOnline = userData.online || false;

  updateStatusUI();

  loadRideRequests();
});

/*==========Signout Function========== */

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {

  try {

    await signOut(auth);

    alert("Logged out successfully");

    window.location.href = "../html/login.html";

  } catch (error) {

    console.error(error);

    alert("Logout failed");
  }
});

/* ================= STATUS BUTTON ================= */

toggleStatusBtn.addEventListener("click", async () => {

  if (!currentDriver) return;

  isOnline = !isOnline;

  await updateDoc(
    doc(db, "users", currentDriver.uid),
    {
      online: isOnline
    }
  );

  updateStatusUI();
});

/* ================= UPDATE UI ================= */

function updateStatusUI() {

  if (isOnline) {

    startLiveLocation();

    statusText.innerText = "Online";

    statusText.className = "status-online";

    toggleStatusBtn.innerText = "Go Offline";

  } else {

    statusText.innerText = "Offline";

    statusText.className = "status-offline";

    toggleStatusBtn.innerText = "Go Online";
  }
}

//========Accept Ride============//

window.acceptRide = async function(rideId) {

  await updateDoc(
    doc(db, "rides", rideId),
    {
      status: "accepted",
      driverId: currentDriver.uid
    }
  );

  alert("Ride accepted!");
};

/* ================= LOAD RIDES ================= */

function loadRideRequests() {

  onSnapshot(collection(db, "rides"), (snapshot) => {

    ridesContainer.innerHTML = "";

    let foundRide = false;

    snapshot.forEach((docSnap) => {

      const ride = docSnap.data();

      console.log("Ride received:", ride);

      //if (ride.status !== "searching") return;//
      if (
        ride.status !== "searching" &&
        ride.driverId !== currentDriver.uid
      ) {
        return;
      }

      foundRide = true;

      const div = document.createElement("div");

      div.classList.add("ride-card");

      div.innerHTML = `

        <div class="ride-card">

        <h3>🚖 Active Ride</h3>

        <p><b>Passenger:</b>
          ${ride.passengerId}
        </p>

        <p><b>Pickup:</b>
          ${ride.pickup}
        </p>

        <p><b>Destination:</b>
          ${ride.destination}
        </p>

        <p><b>Status:</b>
          ${ride.status}
        </p>

        ${
          ride.status === "searching"
        ?
        `
        <button
          onclick="acceptRide('${docSnap.id}')"
        >
          Accept Ride
        </button>
        `
        :
        `
        <button
          onclick="completeRide('${docSnap.id}')"
        >
          Complete Ride
        </button>

        <button
          onclick="cancelRide('${docSnap.id}')"
        >
        Cancel Ride
      </button>
      `
    }

  </div>
`;
      ridesContainer.appendChild(div);
    });

    if (!foundRide) {

      ridesContainer.innerHTML =
        "<p>No ride requests available.</p>";
    }
  });
}

/* ================= LIVE GPS ================= */

function startLiveLocation() {

  if (!navigator.geolocation) {

    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.watchPosition(

    async (position) => {

      const lat = position.coords.latitude;

      const lng = position.coords.longitude;

      console.log("Driver GPS:", lat, lng);

      await set(
        ref(rtdb, "driversLocation/" + currentDriver.uid),
        {
          lat: lat,
          lng: lng,
          updatedAt: Date.now()
        }
      );

    },

    (error) => {

      console.error(error);
    },

    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    }
  );
}
//=======COMPLETE RIDE ==========//
window.completeRide = async function(rideId) {

  await updateDoc(
    doc(db, "rides", rideId),
    {
      status: "completed"
    }
  );

  alert("Ride completed");
};

//=========Cancel Ride ==========//
window.cancelRide = async function(rideId) {

  await updateDoc(
    doc(db, "rides", rideId),
    {
      status: "cancelled"
    }
  );

  alert("Ride cancelled");
};