import React, { useState, useEffect } from 'react';
import { Jumbotron, Spinner, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import Listing from '../Components/Listing/Listing';
import Header from '../Components/Header/Header';
import ScrollDown from '../Components/ScrollDown/ScrollDown';
import FilterButtons from '../Components/Listing/FilterButtons';
import ReactGA from 'react-ga';
import { useDataStore } from '../Stores/DataContext';
import { useNavigate } from 'react-router-dom';
import getDistanceFromLatLonInMiles from '../Stores/getDistanceFromLatLonInMiles';
import { Form } from 'react-bootstrap';

import isOpenNow from './../Stores/isOpenNow';

function ListingPage() {
  const store = useDataStore();

  ReactGA.initialize('UA-29422512-1');
  ReactGA.pageview(window.location.origin + window.location.pathname);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const [cooling, setCooling] = useState(true);
  const [hydration, setHydration] = useState(true);
  const [donation, setDonation] = useState(true);

  useEffect(() => {
    if (!store.dataLoading) {
      let data = [...store.points];
      if (store.lat && store.lng) {
        data = data.map((point) => {
          const distance = getDistanceFromLatLonInMiles(
            store.lat,
            store.lng,
            point.latitude,
            point.longitude
          );
          point.distance = distance;
          return point;
        });

        data = data.filter(({ distance }) => {
          return distance <= 5;
        });
        data.sort((a, b) => {
          return a.distance - b.distance;
        });
      }

      setItems(data);
      setFilteredItems(data);

      document.querySelectorAll('*').forEach(function (elem) {
        elem.onscroll = function (e) {
          setTimeout(() => {
            setScrolled(true);
            elem.onscroll = null;
          }, 100);
        };
      });
    }
  }, [store.dataLoading, store]);

  useEffect(() => {
    if (items) {
      const tempFilteredItems = items.filter((item) => {
        if (store.openNowChecked) {
          const open = isOpenNow(item);
          if (!open) {
            return false;
          }
        }

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
    }
  }, [cooling, hydration, donation, items, store.openNowChecked]);

  const headerLabelStyle = {
    fontSize: '16px',
    margin: 'auto',
    padding: '8px',
    textAlign: 'center',
  };

  function checkChanged() {
    store.openNowChecked = !store.openNowChecked;
  }

  return (
    <div className="listing-page">
      <Header style={{ flex: 1 }} />
      <Jumbotron className="listing-page-jumbotron">
        <FilterButtons
          setCooling={setCooling}
          setHydration={setHydration}
          setDonation={setDonation}
          cooling={cooling}
          hydration={hydration}
          donation={donation}
        />

        {store.dataLoading ? (
          <div style={{ marginTop: '40px' }}>
            <Spinner style={{ margin: 'auto' }} animation="border" />
          </div>
        ) : (
          <>
            {filteredItems.length === 0 &&
            store.lat &&
            store.lng &&
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
            <Form.Check
              style={{ marginTop: '5px' }}
              onChange={checkChanged}
              value={store.openNowChecked}
              type={'switch'}
              id={`default`}
              label={`Open Now`}
            />
            <div
              style={{ display: 'flex', alignItems: 'center', margin: '8px' }}
            >
              {filteredItems.length > 0 && store.lat && store.lng ? (
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
          if (store.lat && store.lng) {
            ReactGA.event({
              category: 'Button Click',
              action: 'Clicked Map Button',
              value: 1,
            });
            navigate(`/map?lat=${store.lat}&lng=${store.lng}`);
          } else {
            navigate(`/map`);
          }
        }}
        variant="secondary"
        size="sm"
        className="map-button"
      >
        <i className="mr-1 fas fa-map"></i> Map View
      </Button>
    </div>
  );
}

export default observer(ListingPage);
