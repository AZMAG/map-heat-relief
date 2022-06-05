import QueryTask from '@arcgis/core/tasks/QueryTask';

const queryUrl =
  'https://geo.azmag.gov/arcgis/rest/services/maps/Heat_Relief_Network/MapServer/3';

const qt = new QueryTask({ url: queryUrl });

const getData = async function () {
  const { features } = await qt.execute({
    where: 'HRN2022=1',
    returnGeometry: true,
    outFields: ['*'],
  });
  let data = [];
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const { latitude, longitude } = feature.geometry;

    data.push({ ...feature.attributes, latitude, longitude });
  }

  return data;
};

export default getData;
