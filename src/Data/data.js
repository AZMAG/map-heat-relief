import QueryTask from 'esri/tasks/QueryTask';
const queryUrl =
  'https://geo.azmag.gov/arcgis/rest/services/maps/Hydration/MapServer/4';
const qt = new QueryTask({ url: queryUrl });
const getData = async function ({ lat, lng }) {
  const { features } = await qt.execute({
    where: 'HRN2021=1',
    returnGeometry: true,
    outFields: ['*'],
  });
  // const legendData = await getLegendData();
  let data = [];
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const { latitude, longitude } = feature.geometry;
    const distance = getDistanceFromLatLonInMiles(
      lat,
      lng,
      latitude,
      longitude
    );
    const image = await getLegendImageByHydrationActivity(
      feature.attributes.HydrationActivities,
      feature.attributes.Collection
    );

    data.push({ ...feature.attributes, latitude, longitude, distance, image });
  }

  data = data.filter(({ distance }) => distance <= 5);

  data.sort((a, b) => a.distance - b.distance);

  return data;
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) {
  const kmDistance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  return kmDistance / 1.609;
}
async function getLegendData() {
  const res = await fetch(
    'https://geo.azmag.gov/arcgis/rest/services/maps/Hydration/MapServer/legend?f=json'
  );
  const json = await res.json();
  return json.layers;
}

// const codedValues = await getCodedHydrationValues();
// console.log(legendData);

async function getLegendImageByHydrationActivity(activity, collection) {
  const legendData = await getLegendData();
  const hydration = {
    Emergency_Heat_Relief_Station: 'Emergency Heat Relief Station',
    Cooling_Center: 'Cooling Center',
    Hydration_Station: 'Hydration Station',
    'Collection/Donation Site': 'Collection/Donation Site',
  };
  let activityTitle = hydration[activity];
  if (!activityTitle && collection === 'Yes') {
    activityTitle = 'Collection/Donation Site';
  }
  if (activityTitle) {
    const [legendLayer] = legendData.filter(
      (layer) => layer.layerName === activityTitle
    );
    return 'data:image/png;base64,' + legendLayer.legend[0].imageData;
  }
  return '';
}

export {
  getData,
  getDistanceFromLatLonInMiles,
  getLegendImageByHydrationActivity,
};
