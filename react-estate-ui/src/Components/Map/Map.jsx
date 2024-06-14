import React from 'react';
import { MapContainer as LeafletMapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./Map.scss";

export default function Map({ data }) {
  if (Array.isArray(data)) {
    // Center the map on the first marker's coordinates if data is an array
    const center = [data[0].latitude, data[0].longitude];

    return (
      <LeafletMapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={false} 
        className='map'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item, index) => (
          <Marker key={index} position={[item.latitude, item.longitude]}>
            <Popup>
              <strong>{item.title}</strong><br />
              {item.address}<br />
              {item.description}
            </Popup>
          </Marker>
        ))}
      </LeafletMapContainer>
    );
  } else {
    // Center the map on the single marker's coordinates if data is an object
    const center = [data.latitude, data.longitude];

    return (
      <LeafletMapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={false} 
        className='mapper'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            <strong>{data.title}</strong><br />
            {data.address}<br />
            {data.description}
          </Popup>
        </Marker>
      </LeafletMapContainer>
    );
  }
}
