import React from 'react';
import Header from '../Components/Header/Header';
import { useLocation } from 'react-router-dom';
import { MainMap } from '../Components/Map/Map';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';

const mapPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(90vh - 30px)',
};

export default function CustomMap() {
  ReactGA.initialize('UA-29422512-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  const rawSearch = useLocation().search;
  const searchParams = new URLSearchParams(rawSearch);
  const navigate = useNavigate();

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
              ReactGA.event({
                category: 'Button Click',
                action: 'Clicked Listing Button',
                value: 1,
              });
              navigate(`/listing?lat=${lat}&lng=${lng}`);
            } else {
              navigate('/listing');
            }
          }}
          variant="secondary"
          size="sm"
          style={{
            width: '130px',
            margin: 'auto',
            position: 'absolute',
            bottom: 5,
            left: 0,
            right: 0,
          }}
          // className=""
        >
          <i className=" mr-1 fas fa-list"></i> List View
        </Button>
      </div>
    </>
  );
}
