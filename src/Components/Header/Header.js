import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import HeatReliefLogo from '../../images/Heat-Relief-Logo.png';
import AboutModal from '../../Modals/AboutModal';

const headerStyle = {
  color: 'white',
  maxHeight: '30px',
  textAlign: 'center',
  fontFamily: 'ariana-pro, sans-serif',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  margin: '10px',
};

export default function Header() {
  const navigate = useNavigate();
  const [aboutModalShown, setAboutModalShown] = useState(false);
  function infoClicked() {
    setAboutModalShown(true);
  }
  return (
    <div style={headerStyle}>
      <AboutModal
        aboutModalShown={aboutModalShown}
        setAboutModalShown={setAboutModalShown}
      />
      <Button variant="secondary" size="sm" onClick={() => navigate('/')}>
        <i className="fa fa-home"></i>
      </Button>
      {/* <img height="40" src={HeatReliefLogo} alt="HRN Logo" /> */}
      <h3 style={{ fontSize: '18px', marginBottom: '0' }}>
        {new Date().getFullYear()} Heat Relief Network
      </h3>
      <Button variant="secondary" size="sm" onClick={infoClicked}>
        <i className="fa fa-info-circle"></i>
      </Button>
    </div>
  );
}
