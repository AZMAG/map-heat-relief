import React, { useState, useEffect } from 'react';

import { getData } from '../Data/data';
import { useLocation } from 'react-router-dom';
import { ListGroup, Jumbotron, Spinner, Badge, Button } from 'react-bootstrap';
import Header from '../Components/Header/Header';
import ScrollDown from '../Components/ScrollDown/ScrollDown';
import MapButtons from '../Components/MapButtons';
import FilterButtons from '../Components/FilterButtons';

import { useHistory } from 'react-router-dom';

export default function Listing() {
  const history = useHistory();
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
    console.log(items);
    const tempFilteredItems = items.filter((item) => {
      if (cooling && item.HydrationActivities === 'Cooling_Center') {
        return true;
      }
      if (hydration && item.HydrationActivities === 'Hydration_Station') {
        return true;
      }
      if (donation && item.Collection === 'Yes') {
        return true;
      }
      return false;
    });
    setFilteredItems(tempFilteredItems);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [cooling, hydration, donation, items]);

  const listItemPStyle = { fontSize: '11px', marginBottom: '3px' };
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', maxHeight: '100vh' }}
    >
      <Header style={{ flex: 1 }} />
      {/* <Filters filtersShown={filtersShown} setFiltersShown={setFiltersShown} /> */}
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
          <div>
            <Spinner style={{ margin: 'auto' }} animation="border" />
          </div>
        ) : (
          <>
            <div
              style={{ display: 'flex', alignItems: 'center', margin: '8px' }}
            >
              {filteredItems.length > 0 ? (
                <h3
                  style={{
                    fontSize: '16px',
                    margin: 'auto',
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  {filteredItems.length} locations within 5 miles
                </h3>
              ) : (
                ''
              )}
            </div>
            <ListGroup>
              {filteredItems.map((item) => (
                <ListGroup.Item
                  className="mb-1"
                  style={{
                    textAlign: 'left',
                    // border: '1px solid gray',
                    borderRadius: '4px',
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                  }}
                  key={item.globalid}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    <img src={item.image} alt={item.HydrationActivities} />
                    <span>{item.PopupOrganization}</span>
                    {item.distance < 2000 ? (
                      <Badge
                        size="lg"
                        style={{ marginLeft: '8px', color: 'white' }}
                        className="bg-success"
                      >
                        {item.distance.toFixed(1)} Miles
                      </Badge>
                    ) : (
                      ''
                    )}
                  </p>
                  <p style={listItemPStyle}>
                    <i className="fas fa-map-marker-alt"></i>
                    <span style={{ marginLeft: '5px' }}>
                      {item.PopupAddress}
                    </span>
                  </p>
                  <p style={listItemPStyle}>
                    <i className="fas fa-door-open"></i>
                    <span style={{ marginLeft: '5px' }}>{item.PopupHours}</span>
                  </p>
                  <p style={listItemPStyle}>
                    <i className="fas fa-phone"></i>
                    <span
                      style={{ marginLeft: '5px', textDecoration: 'underline' }}
                    >
                      <a href={`tel:${item.PrimaryPhone}`}>
                        {item.PrimaryPhone}
                      </a>
                    </span>
                  </p>
                  <hr className="mb-0" />
                  <span style={{ fontSize: '10.5px' }}>Get Directions</span>
                  <MapButtons item={item} />
                </ListGroup.Item>
              ))}
              {scrolled ? '' : <ScrollDown />}
            </ListGroup>
          </>
        )}
      </Jumbotron>
      <Button
        onClick={() => {
          history.push(`/map?lat=${lat}&lng=${lng}`);
        }}
        variant="secondary"
        size="sm"
        style={{
          margin: 'auto',
          position: 'absolute',
          bottom: 5,
          left: 0,
          right: 0,
        }}
        // className=""
      >
        <i className="fas fa-map"></i>
      </Button>
    </div>
  );
}
