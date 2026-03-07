import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ridesDiv = document.getElementById("rides");
const statusBtn = document.getElementById("toggleStatus");

let driverId = null;
let isOnline = false;

// check login
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  driverId = user.uid;

  const driverSnap = await getDoc(doc(db, "users", driverId));
  document.getElementById("driverName").innerText =
    "Welcome, " + driverSnap.data().fullName;

  listenForRides();
});

// toggle online/offline
statusBtn.onclick = async () => {
  isOnline = !isOnline;
  statusBtn.innerText = isOnline ? "Go Offline" : "Go Online";

  await updateDoc(doc(db, "users", driverId), {
    online: isOnline
  });
};

function startLocationUpdates() {

  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    return;
  }

  navigator.geolocation.watchPosition(async (position) => {

    if (!isOnline) return; 

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    await updateDoc(doc(db, "users", driverId), {
      location: {
        lat: lat,
        lng: lng
      }
    });

  }, (error) => {
    console.log("Location error:", error);
  }, {
    enableHighAccuracy: true
  });

}

// listen for passenger rides
function listenForRides() {
  const q = query(
    collection(db, "rides"),
    where("status", "==", "pending")
  );

  onSnapshot(q, (snapshot) => {
    ridesDiv.innerHTML = "";

    snapshot.forEach((docu) => {
      const ride = docu.data();

      const div = document.createElement("div");
      div.style.border = "1px solid black";
      div.style.padding = "10px";
      div.style.margin = "10px";

      div.innerHTML = `
        <p><b>Passenger:</b> ${ride.passengerName}</p>
        <p><b>Pickup:</b> ${ride.pickup}</p>
        <p><b>Destination:</b> ${ride.destination}</p>
        <p><b>Distance:</b> ${ride.distance} km</p>
        <p><b>Fare:</b> $${ride.fare}</p>
        <button onclick="acceptRide('${docu.id}')">Accept</button>
      `;

      ridesDiv.appendChild(div);
    });
  });
}

// accept ride
window.acceptRide = async function (rideId) {
  await updateDoc(doc(db, "rides", rideId), {
    status: "accepted",
    driverId: driverId
  });

  alert("Ride accepted!");
};
