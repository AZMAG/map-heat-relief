import React, { useState, useEffect } from 'react';

import { getData, getLegendImageByHydrationActivity } from '../Data/data';
import { useLocation } from 'react-router-dom';
import { ListGroup, Jumbotron, Spinner, Badge, Button } from 'react-bootstrap';
import Header from '../Components/Header/Header';
import ScrollDown from '../Components/ScrollDown/ScrollDown';
import MapButtons from '../Components/MapButtons';

export default function Listing() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const rawSearch = useLocation().search;
  const searchParams = new URLSearchParams(rawSearch);

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  useEffect(() => {
    (async () => {
      const data = await getData({ lat, lng });
      setLoading(false);
      setItems(data);
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

  const listItemPStyle = { fontSize: '11px', marginBottom: '3px' };
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', maxHeight: '100vh' }}
    >
      <Header style={{ flex: 1 }} />
      <Jumbotron style={{ textAlign: 'center', overflowY: 'auto' }}>
        {loading ? (
          <Spinner style={{ margin: 'auto' }} animation="border" />
        ) : (
          <ListGroup>
            {items.map((item) => (
              <ListGroup.Item
                style={{ textAlign: 'left', border: '1px solid gray' }}
                key={item.globalid}
              >
                <p style={{ fontSize: '12px', fontWeight: '600' }}>
                  <img src={item.image} alt={item.HydrationActivities} />
                  <span>{item.PopupOrganization}</span>
                  {item.distance < 2000 ? (
                    <Badge style={{ marginLeft: '8px' }} className="bg-success">
                      {item.distance.toFixed(1)} Miles
                    </Badge>
                  ) : (
                    ''
                  )}
                </p>
                <p style={listItemPStyle}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span style={{ marginLeft: '5px' }}>{item.PopupAddress}</span>
                </p>
                <p style={listItemPStyle}>
                  <i className="fas fa-door-open"></i>
                  <span style={{ marginLeft: '5px' }}>{item.PopupHours}</span>
                </p>
                <p style={listItemPStyle}>
                  <i className="fas fa-phone"></i>
                  <span style={{ marginLeft: '5px' }}>{item.PrimaryPhone}</span>
                </p>
                <MapButtons item={item} />
              </ListGroup.Item>
            ))}
            {scrolled ? '' : <ScrollDown />}
          </ListGroup>
        )}
      </Jumbotron>
    </div>
  );
}
