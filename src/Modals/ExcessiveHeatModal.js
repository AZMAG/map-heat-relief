import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDataStore } from '../Stores/DataContext';
import { observer } from 'mobx-react-lite';
import ListGroup from 'react-bootstrap/ListGroup';
import ExcessiveHeatListItem from './ExcessiveHeatListItem';

function ExcessiveHeatModal() {
  const store = useDataStore();
  function handleClose() {
    store.excessiveHeatModalShown = false;
  }
  return (
    <Modal
      size="lg"
      show={store.excessiveHeatModalShown}
      onHide={handleClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Excessive Heat Warnings / Watches</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup
          style={{ maxHeight: '50vh', overflowY: 'auto', marginTop: '10px' }}
        >
          {store.excessiveHeatData.map((excessiveHeatData, i) => (
            <ExcessiveHeatListItem key={i} data={excessiveHeatData} />
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button variant="success" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default observer(ExcessiveHeatModal);
