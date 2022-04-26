import queryPoints from './queryPoints';
import { makeAutoObservable } from 'mobx';

export function createDataStore() {
  return makeAutoObservable({
    activeAmenities: [],
    view: null,
    map: null,
    mapLoaded: false,
    parks: [],
    parksLayer: null,
    parkPointsLayerView: null,
    bliLayer: null,
    bliLayerView: null,
    filteredParks: [],
    filteredParksCount: 0,
    loadingFilteredParks: false,
    defExpression: '1=1',
    parkZoom: null,
    matchingAttractions: [],
    attractionZoom: null,
    attractionsLoading: false,
    async loadParkPoints() {
      const data = await queryPoints();
      this.parks = data;
      this.filteredParks = data;
    },
  });
}
