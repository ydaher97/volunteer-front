import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Container from '@mui/material/Container';
import axios from 'axios';

mapboxgl.accessToken = import.meta.env.VITE_APP_TOKEN;

const MapPage = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(34.4117257);
  const [lat, setLat] = useState(32.0818155);
  const [zoom, setZoom] = useState(8);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('https://volunteer-backend-b6ip.onrender.com/api/opportunities'); 
        setOpportunities(response.data.opportunities);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, []);

  useEffect(() => {
    opportunities.forEach((opportunity) => {
      const popupContent = `
        <div>
          <h3>${opportunity.title}</h3>
          <p><strong>Description:</strong> ${opportunity.description}</p>
          <p><strong>Place:</strong> ${opportunity.place}</p>
          <!-- Add other fields from the opportunity object as needed -->
        </div>
      `;

      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true
      }).setHTML(popupContent);

      new mapboxgl.Marker()
        .setLngLat([opportunity.location.coordinates[0], opportunity.location.coordinates[1]])
        .setPopup(popup)
        .addTo(map.current);
    });
  }, [opportunities]);

  return (
    <div style={{ height: '100vh' }}>
      <div ref={mapContainer} className="map-container" style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default MapPage;
