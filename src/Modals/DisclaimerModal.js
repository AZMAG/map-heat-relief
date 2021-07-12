import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DisclaimerModal() {
  const hrnDisclaimerShown = localStorage.getItem('mag-hrnDisclaimer');
  const [disclaimerShown, setDisclaimerShown] = useState(
    hrnDisclaimerShown === '1' ? false : true
  );
  function handleClose() {
    setDisclaimerShown(false);
    localStorage.setItem('mag-hrnDisclaimer', 1);
  }
  return (
    <Modal show={disclaimerShown} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Disclaimer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        In providing the content of this website for the Heat Relief Network,
        the Maricopa Association of Governments (MAG) has gathered substantial
        information from a variety of sources. MAG cannot vouch for the
        authenticity or accuracy of all such sources and information provided
        may be subject to change as well. For those reasons, users of this
        website should independently verify, as needed, information provided
        herein. To the extent that any individual has a medical emergency in
        regard to heat related issues, they should contact their doctor or call
        911 immediately.{' '}
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button variant="success" onClick={handleClose}>
          Acknowledge
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
