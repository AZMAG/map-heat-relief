import React, { useState, useEffect } from 'react';
import { Jumbotron, Spinner, Button } from 'react-bootstrap';

import { getData } from '../Data/data';
import { useLocation } from 'react-router-dom';

import Listing from '../Components/Listing/Listing';
import Header from '../Components/Header/Header';
import ScrollDown from '../Components/ScrollDown/ScrollDown';
import FilterButtons from '../Components/Listing/FilterButtons';
import ReactGA from 'react-ga';

import { useNavigate } from 'react-router-dom';

export default function ListingPage() {
  ReactGA.initialize('UA-29422512-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const rawSearch = useLocation().search;
  const searchParams = new URLSearchParams(rawSearch);

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const [cooling, setCooling] = useState(true);
  const [hydration, setHydration] = useState(true);
  const [donation, setDonation] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getData({ lat, lng });
      setItems(data);
      setFilteredItems(data);
      setLoading(false);
      document.querySelectorAll('*').forEach(function (elem) {
        elem.onscroll = function (e) {
          setTimeout(() => {
            setScrolled(true);
            elem.onscroll = null;
          }, 100);
        };
      });
    })();
  }, [lat, lng]);

  useEffect(() => {
    setLoading(true);
    const tempFilteredItems = items.filter((item) => {
      if (cooling && item.HydrationActivities === 'Cooling_Center') {
        return true;
      }
      if (hydration && item.HydrationActivities === 'Hydration_Station') {
        return true;
      }
      if (donation && item.Collection === 'yes') {
        return true;
      }
      return false;
    });
    setFilteredItems(tempFilteredItems);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [cooling, hydration, donation, items]);

  const headerLabelStyle = {
    fontSize: '16px',
    margin: 'auto',
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', maxHeight: '100vh' }}
    >
      <Header style={{ flex: 1 }} />
      <Jumbotron
        style={{
          textAlign: 'center',
          overflowY: 'auto',
          paddingTop: '10px',
          marginBottom: '0px',
        }}
      >
        <FilterButtons
          setCooling={setCooling}
          setHydration={setHydration}
          setDonation={setDonation}
          cooling={cooling}
          hydration={hydration}
          donation={donation}
        />
        {loading ? (
          <div style={{ marginTop: '40px' }}>
            <Spinner style={{ margin: 'auto' }} animation="border" />
          </div>
        ) : (
          <>
            {filteredItems.length === 0 &&
            lat &&
            lng &&
            (cooling || hydration || donation) ? (
              <>
                <br />
                <p>
                  No locations found within 5 miles. Please try a different
                  location
                </p>
                <Button variant="secondary" onClick={() => navigate('/')}>
                  <i className="mr-2 fa fa-home"></i>
                  Return to home
                </Button>
              </>
            ) : (
              ''
            )}
            <div
              style={{ display: 'flex', alignItems: 'center', margin: '8px' }}
            >
              {filteredItems.length > 0 && lat && lng ? (
                <h3 style={headerLabelStyle}>
                  {filteredItems.length} locations within 5 miles
                </h3>
              ) : (
                ''
              )}
            </div>

            <Listing filteredItems={filteredItems} />
            <div
              style={{
                display: !cooling && !hydration && !donation ? 'block' : 'none',
              }}
            >
              No locations found. Select at least one of the heat relief
              category buttons above to get started.
            </div>
            {scrolled ? '' : <ScrollDown />}
          </>
        )}
      </Jumbotron>
      <Button
        onClick={() => {
          if (lat && lng) {
            ReactGA.event({
              category: 'Button Click',
              action: 'Clicked Map Button',
              value: 1,
            });
            navigate(`/map?lat=${lat}&lng=${lng}`);
          } else {
            navigate(`/map`);
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
      >
        <i className="mr-1 fas fa-map"></i> Map View
      </Button>
    </div>
  );
}
