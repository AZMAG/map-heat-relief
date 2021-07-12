import React from 'react';
import { Button } from 'react-bootstrap';
import GoogleMapsIcon from '../images/Google-Maps-Icon.svg';
import AppleMapsIcon from '../images/Apple-Maps-Icon.svg';

export default function MapButtons({ item }) {
  function openInAppleMaps(item) {
    const url = `http://maps.apple.com/?daddr=${item.PopupAddress}&dirflg=d`;
    window.open(url);
  }

  function openInGoogleMaps(item) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${item.PopupAddress}`;
    window.open(url);
  }
  return (
    <div className="mt-2">
      <Button
        onClick={() => openInGoogleMaps(item)}
        variant="outline-secondary"
        size="sm"
      >
        <img
          style={{ height: '16px', marginRight: '8px' }}
          src={GoogleMapsIcon}
          alt="Google Maps Icon"
        />
        Google Maps
      </Button>
      {/* <Button
        onClick={() => openInAppleMaps(item)}
        style={{ marginLeft: '8px' }}
        variant="outline-secondary"
        size="sm"
      >
        <img
          style={{ height: '16px', marginRight: '8px' }}
          src={AppleMapsIcon}
          alt="Apple Maps Icon"
        />
        Apple Maps
      </Button> */}
    </div>
  );
}
