import React from 'react';
import Header from '../Components/Header/Header';
import { useLocation } from 'react-router-dom';
import { MainMap } from '../Components/Map/Map';

const mapPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

export default function CustomMap() {
  const rawSearch = useLocation().search;
  const searchParams = new URLSearchParams(rawSearch);

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <>
      <div style={mapPageStyle}>
        <Header />
        <div style={{ flex: 3 }}>
          <MainMap />
        </div>
      </div>
    </>
  );
}
