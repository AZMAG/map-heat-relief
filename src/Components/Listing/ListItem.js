import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

import hydrationLogo from '../../images/hydration.png';
import coolingLogo from '../../images/cooling.png';
import donationLogo from '../../images/donation.png';

import MapButtons from '../MapButtons';

const listItemPStyle = { fontSize: '11px', marginBottom: '3px' };

export default function ListItem({ item }) {
  return (
    <ListGroup.Item
      className="mb-1"
      style={{
        textAlign: 'left',
        borderRadius: '4px',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }}
    >
      <p
        style={{
          fontSize: '12px',
          fontWeight: '600',
        }}
      >
        {item.HydrationActivities === 'Cooling_Center' ? (
          <img src={coolingLogo} alt="Cooling Center" />
        ) : (
          ''
        )}
        {item.HydrationActivities === 'Hydration_Station' ? (
          <img src={hydrationLogo} alt="Hydration" />
        ) : (
          ''
        )}

        {item.Collection === 'yes' ? (
          <img src={donationLogo} alt="Donation Center" />
        ) : (
          ''
        )}

        <span>{item.PopupOrganization}</span>
        {item.distance > 0 ? (
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
        <span style={{ marginLeft: '5px' }}>{item.PopupAddress}</span>
      </p>
      <p style={listItemPStyle}>
        <i className="fas fa-door-open"></i>
        <span style={{ marginLeft: '5px' }}>{item.PopupHours}</span>
      </p>
      <p style={listItemPStyle}>
        <i className="fas fa-phone"></i>
        <span style={{ marginLeft: '5px', textDecoration: 'underline' }}>
          <a href={`tel:${item.PrimaryPhone}`}>{item.PrimaryPhone}</a>
        </span>
      </p>
      {item.Pets === 'Yes' ? (
        <p style={listItemPStyle}>
          <i className="fas fa-dog"></i> Pets Allowed
        </p>
      ) : (
        ''
      )}

      <hr className="mb-0" />
      <span style={{ fontSize: '10.5px' }}>Get Directions</span>
      <MapButtons item={item} />
    </ListGroup.Item>
  );
}
