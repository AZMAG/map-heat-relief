import React, { useRef, useEffect } from 'react';
import SearchWidget from '@arcgis/core/widgets/Search';
import Extent from '@arcgis/core/geometry/Extent';
import { Jumbotron } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const searchDivStyle = {
  textAlign: 'center',
  margin: 'auto',
  width: '100%',
};

export default function Search() {
  const searchDiv = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchExtent = new Extent({
      xmin: -113.765131,
      ymin: 33.222813,
      xmax: -111.205189,
      ymax: 34.825446,
    });

    const search = new SearchWidget({
      container: 'search',
      includeDefaultSources: false,
      sources: [
        {
          url: '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer',
          singleLineFieldName: 'SingleLine',
          autoNavigate: true,
          enableInfoWindow: true,
          enableHighlight: true,
          autoSelect: true,
          popupOpenOnSelect: true,
          showInfoWindowOnSelect: true,
          name: 'Address',
          filter: {
            geometry: searchExtent,
          },
          placeholder: '302 N 1st Ave, Phoenix, Arizona',
        },
      ],
    });
    search.on('select-result', (e) => {
      const { latitude, longitude } = e.result.feature.geometry;
      if (window.innerWidth > 900) {
        navigate(`/map?lat=${latitude}&lng=${longitude}`);
      } else {
        navigate(`/listing?lat=${latitude}&lng=${longitude}`);
      }
    });
  }, [navigate]);

  return (
    <>
      <Jumbotron>
        <label style={{ fontWeight: '600' }}>
          To get started, search by address or zip code
        </label>
        <div style={searchDivStyle} id="search" ref={searchDiv}></div>
      </Jumbotron>
    </>
  );
}
