import React, { useRef, useEffect } from 'react';

import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import Basemap from '@arcgis/core/Basemap';
import Graphic from '@arcgis/core/Graphic';
import setupWidgets from './Widgets';
import addLayers from './layers';
import Point from '@arcgis/core/geometry/Point';
import Extent from '@arcgis/core/geometry/Extent';
import { whenFalseOnce } from '@arcgis/core/core/watchUtils';
import { useDataStore } from '../../Stores/DataContext';

import './Map.css';

function MainMap({ lat, lng }) {
  const store = useDataStore();
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const basemap = new Basemap({
        baseLayers: [
          new VectorTileLayer({
            url: 'https://azmag.maps.arcgis.com/sharing/rest/content/items/28f6ec938f634223be8fc577d2a86ca5/resources/styles/root.json',
          }),
        ],
      });

      const _map = new ArcGISMap({
        basemap,
      });

      const _view = new MapView({
        map: _map,
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
          actions: [],
          dockOptions: {
            buttonEnabled: false,
            breakpoint: true,
          },
        },
        ui: { components: [] },
      });

      var maxExtent = new Extent({
        spatialReference: {
          wkid: 102100,
        },
        xmax: -12339330.791267041,
        xmin: -12592490.735267404,
        ymax: 4134647.588827106,
        ymin: 3778756.073348334,
      });

      _view.watch('extent', function (extent) {
        if (extent) {
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

            var newExtent = _view.extent.clone();
            newExtent.centerAt(newCenter);
            _view.extent = newExtent;
          }
        }
      });

      (async () => {
        await addLayers(_map, _view, store);
        if (lat && lng) {
          const point = new Point({
            longitude: lng,
            latitude: lat,
          });

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
          const graphicsLayer = _map.findLayerById('gfxLayer');
          graphicsLayer.add(pointGraphic);

          _view.goTo(pointGraphic);
          _view.zoom = 13;
          if (window.innerWidth > 900) {
            _view.popup.dockEnabled = false;
            _view.popup.open({
              title: 'Search Result',
              location: point,
              content:
                '<br /><b>This is your search location.  View the map to see heat relief locations nearby.</b>',
            });
          }
        }
      })();

      setupWidgets(_map, _view, store);

      whenFalseOnce(_view, 'updating', () => {
        store.mapLoaded = true;
        store.map = _map;
        store.view = _view;
      });
    }
  }, [lat, lng, store]);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default MainMap;
