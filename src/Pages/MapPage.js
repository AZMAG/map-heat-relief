import React from 'react';
import Header from '../Components/Header/Header';
import { useLocation } from 'react-router-dom';
import MainMap from '../Components/Map/Map';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';

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
      <div className="map-page">
        <Header />
        <div className="map-container">
          <MainMap lat={lat} lng={lng} />
        </div>
        <Button
          className="list-view-btn"
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
        >
          <i className=" mr-1 fas fa-list"></i> List View
        </Button>
      </div>
    </>
  );
}
