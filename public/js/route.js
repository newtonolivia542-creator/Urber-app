let map;
let directionsService;
let directionsRenderer;

function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 6.3156, lng: -10.8074 },
    zoom: 13
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

// DO NOT RUN ROUTING ON LOGIN PAGE
const currentPage = window.location.pathname;

if (currentPage.includes("index.html")) {
  console.log("Login page detected — routing skipped");
} else {

  if (searchBtn) {
    searchBtn.addEventListener("click", calculateRoute);
  }
}

function calculateRoute() {

  const pickup = document.getElementById("from").value;
  const destination = document.getElementById("to").value;

  if (!pickup || !destination) {
    alert("Please enter both locations");
    return;
  }

  directionsService.route(
    {
      origin: pickup,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    },
    (result, status) => {

    if (!userSnap.exists()) {
      console.log("User profile not found");
      return;
    }

        directionsRenderer.setDirections(result);

        const distance =
          result.routes[0].legs[0].distance.value / 1000;

    // DRIVER ROUTE
    if (data.role === "driver") {

        document.getElementById("result").innerHTML =
          "Distance: " + distance.toFixed(2) + " km<br>" +
          "Estimated Fare: LD$ " + fare.toFixed(2);
      }
    }
  )
};
  
    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      directionsService.route(
        {
          origin: { query: 'Origin Address' },
          destination: { query: 'Destination Address' },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }

          // Ensure 'routes' library is loaded in your script tag:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=routes&callback=initMap"></script>

async function calculateAndDisplayRoute(map) {
  const { TravelMode } = await google.maps.importLibrary("routes");
  const { DirectionsRenderer } = await google.maps.importLibrary("maps");

  const directionsRenderer = new DirectionsRenderer({ map: map });

  try {
    const response = await google.maps.routes.Route.computeRoutes({
      origin: { query: 'Origin Address' },
      destination: { query: 'Destination Address' },
      travelMode: TravelMode.DRIVING,
      // You can add more options like waypoints, optimizeWaypoints, etc.
    });

    directionsRenderer.setDirections(response);
  } catch (error) {
    console.error('Directions request failed:', error);
    window.alert('Directions request failed. See console for details.');
  }
}

},
    
);
}

window.initMap = initMap;