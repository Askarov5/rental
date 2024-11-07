'use client'

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { getCoordinates } from '@/utils/map';

const LeafletMap = ({address, center, zoom = 15}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      let lat, lon;

      // If center is provided, use it, otherwise fetch the coordinates for the address
      if (center && center.lat && center.lon) {
        lat = center.lat;
        lon = center.lon;
      } else if (address) {
        try {
          // Fetch coordinates for the provided address
          const coordinates = await getCoordinates(address);
          lat = coordinates.lat;
          lon = coordinates.lon;
        } catch (error) {
          console.error("Error fetching coordinates:", error);
          return;
        }
      } else {
        console.error("No center or address provided");
        return;
      }

      if (!mapRef.current) {
        // Initialize map if it hasn't been created
        mapRef.current = L.map('map').setView([lat, lon], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);

        L.marker([lat, lon]).addTo(mapRef.current)
          .bindPopup(`${address || 'Custom Location'}`)
          .openPopup();
      } else {
        // Update map center and zoom level
        mapRef.current.setView([lat, lon], zoom);
      }
    };

    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [address, center, zoom]);

  return (
    <div id="map" style={{ height: '500px', width: '100%' }} />
  );
};

export default LeafletMap;
