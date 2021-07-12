import React, { useState } from 'react';
import HeatReliefLogo from '../images/Heat-Relief-Logo.png';
import Search from '../Components/Search/Search';
import { Jumbotron, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DisclaimerModal from '../Modals/DisclaimerModal';
import AboutModal from '../Modals/AboutModal';

const headerStyle = {
  color: 'white',
  fontSize: '17px',
  flex: 1,
  textAlign: 'center',
  fontFamily: 'ariana-pro, sans-serif',
};

const orStyle = {
  width: '60px',
  textAlign: 'center',
  margin: 'auto',
  padding: '10px',
  fontSize: '22px',
  borderRadius: '50%',
  backgroundColor: '#e9ecef',
};

export default function Welcome() {
  const history = useHistory();
  const [aboutModalShown, setAboutModalShown] = useState(false);

  function exploreClicked(e) {
    e.preventDefault();
    history.push('/map');
  }

  function infoClicked() {
    setAboutModalShown(true);
  }

  return (
    <div>
      <DisclaimerModal />
      <AboutModal
        aboutModalShown={aboutModalShown}
        setAboutModalShown={setAboutModalShown}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '15px 15px 10px 15px',
        }}
      >
        <img height="75" src={HeatReliefLogo} alt="Heat Relief Network Logo" />
        <h3 style={headerStyle}>2021 Heat Relief Network</h3>
      </div>
      <div className="ml-2 mr-2">
        <Search />
        <div style={orStyle}>Or</div>
        <Jumbotron className="mt-2" style={{ textAlign: 'center' }}>
          <Button onClick={exploreClicked} size="lg">
            <i className="mr-3 fas fa-map-marker-alt"></i>Explore the map
          </Button>
        </Jumbotron>
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Button
          // style={{ position: 'absolute', bottom: 5 }}
          variant="secondary"
          onClick={infoClicked}
          size="lg"
        >
          <i className="fas fa-info-circle"></i>
        </Button>
      </div>
    </div>
  );
}
