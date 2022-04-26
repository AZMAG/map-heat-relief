import QueryTask from '@arcgis/core/tasks/QueryTask';
const queryUrl =
  'https://geo.azmag.gov/arcgis/rest/services/maps/Heat_Relief_Network/MapServer/3';
const qt = new QueryTask({ url: queryUrl });
const getData = async function ({ lat, lng }) {
  const { features } = await qt.execute({
    where: 'HRN2022=1',
    returnGeometry: true,
    outFields: ['*'],
  });
  let data = [];
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const { latitude, longitude } = feature.geometry;
    let distance = -1;
    if (lat && lng) {
      distance = getDistanceFromLatLonInMiles(lat, lng, latitude, longitude);
    }

    data.push({ ...feature.attributes, latitude, longitude, distance });
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

export { getData, getDistanceFromLatLonInMiles };
