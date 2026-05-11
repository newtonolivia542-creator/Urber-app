import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const usersContainer = document.getElementById("usersContainer");
const ridesContainer = document.getElementById("ridesContainer");

const totalUsers = document.getElementById("totalUsers");
const totalDrivers = document.getElementById("totalDrivers");
const onlineDrivers = document.getElementById("onlineDrivers");
const totalRides = document.getElementById("totalRides");

/* ================= AUTH CHECK ================= */
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "../html/login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) {
    alert("Access denied");
    window.location.href = "../html/dashboard.html";
    return;
  }

  const userData = snap.data();

  if (userData.role !== "admin") {
    alert("Admins only");
    window.location.href = "../html/dashboard.html";
    return;
  }

  loadUsers();
  loadRides();

});

/* ================= LOAD USERS ================= */
async function loadUsers() {

    onSnapshot(collection(db, "users"), (snapshot) => {
  
      usersContainer.innerHTML = "";
  
      let userCount = 0;
      let driverCount = 0;
      let onlineCount = 0;
  
      snapshot.forEach((docu) => {
  
        userCount++;
  
        const user = docu.data();
  
        if (user.role === "driver") {
          driverCount++;
  
          if (user.online) {
            onlineCount++;
          }
        }
  
        const div = document.createElement("div");
        div.classList.add("user-card");
  
        div.innerHTML = `
          <h3>${user.fullName || "No Name"}</h3>
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Role:</b> ${user.role}</p>
          <p><b>Status:</b> ${user.online ? "Online" : "Offline"}</p>
  
          <button class="action-btn" onclick="toggleDriver('${docu.id}', ${user.suspended || false})">
            ${user.suspended ? "Unsuspend" : "Suspend"}
          </button>
        `;
  
        usersContainer.appendChild(div);
      });
  
      totalUsers.innerText = userCount;
      totalDrivers.innerText = driverCount;
      onlineDrivers.innerText = onlineCount;
  
    });
  }

/* ================= LOAD RIDES ================= */
function loadRides() {

onSnapshot(collection(db, "rides"), (snapshot) => {

ridesContainer.innerHTML = "";

totalRides.innerText = snapshot.size;

snapshot.forEach((docu) => {

  const ride = docu.data();

  const div = document.createElement("div");
  div.classList.add("ride-card");

  div.innerHTML = `
    <h3>Ride Request</h3>

    <p><b>Passenger:</b> ${ride.passengerName || "Unknown"}</p>

    <p><b>Pickup:</b> ${ride.pickup}</p>

    <p><b>Destination:</b> ${ride.destination}</p>

    <p><b>Status:</b> ${ride.status}</p>

    <button class="action-btn" onclick="deleteRide('${docu.id}')">
      Delete Ride
    </button>
  `;

  ridesContainer.appendChild(div);
});
});
}

/* ================= SUSPEND USER ================= */
window.toggleDriver = async function(userId, suspended) {

await updateDoc(doc(db, "users", userId), {
suspended: !suspended
});

alert(suspended ? "User unsuspended" : "User suspended");
};

/* ================= DELETE RIDE ================= */
window.deleteRide = async function(rideId) {

const confirmed = confirm("Delete this ride?");

if (!confirmed) return;

await deleteDoc(doc(db, "rides", rideId));

alert("Ride deleted");
};

/* ================= LOGOUT ================= */
document.getElementById("logoutBtn").onclick = async () => {

await signOut(auth);

window.location.href = "../html/login.html";
};