import { makeAutoObservable } from 'mobx';

export function createDataStore() {
  return makeAutoObservable({
    dataLoading: true,
    view: null,
    map: null,
    mapLoaded: false,
    selectedLatLng: null,
    openNowChecked: false,
    coolingLayerView: null,
    hydrationLayerView: null,
    donationLayerView: null,
    openNowCount: 0,
    points: [],
    excessiveHeatModalShown: false,
    excessiveHeatData: [],
  });
}
