import React, { useState } from 'react';
import HeatReliefLogo from '../images/Heat-Relief-Logo.png';
import Search from '../Components/Search/Search';
import { Jumbotron, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DisclaimerModal from '../Modals/DisclaimerModal';
import AboutModal from '../Modals/AboutModal';

import ReactGA from 'react-ga';

import HeatReliefBanner from '../images/HRN-Banner.jpg';

export default function Welcome() {
  ReactGA.initialize('UA-29422512-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  const navigate = useNavigate();
  const [aboutModalShown, setAboutModalShown] = useState(false);

  function exploreClicked(e) {
    e.preventDefault();
    navigate('/map');
  }

  function infoClicked() {
    setAboutModalShown(true);
  }

  return (
    <div className="welcome-page">
      <DisclaimerModal />
      <AboutModal
        aboutModalShown={aboutModalShown}
        setAboutModalShown={setAboutModalShown}
      />
      <div className="welcome-page-header">
        <img
          className="hrn-logo"
          height="75"
          src={HeatReliefLogo}
          alt="Heat Relief Network Logo"
        />
        <h3>{new Date().getFullYear()} Heat Relief Network</h3>
      </div>
      <img
        className="hrn-banner"
        src={HeatReliefBanner}
        alt="Person drinking from water bottle"
      />

      <div className="box-container">
        <Search />
        <div className="or">Or</div>
        <Jumbotron>
          <Button onClick={exploreClicked}>
            <i className="mr-3 fas fa-map-marker-alt"></i>Explore the map
          </Button>
          <br />
          <br />
          <Button
            onClick={() =>
              (window.location =
                'https://azmag.gov/Programs/Homelessness/Heat-Relief-Regional-Network/Heat-Relief-Network-Directories')
            }
          >
            <i className="mr-3 fas fa-table"></i>View Directories
          </Button>
        </Jumbotron>
      </div>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Button variant="secondary" onClick={infoClicked} size="lg">
          <i className="fas fa-info-circle"></i>
        </Button>
      </div>
    </div>
  );
}
