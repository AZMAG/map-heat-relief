import { createContext, useContext, useEffect } from 'react';
import { createDataStore } from './createDataStore';
import { useLocalObservable } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const store = useLocalObservable(createDataStore);

  useEffect(() => {
    (async () => {
      await store.loadParkPoints();
      store.filteredParksCount = store.parks.length;
    })();
  }, [store]);

  function isParkActive(park) {
    return store.activeAmenities.every((amenity) => {
      return park[amenity.key] === 1;
    });
  }

  autorun(() => {
    if (store.attractionZoom) {
      (async () => {
        store.mapLoaded = false;
        const where = `OBJECTID = ${store.attractionZoom}`;
        const res = await store.bliLayer.queryFeatures({
          where,
          outFields: ['*'],
          returnGeometry: true,
          outSpatialReference: store.view.spatialReference,
        });
        await store.view.goTo(res.features);
        // store.view.zoom = 11;
        store.view.popup.close();
        store.view.popup.open({
          location: res.features[0].geometry,
          features: res.features,
        });
        store.attractionZoom = null;
        store.mapLoaded = true;
      })();
    }
  });

  autorun(() => {
    if (store.parkZoom) {
      (async () => {
        store.mapLoaded = false;
        const where = `ParkID = ${store.parkZoom}`;
        const { extent } = await store.parksLayer.queryExtent({
          where,
          returnGeometry: true,
          outSpatialReference: store.view.spatialReference,
        });

        await store.view.goTo(extent.expand(3));
        // store.view.zoom = 13;
        store.view.popup.close();
        const res2 = await store.parkPointsLayer.queryFeatures({
          where,
          returnGeometry: true,
          outFields: ['*'],
          outSpatialReference: store.view.spatialReference,
        });
        store.view.popup.open({
          location: res2.features[0].geometry,
          features: res2.features,
        });
        store.parkZoom = null;
        store.mapLoaded = true;
      })();
    }
  });

  autorun(() => {
    if (store.parkPointsLayerView) {
      const where =
        'ParkID IN(' +
        store.filteredParks.map(({ ParkID }) => ParkID).join(',') +
        ')';
      store.parkPointsLayerView.filter = {
        where,
      };
    }
  });

  autorun(() => {
    (async () => {
      if (store.bliLayerView) {
        const selectedAttractions = store.attractionItems.filter(
          (item) => item.checked
        );
        if (selectedAttractions.length === 1) {
          const selectedAttraction = selectedAttractions[0];
          store.attractionsLoading = true;
          store.bliLayerView.filter = {
            where: selectedAttraction.queryValue,
          };
          store.bliLayer.renderer = {
            type: 'simple',
            symbol: {
              type: 'picture-marker',
              url: selectedAttraction.image,
              width: '17px',
              height: '17px',
            },
          };

          const data = await store.bliLayer.queryFeatures({
            where: selectedAttraction.queryValue,
            outFields: ['Name', 'City', 'OBJECTID'],
          });
          store.matchingAttractions = data.features.map(
            (feature) => feature.attributes
          );
          store.bliLayer.visible = true;
          store.attractionsLoading = false;
        } else {
          store.bliLayer.visible = false;
          store.matchingAttractions = [];
        }
      }
    })();
  });

  autorun(() => {
    (async () => {
      const includedParks = [];
      if (store.activeAmenities.length === 0) {
        store.filteredParks = store.parks;
        store.filteredParksCount = store.parks.length;
      } else {
        for (let i = 0; i < store.parks.length; i++) {
          const park = store.parks[i];
          const active = isParkActive(park);
          if (active) {
            includedParks.push({ ...park });
          }
        }
        store.filteredParks = includedParks;
        store.filteredParksCount = includedParks.length;
      }
    })();
  });

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};

export const useDataStore = () => useContext(DataContext);
