import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import axios from 'axios'; // For Nominatim API requests

mapboxgl.accessToken = 'your-mapbox-access-token'; // Replace with your actual Mapbox access token

const SimpleMap = ({ destination }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const userMarker = useRef(null);
  const directionsRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (map.current) return; // Initialize the map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [80.013, 13.012], // Default center
      zoom: 14,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.current.addControl(geolocateControl);

    geolocateControl.on('geolocate', (position) => {
      const { longitude, latitude } = position.coords;
      setCurrentLocation([longitude, latitude]);

      if (userMarker.current) {
        userMarker.current.setLngLat([longitude, latitude]);
      } else {
        userMarker.current = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      }
      map.current.setCenter([longitude, latitude]);
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    map.current.addControl(directions, 'top-left');
    directionsRef.current = directions;

    directions.on('route', (e) => {
      const route = e.route[0];
      const steps = route.legs[0].steps.map(step => step.maneuver.instruction);
      readAloud(steps);
    });

    map.current.on('error', (error) => {
      console.error('Map error:', error);
    });
  }, []);

  useEffect(() => {
    if (currentLocation && destination && directionsRef.current) {
      const directions = directionsRef.current;

      // Search for destination coordinates if it's a string query
      if (isNaN(destination[0])) {
        searchPlace(destination).then(coords => {
          if (coords) {
            directions.setOrigin(currentLocation);
            directions.setDestination(coords);
          }
        });
      } else {
        // If destination is directly a coordinate
        directions.setOrigin(currentLocation);
        directions.setDestination(destination);
      }
    }
  }, [currentLocation, destination]);

  const readAloud = (instructions) => {
    const utterance = new SpeechSynthesisUtterance(instructions.join('. '));
    window.speechSynthesis.speak(utterance);
  };

  const searchPlace = async (query) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      if (response.data.length > 0) {
        const { lon, lat } = response.data[0];
        return [parseFloat(lon), parseFloat(lat)];
      }
    } catch (error) {
      console.error('Error fetching destination coordinates:', error);
    }
    return null;
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '80vh' }} />
    </div>
  );
};

export default SimpleMap;