import { useEffect, useRef } from "react"
import { getBrowserLocation } from "../services/browserLocation"

export function Map({trail, browserLocation}){
    useEffect(() => {
        initMap();
    },[])
    const ref = useRef(null)

    function initMap() {
        console.log("Map created")
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(ref.current, {
          zoom: 7,
          center: { lat: 47.465266, lng: 9.0415478 },
        });
      
        directionsRenderer.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsRenderer)
      }
      
      function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        directionsService
          .route({
            origin: new google.maps.LatLng(browserLocation.coords.latitude,browserLocation.coords.longitude),
            destination: {
              query: trail.city,
            },
            travelMode: google.maps.TravelMode.BICYCLING,
          })
          .then((response) => {
            directionsRenderer.setDirections(response);
          })
          .catch((e) => window.alert("Directions request failed due to " + status));
      }

    return(
        <>
            <div ref={ref} id='map'></div>
        </>
    )
}