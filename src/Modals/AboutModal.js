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
          <img src={coolingLogo} alt="cooling" />
          <b>Cooling Centers</b>: Cooled indoor locations that provide refuge
          from the heat during the day. Drinking fountains or bottled water is
          available.
        </p>

        <p>
          <img src={hydrationLogo} alt="hydration" />
          <b>Hydration Stations</b>: Locations where individuals can go to
          receive bottled water and other collected donated items. Can be
          indoors or outdoors.
        </p>

        <p>
          <img src={donationLogo} alt="collection" />
          <b>Collection Sites</b>: Water bottles can be donated here for use at
          hydration and cooling locations. Some sites also accept other
          donations, such as cash; light colored, long-sleeved tee-shirts;
          socks; underwear; hats; lip balm; sun block; and pre-packaged snacks.
        </p>

        <p
          style={{
            fontStyle: 'italic',
            fontSize: '10px',
            fontWeight: '500',
          }}
        >
          The Heat Relief Network is a regional partnership of the Maricopa
          Association of Governments (MAG), municipalities, nonprofit
          organizations, the faith-based community, and businesses. Each year,
          MAG coordinates the mapping of the Heat Relief Network, a network of
          partners providing cooling centers, hydration stations, and water
          donation sites throughout the Valley with the goal of preventing
          heat-related illnesses and deaths among vulnerable populations.
        </p>

        <p></p>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img className="mr-4" height="70" src={magLogo} alt="MAG Logo" />
          <div>
            For more information about the Heat Relief Network, call{' '}
            <a style={{ textDecoration: 'underline' }} href="tel:6022546300">
              (602) 254-6300
            </a>{' '}
            or{' '}
            <a
              style={{ textDecoration: 'underline' }}
              href="mailto:hsinfo@azmag.gov"
            >
              email
            </a>
          </div>
        </div>
        <br />
        <p
          style={{
            fontStyle: 'italic',
            fontSize: '10px',
            fontWeight: '500',
          }}
        >
          In providing the content of this website for the Heat Relief Network,
          the Maricopa Association of Governments (MAG) has gathered substantial
          information from a variety of sources. MAG cannot vouch for the
          authenticity or accuracy of all such sources and information provided
          may be subject to change as well. For those reasons, users of this
          website should independently verify, as needed, information provided
          herein. To the extent that any individual has a medical emergency in
          regard to heat-related issues, they should contact their doctor or
          call 9-1-1 immediately.
        </p>
      </Modal.Body>
      {/* <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}
