import React from 'react';
import Header from '../Components/Header/Header';
import { useLocation } from 'react-router-dom';
import { MainMap } from '../Components/Map/Map';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const mapPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

export default function CustomMap() {
  const rawSearch = useLocation().search;
  const searchParams = new URLSearchParams(rawSearch);
  const history = useHistory();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <>
      <div style={mapPageStyle}>
        <Header />
        <div style={{ flex: 3 }}>
          <MainMap lat={lat} lng={lng} />
        </div>
        <Button
          onClick={() => {
            if (lat && lng) {
              history.push(`/listing?lat=${lat}&lng=${lng}`);
            } else {
              history.push('/listing');
            }
          }}
          variant="secondary"
          size="sm"
          style={{
            width: '40px',
            margin: 'auto',
            position: 'absolute',
            bottom: 5,
            left: 0,
            right: 0,
          }}
          // className=""
        >
          <i className="fas fa-list"></i>
        </Button>
      </div>
    </>
  );
}
