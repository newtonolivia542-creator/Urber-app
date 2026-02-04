let map, directionsService, directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 6.3156, lng: -10.8074 }, // Monrovia
    zoom: 13
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

function calculateRoute() {
  const pickup = document.getElementById("pickup").value;
  const destination = document.getElementById("destination").value;

  directionsService.route(
    {
      origin: pickup,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);

        const distance = result.routes[0].legs[0].distance.value / 1000; // km
        const fare = distance * 2; // example: $2 per km

        document.getElementById("distance").innerText =
          "Distance: " + distance.toFixed(2) + " km";

        document.getElementById("fare").innerText =
          "Estimated Fare: $" + fare.toFixed(2);
      }
    }
  );
}

window.initMap = initMap;
