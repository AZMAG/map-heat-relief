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

function ListingPage() {
  const store = useDataStore();

  ReactGA.initialize('UA-29422512-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const [cooling, setCooling] = useState(true);
  const [hydration, setHydration] = useState(true);
  const [donation, setDonation] = useState(true);

  useEffect(() => {
    if (!store.dataLoading) {
      (async () => {
        let data = store.points;
        data = data.filter(({ distance }) => distance <= 5);
        data.sort((a, b) => a.distance - b.distance);

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
      })();
    }
  }, [store.dataLoading, store]);

  useEffect(() => {
    if (items) {
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
    }
  }, [cooling, hydration, donation, items]);

  const headerLabelStyle = {
    fontSize: '16px',
    margin: 'auto',
    padding: '8px',
    textAlign: 'center',
  };

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
