import { useRef, useEffect } from 'react';
import Legend from '@arcgis/core/widgets/Legend';
import { Form } from 'react-bootstrap';

export default function CustomLegend({ view, store }) {
  const legendRef = useRef();

  function checkChanged(e) {
    store.openNowChecked = e.target.checked;
  }

  useEffect(() => {
    new Legend({ container: legendRef.current, view });
  }, [view, legendRef]);

  return (
    <div className="legend-container">
      <div ref={legendRef}></div>
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
