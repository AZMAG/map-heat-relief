import { useRef, useEffect } from 'react';
import Legend from '@arcgis/core/widgets/Legend';
import { Form } from 'react-bootstrap';

import layers from './layersConfig';

export default function CustomLegend({ map, view, store }) {
  const refs = [useRef(), useRef(), useRef()];

  const legendLayers = [...layers].reverse();

  function checkChanged(e) {
    store.openNowChecked = e.target.checked;
  }

  function layerCheckChanged(e, lay) {
    const layer = map.findLayerById(lay.id);
    layer.visible = e.target.checked;
  }

  useEffect(() => {
    if (map) {
      legendLayers.forEach((lay, i) => {
        const layer = map.findLayerById(lay.id);
        new Legend({
          container: refs[i].current,
          view,
          layerInfos: [{ title: '', layer }],
        });
      });
    }
  }, [view, refs, map]);

  return (
    <div className="legend-container">
      {legendLayers.map((l, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }} ref={refs[i]}></div>
          <Form.Check
            style={{ flex: 3 }}
            onChange={(e) => layerCheckChanged(e, l)}
            defaultChecked
            type={'switch'}
            id={l.id}
            label={l.title}
          />
        </div>
      ))}
      <hr />
      <Form.Check
        onChange={checkChanged}
        value={store.openNowChecked}
        type={'switch'}
        id={`default`}
        label={`Open Now`}
      />
    </div>
  );
}
