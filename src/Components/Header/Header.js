import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AboutModal from '../../Modals/AboutModal';
import LastUpdated from './LastUpdated';
import Alert from 'react-bootstrap/Alert';
import { useDataStore } from '../../Stores/DataContext';
import { observer } from 'mobx-react-lite';

function Header() {
  const store = useDataStore();
  const navigate = useNavigate();
  const [aboutModalShown, setAboutModalShown] = useState(false);
  function infoClicked() {
    setAboutModalShown(true);
  }
  return (
    <div className="main-header">
      <AboutModal
        aboutModalShown={aboutModalShown}
        setAboutModalShown={setAboutModalShown}
      />
      <Button
        className="home-btn"
        variant="secondary"
        size="sm"
        onClick={() => navigate('/')}
      >
        <i className="fas fa-arrow-left"></i>
      </Button>
      <div
        style={{
          flex: 1,
          display: 'inline-flex',
          // justifyContent: 'center',
          alignItems: 'center',
          marginRight: '20px',
          justifyContent:
            store.excessiveHeatData.length > 0 ? 'right' : 'center',
        }}
      >
        <h3>{new Date().getFullYear()} Heat Relief Network</h3>
        <LastUpdated />
      </div>
      <Alert
        style={{
          padding: '2px 5px',
          margin: 0,
          display: store.excessiveHeatData.length > 0 ? 'block' : 'none',
        }}
        variant="danger"
      >
        Excessive Heat Warning / Watch in effect.
        <Button
          onClick={() => {
            store.excessiveHeatModalShown = true;
          }}
          variant="outline-danger"
          size="sm"
          style={{ marginLeft: '10px', marginRight: '10px', padding: '2px' }}
        >
          Click here
        </Button>
        for more info.
      </Alert>
      <Button variant="secondary" size="sm" onClick={infoClicked}>
        <i className="fa fa-info-circle"></i>
      </Button>
    </div>
  );
}
export default observer(Header);
