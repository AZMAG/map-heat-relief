import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import HeatReliefLogo from '../../images/Heat-Relief-Logo.png';

const headerStyle = {
  color: 'white',
  maxHeight: '30px',
  textAlign: 'center',
  fontFamily: 'ariana-pro, sans-serif',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '30px',
  gap: '10px',
};

export default function Header() {
  const history = useHistory();
  return (
    <div style={headerStyle}>
      <Button variant="success" size="sm" onClick={() => history.goBack()}>
        &laquo;
      </Button>
      <img height="40" src={HeatReliefLogo} alt="HRN Logo" />
      <h3 style={{ fontSize: '20px', marginBottom: '0' }}>
        2021 Heat Relief Network
      </h3>
    </div>
  );
}
