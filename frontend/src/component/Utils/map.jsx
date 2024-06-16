import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiKey = import.meta.env.VITE_MAP_API_KEY;

function GoogleMap() {
  let map;
  let service;
  let infowindow;
  let searchBox;

  const { setAdd }=useContext(UserContext)

  const navigate = useNavigate();


  useEffect(() => {
    function initMap() {
      const sydney = new window.google.maps.LatLng(-33.867, 151.195);

      infowindow = new window.google.maps.InfoWindow();
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15,
      });

      const request = {
        query: "Museum of Contemporary Art Australia",
        fields: ["name", "geometry"],
      };

      service = new window.google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }

          map.setCenter(results[0].geometry.location);
        }
      });

      // Create the search box and link it to the UI element.
      const input = document.getElementById("pac-input");
      searchBox = new window.google.maps.places.SearchBox(input);
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // For each place, get the icon, name and location.
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          const icon = {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25),
          };

          // Create a marker for each place.
          new window.google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          });

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });

      // Listen for clicks on the map and fetch the location name
      map.addListener('click', (event) => {
        const latlng = event.latLng;
        new window.google.maps.Geocoder().geocode({ 'location': latlng }, function (results, status) {
          if (status === window.google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              console.log('Clicked Location:', results[0].formatted_address);
              setAdd(results[0].formatted_address)
              navigate(-1)
            } else {
              console.log('Location not found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
      });
    }

    function createMarker(place) {
      if (!place.geometry || !place.geometry.location) return;

      const marker = new window.google.maps.Marker({
        map,
        position: place.geometry.location,
      });

      window.google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
      });
    }

    if (!window.google) {
      const googleScript = document.createElement('script');
      googleScript.src = `https://maps.googleapis.com/mapshttps://mern-fullstack-72ou.onrender.com/api/js?key=${apiKey}g&callback=initAutocomplete&libraries=places&v=weekly`;
      googleScript.onload = initMap;
      document.head.appendChild(googleScript);
    } else {
      initMap();
    }
  }, []);

  return (
    <div className="mt-8" style={{ display: 'flex', justifyContent: 'center' }}>
      <input id="pac-input" className="controls text-2xl" type="text" placeholder="Search Box" style={{ width: '400px',height: '40px', border: '2px solid #ccc' }} />
      <div id="map" style={{ height: '700px', width: '100%', marginTop: '-2%' }}></div>
    </div>
  );
}
import UserContext from '../../context/userContext';

export default GoogleMap;
