import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGl2eWFzbSIsImEiOiJjbTAwenprMGwxa3hoMmtyMnh6ZncxZGRzIn0.b4rIdvAo-J3t3kEKV0dxWA';

const blockCoordinates = {
  'admin block': [80.00431533190311, 13.009665058794084],
  'workshop block': [80.00322498162672, 13.009260121787491],
  'idea factory': [80.00162612718572, 13.008397841958896],
  'rec cafe': [80.00247689376971, 13.008578873331643],
  'D block': [80.00235465719072, 13.008107238688794],
  'library block': [80.00557681338802, 13.008902823878998],
  'basketball court': [80.004290, 13.009000],
  'ground': [80.004540, 13.008479],
  'indoor auditorium': [80.005533, 13.00822780],
  // Add more blocks and their coordinates here
};

const SimpleMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const userMarker = useRef(null);
  const directionsRef = useRef(null); // Ref for directions control
  const [pitch, setPitch] = useState(45);
  const [bearing, setBearing] = useState(-17.6);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [startBlock, setStartBlock] = useState(''); // State for starting block
  const [endBlock, setEndBlock] = useState(''); // State for ending block

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/divyasm/cm0e1cd45002o01pk6ekye42z',
      center: [80.013, 13.012],
      zoom: 14,
      pitch: pitch,
      bearing: bearing,
      antialias: true,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true, // Enables tracking the user's location
      showUserLocation: true, // Shows the blue dot for user location
      showUserHeading: true,
    });

    map.current.addControl(geolocateControl);

    map.current.on('style.load', () => {
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      map.current.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6,
        },
      });
    });

    map.current.on('load', () => {
      geolocateControl.trigger();

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
      });

      map.current.addControl(directions, 'top-left');
      directionsRef.current = directions; // Store reference for later use

      directions.on('route', (e) => {
        const route = e.route[0];
        const steps = route.legs[0].steps.map(step => step.maneuver.instruction);
        readAloud(steps);
      });
    });

    geolocateControl.on('geolocate', (position) => {
      const { longitude, latitude } = position.coords;
      console.log('Geolocated position:', longitude, latitude); // Debugging info
      setCurrentLocation([longitude, latitude]);

      if (userMarker.current) {
        userMarker.current.setLngLat([longitude, latitude]);
      } else {
        userMarker.current = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      }
      map.current.setCenter([longitude, latitude]);

      // Set origin to current location after geolocation
      if (directionsRef.current) {
        directionsRef.current.setOrigin([longitude, latitude]);
      }
    });

    map.current.on('error', (error) => {
      console.error('Map error:', error);
    });
  }, []);

  useEffect(() => {
    if (map.current) {
      map.current.setPitch(pitch);
      map.current.setBearing(bearing);
    }
  }, [pitch, bearing]);

  useEffect(() => {
    if (currentLocation && directionsRef.current) {
      const directions = directionsRef.current;

      directions.setOrigin(currentLocation);

      if (blockCoordinates[endBlock]) {
        directions.setDestination(blockCoordinates[endBlock]);
      }
    }
  }, [currentLocation, endBlock]);

  const readAloud = (instructions) => {
    const utterance = new SpeechSynthesisUtterance(instructions.join('. '));
    window.speechSynthesis.speak(utterance);
  };

  const increasePitch = () => setPitch(prev => Math.min(prev + 5, 60));
  const decreasePitch = () => setPitch(prev => Math.max(prev - 5, 0));

  const increaseBearing = () => setBearing(prev => prev + 10);
  const decreaseBearing = () => setBearing(prev => prev - 10);

  const handleSearch = () => {
    if (blockCoordinates[startBlock] && blockCoordinates[endBlock]) {
      if (directionsRef.current) {
        directionsRef.current.setOrigin(blockCoordinates[startBlock]);
        directionsRef.current.setDestination(blockCoordinates[endBlock]);
      }
    } else {
      console.error('Invalid block names.');
    }
  };

  return (
    <div style={styles.container}>
      <div ref={mapContainer} style={styles.mapContainer} />
      <div style={styles.controls}>
        <div style={styles.controlGroup}>
          <label style={styles.label}>Pitch: {pitch}°</label>
          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={decreasePitch}>-</button>
            <button style={styles.button} onClick={increasePitch}>+</button>
          </div>
        </div>
        <div style={styles.controlGroup}>
          <label style={styles.label}>Bearing: {bearing}°</label>
          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={decreaseBearing}>-</button>
            <button style={styles.button} onClick={increaseBearing}>+</button>
          </div>
        </div>
        <div style={styles.controlGroup}>
          <input
            type="text"
            placeholder="Start Block"
            value={startBlock}
            onChange={(e) => setStartBlock(e.target.value.trim().toLowerCase())}
            style={styles.searchInput}
          />
          <input
            type="text"
            placeholder="End Block"
            value={endBlock}
            onChange={(e) => setEndBlock(e.target.value.trim().toLowerCase())}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>Search Path</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
  },
  mapContainer: {
    width: '100%',
    height: '80vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '20px 0',
  },
  controls: {
    width: '80%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  controlGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    flex: '1',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  buttonGroup: {
    display: 'flex',
    gap: '5px',
  },
  button: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  searchInput: {
    flex: '1',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
  },
  searchButton: {
    flex: '0 0 auto',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default SimpleMap;
