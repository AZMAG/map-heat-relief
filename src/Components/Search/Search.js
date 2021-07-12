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
      xmin: -112.465131,
      ymin: 33.222813,
      xmax: -111.605189,
      ymax: 33.825446,
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
      <Jumbotron style={{ marginBottom: '10px' }} className="mt-2">
        <label style={{ fontWeight: '600' }}>
          To get started, search for and by address or zip code
        </label>
        <div style={searchDivStyle} id="search" ref={searchDiv}></div>
      </Jumbotron>
    </>
  );
}
