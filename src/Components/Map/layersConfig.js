import ReactDOM from 'react-dom';
import MapButtons from '../../Components/MapButtons';

function heatReliefPopup() {
  return {
    outFields: ['*'],
    title: ({ graphic }) => {
      return graphic.layer.title;
    },
    content: ({ graphic }) => {
      const { PopupAddress, PopupHours, PopupOrganization } =
        graphic.attributes;
      const popupDiv = document.createElement('div');
      ReactDOM.render(
        <>
          <br />
          <b>Organization</b>: {PopupOrganization} <br />
          <b>Address</b>: {PopupAddress} <br />
          <b>Hours</b>: {PopupHours} <br />
          <MapButtons item={graphic.attributes} />
        </>,
        popupDiv
      );
      return popupDiv;
    },
  };
}

const layers = [
  {
    id: 'heat_relief_0',
    url: 'https://geo.azmag.gov/arcgis/rest/services/maps/Hydration/MapServer/0',
    includeInLayersList: true,
    visible: true,
    title: 'Emergency Heat Relief Station',
    legend: true,
    popupTemplate: heatReliefPopup(),
  },
  {
    id: 'heat_relief_1',
    url: 'https://geo.azmag.gov/arcgis/rest/services/maps/Hydration/MapServer/1',
    includeInLayersList: true,
    visible: true,
    title: 'Cooling Center',
    legend: true,
    popupTemplate: heatReliefPopup(),
  },
  {
    id: 'heat_relief_2',
    url: 'https://geo.azmag.gov/arcgis/rest/services/maps/Hydration/MapServer/2',
    includeInLayersList: true,
    visible: true,
    title: 'Hydration Station',
    legend: true,
    popupTemplate: heatReliefPopup(),
  },
  {
    id: 'heat_relief_3',
    url: 'https://geo.azmag.gov/arcgis/rest/services/maps/Hydration/MapServer/3',
    includeInLayersList: true,
    visible: true,
    title: 'Collection/Donation Site',
    legend: true,
    popupTemplate: heatReliefPopup(),
  },
];

export default layers;
