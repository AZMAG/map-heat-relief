import React, { useRef, useEffect } from 'react';

import ArcGISMap from 'esri/Map';
import MapView from 'esri/views/MapView';
import VectorTileLayer from 'esri/layers/VectorTileLayer';
import Basemap from 'esri/Basemap';
import Graphic from 'esri/Graphic';
import setupWidgets from './Widgets';
import addLayers from './layers';
import Point from '@arcgis/core/geometry/Point';
import { geodesicBuffer } from 'esri/geometry/geometryEngine';
import { addProxyRule } from 'esri/core/urlUtils';
import Extent from 'esri/geometry/Extent';
// import { whenFalseOnce } from 'esri/core/watchUtils';

import './Map.css';

let map;
let view;
let layerView;

function MainMap({ lat, lng }) {
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
          alignment: 'top-center',
          dockEnabled: true,
          collapseEnabled: false,
          dockOptions: {
            position: 'top-center',
            buttonEnabled: false,
            breakpoint: false,
          },
        },
        ui: { components: [] },
      });

      var maxExtent = new Extent({
        spatialReference: {
          wkid: 102100,
        },
        xmax: -12399883.303088231,
        xmin: -12546642.690914528,
        ymax: 3993315.240863136,
        ymin: 3925821.209899271,
      });

      view.watch('extent', function (extent) {
        var currentCenter = extent.center;
        if (!maxExtent.contains(currentCenter)) {
          var newCenter = extent.center;
          if (currentCenter.x < maxExtent.xmin) {
            newCenter.x = maxExtent.xmin;
          }
          if (currentCenter.x > maxExtent.xmax) {
            newCenter.x = maxExtent.xmax;
          }
          if (currentCenter.y < maxExtent.ymin) {
            newCenter.y = maxExtent.ymin;
          }
          if (currentCenter.y > maxExtent.ymax) {
            newCenter.y = maxExtent.ymax;
          }

          var newExtent = view.extent.clone();
          newExtent.centerAt(newCenter);
          view.extent = newExtent;
        }
      });

      addLayers(map, view).then(() => {
        if (lat && lng) {
          const polySym = {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: [140, 140, 222, 0.3],
            outline: {
              color: [0, 0, 0, 0.3],
              width: 2,
            },
          };
          const point = new Point({
            longitude: lng,
            latitude: lat,
          });
          const buffer = geodesicBuffer(point, 5, 'miles');

          const markerSymbol = {
            type: 'simple-marker',
            color: [0, 100, 255, 0.9],
            size: 10,
            outline: {
              color: [0, 0, 0, 0.3],
              width: 2,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
          });
          const graphicsLayer = map.findLayerById('gfxLayer');
          graphicsLayer.add(pointGraphic);
          graphicsLayer.add(
            new Graphic({
              geometry: buffer,
              symbol: polySym,
            })
          );
          view.goTo(pointGraphic);
          view.zoom = 10;
        }
        setupWidgets({
          map,
          view,
          lat,
          lng,
        });
      });

      // whenFalseOnce(view, 'updating', () => {
      //   // setMapLoaded(true);
      // });
    }
  }, [lat, lng]);

  return <div className="mapDiv" ref={mapDiv}></div>;
}
function getMapRef() {
  return { map, view, layerView };
}

export { getMapRef, MainMap };
