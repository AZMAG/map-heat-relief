import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import AboutModal from "../../Modals/AboutModal";
import LastUpdated from "./LastUpdated";

export default function Header() {
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
        onClick={() => navigate("/")}
      >
        <i className="fas fa-arrow-left"></i>
      </Button>
      <div
        style={{
          flex: 1,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>{new Date().getFullYear()} Heat Relief Network</h3>
        <LastUpdated />
      </div>

      <Button variant="secondary" size="sm" onClick={infoClicked}>
        <i className="fa fa-info-circle"></i>
      </Button>
    </div>
  );
}
