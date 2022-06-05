import { createContext, useContext } from 'react';

import { useLocation } from 'react-router-dom';
import { createDataStore } from './createDataStore';
import { useLocalObservable } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { configure } from 'mobx';
import getData from './getData';
import isOpenNow from './isOpenNow';
import getDistanceFromLatLonInMiles from './getDistanceFromLatLonInMiles';

configure({
  enforceActions: 'never',
});

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const location = useLocation();
  const store = useLocalObservable(createDataStore);
  const rawSearch = location.search;
  const searchParams = new URLSearchParams(rawSearch);

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  store.lat = lat;
  store.lng = lng;

  (async () => {
    store.points = await getData();
    store.dataLoading = false;
  })();

  autorun(() => {
    if (!store.dataLoading) {
      if (store.points && store.points.length > 0 && store.lat && store.lng) {
        store.points = store.points.map((point) => {
          const distance = getDistanceFromLatLonInMiles(
            store.lat,
            store.lng,
            point.latitude,
            point.longitude
          );
          point.distance = distance;
          return point;
        });
      }
    }
  });

  autorun(() => {
    if (!store.dataLoading && store.mapLoaded) {
      const filteredPoints = store.points.filter((point) => {
        const isOpen = isOpenNow(point);
        return isOpen;
      });
      store.openNowCount = filteredPoints.length;
      if (store.openNowChecked) {
        const objectIds = filteredPoints.map(({ objectid }) => objectid);
        const filter = { objectIds };

        store.coolingLayerView.filter = filter;
        store.hydrationLayerView.filter = filter;
        store.donationLayerView.filter = filter;
      } else {
        store.coolingLayerView.filter = null;
        store.hydrationLayerView.filter = null;
        store.donationLayerView.filter = null;
      }
    }
  });

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};

export const useDataStore = () => useContext(DataContext);
