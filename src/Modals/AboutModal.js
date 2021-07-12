import React from 'react';
import { Modal } from 'react-bootstrap';
import hydrationLogo from '../images/hydration.png';
import coolingLogo from '../images/cooling.png';
import donationLogo from '../images/donation.png';
import magLogo from '../images/MAG_Logo.png';

export default function AboutModal({ aboutModalShown, setAboutModalShown }) {
  function handleClose() {
    setAboutModalShown(false);
  }
  return (
    <Modal show={aboutModalShown} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>About</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '11px' }}>
        <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
          NOTE: Participating locations and hours of operation are subject to
          change at any time due to the ongoing pandemic.
        </p>

        <p>
          <img src={hydrationLogo} alt="hydration" />
          <b>Hydration Stations</b>: Locations where individuals can go to
          receive bottled water and other collected donated items. Can be
          indoors or outdoors.
        </p>

        <p>
          <img src={coolingLogo} alt="cooling" />
          <b>Cooling Centers</b>: Cooled indoor locations that provide refuge
          from the heat during the day. Drinking fountains or bottled water is
          available.
        </p>

        <p>
          <img src={donationLogo} alt="collection" />
          <b>Collection Sites</b>: Water bottles can be donated here for use at
          hydration and cooling locations. Some sites also accept other
          donations, such as cash; light colored, long-sleeved tee-shirts;
          socks; underwear; hats; lip balm; sun block; and pre-packaged snacks.
        </p>

        <p>
          Click{' '}
          <a
            style={{ textDecoration: 'underline' }}
            href="https://survey123.arcgis.com/share/79379e70837a47bb91563416efe8bcd1"
          >
            HERE
          </a>{' '}
          to sign up with the Heat Relief Network and to be added to the map.
        </p>

        <p>
          For more information about the Heat Relief Network, or to request an
          update to information displayed on the map, contact Tina Lopez with
          the Maricopa Association of Governments at{' '}
          <a style={{ textDecoration: 'underline' }} href="tel:6022546300">
            (602) 254-6300
          </a>{' '}
          or via{' '}
          <a
            style={{ textDecoration: 'underline' }}
            href="mailto:tlopez@azmag.gov"
          >
            email
          </a>
          .
        </p>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <img height="70" src={magLogo} alt="MAG Logo" />
        </div>
      </Modal.Body>
      {/* <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}
