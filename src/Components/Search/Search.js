import React, { useRef, useEffect } from 'react';
import SearchWidget from 'esri/widgets/Search';
import Locator from 'esri/tasks/Locator';
import Extent from 'esri/geometry/Extent';
import { Jumbotron } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const searchDivStyle = {
  textAlign: 'center',
  margin: 'auto',
  width: '100%',
};

export default function Search() {
  const searchDiv = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const searchExtent = new Extent({
      xmin: -114.68,
      ymin: 31.29,
      xmax: -109.06,
      ymax: 36.99,
    });

    const search = new SearchWidget({
      container: 'search',
      includeDefaultSources: false,
      sources: [
        {
          locator: new Locator(
            '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
          ),
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
      history.push(`/listing?lat=${latitude}&lng=${longitude}`);
    });
  }, [history]);

  return (
    <>
      <Jumbotron className="mt-5">
        <label style={{ fontWeight: '600' }}>
          To get started, search for an address
        </label>
        <div style={searchDivStyle} id="search" ref={searchDiv}></div>
      </Jumbotron>
    </>
  );
}
