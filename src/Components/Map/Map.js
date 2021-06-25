import React, { useRef, useEffect } from 'react';

import ArcGISMap from 'esri/Map';
import MapView from 'esri/views/MapView';
import VectorTileLayer from 'esri/layers/VectorTileLayer';
import Basemap from 'esri/Basemap';
import setupWidgets from './Widgets';
import addLayers from './layers';
import { addProxyRule } from 'esri/core/urlUtils';
import { whenFalseOnce } from 'esri/core/watchUtils';

import './Map.css';

let map;
let view;
let layerView;

function MainMap({
  setFormShown,
  setCurrentFeature,
  setMapLoaded,
  setLegendTocFilter,
  getCurrentOtherFilter,
  setOtherFilter,
}) {
  const mapDiv = useRef(null);
  addProxyRule({
    urlPrefix: 'geo.azmag.gov',
    proxyUrl: 'https://geo.azmag.gov/Proxy/proxy.ashx',
  });

  useEffect(() => {
    if (mapDiv.current) {
      const basemap = new Basemap({
        baseLayers: [
          new VectorTileLayer({
            url: 'https://azmag.maps.arcgis.com/sharing/rest/content/items/28f6ec938f634223be8fc577d2a86ca5/resources/styles/root.json?f=json',
          }),
        ],
      });

      map = new ArcGISMap({
        basemap,
      });

      view = new MapView({
        map,
        container: mapDiv.current,
        extent: {
          spatialReference: {
            wkid: 102100,
          },
          xmax: -12399883.303088231,
          xmin: -12546642.690914528,
          ymax: 3993315.240863136,
          ymin: 3925821.209899271,
        },
        constraints: {
          rotationEnabled: false,
          minZoom: 8,
          snapToZoom: true,
        },
        popup: {
          dockEnabled: true,
          collapseEnabled: false,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
          },
        },
        ui: { components: [] },
      });

      addLayers(map, view).then(() => {
        setupWidgets({
          map,
          view,
          setLegendTocFilter,
          setFormShown,
          setCurrentFeature,
          getCurrentOtherFilter,
          setOtherFilter,
        });
      });

      function feedbackClicked(e) {
        setCurrentFeature(() => {
          return e;
        });
        setFormShown(true);
      }

      view.popup.on('trigger-action', function (event) {
        if (event.action.id === 'feedback') {
          console.log(view.popup);
          feedbackClicked(view.popup.selectedFeature);
        }
      });

      whenFalseOnce(view, 'updating', () => {
        // setMapLoaded(true);
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}
function getMapRef() {
  return { map, view, layerView };
}

export { getMapRef, MainMap };
