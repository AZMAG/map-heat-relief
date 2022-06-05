import ReactDOM from 'react-dom';
import MapButtons from '../../Components/MapButtons';

function heatReliefPopup() {
  function petsAllowed(Pets) {
    return (
      <>
        <b>Pets Allowed</b>: {Pets}
      </>
    );
  }

  return {
    outFields: ['*'],
    title: ({ graphic }) => {
      return graphic.layer.title;
    },
    content: ({ graphic }) => {
      const {
        PopupAddress,
        PopupHours,
        PopupOrganization,
        Pets,
        PrimaryPhone,
      } = graphic.attributes;
      const popupDiv = document.createElement('div');
      ReactDOM.render(
        <>
          <br />
          <b>Organization</b>: {PopupOrganization} <br />
          <b>Address</b>: {PopupAddress} <br />
          <b>Hours</b>: {PopupHours} <br />
          <b>Phone</b>: {<a href={`tel:${PrimaryPhone}`}>{PrimaryPhone}</a>}{' '}
          <br />
          {Pets ? petsAllowed(Pets) : ''}
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
    id: 'donation',
    url: 'https://geo.azmag.gov/arcgis/rest/services/maps/Heat_Relief_Network/MapServer/2',
    includeInLayersList: true,
    visible: true,
    title: 'Donation Site',
    legend: true,
    popupTemplate: heatReliefPopup(),
  },
  {
    id: 'hydration',
    url: 'https://geo.azmag.gov/arcgis/rest/services/maps/Heat_Relief_Network/MapServer/1',
    includeInLayersList: true,
    visible: true,
    title: 'Hydration Station',
    legend: true,
    popupTemplate: heatReliefPopup(),
  },
  {
    id: 'cooling',
    url: 'https://geo.azmag.gov/arcgis/rest/services/maps/Heat_Relief_Network/MapServer/0',
    includeInLayersList: true,
    visible: true,
    title: 'Cooling Center',
    legend: true,
    popupTemplate: heatReliefPopup(),
  },
];

export default layers;
