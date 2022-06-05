import React from 'react';
import { Modal } from 'react-bootstrap';

import AboutModalBody from './AboutModalBody';

export default function AboutModal({ aboutModalShown, setAboutModalShown }) {
  function handleClose() {
    setAboutModalShown(false);
  }
  return (
    <Modal show={aboutModalShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>About</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '11px' }}>
        <AboutModalBody />
      </Modal.Body>
      {/* <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}
