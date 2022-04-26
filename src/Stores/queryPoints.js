import { executeQueryJSON } from '@arcgis/core/rest/query';

async function getAllParkPoints() {
  const { features } = await executeQueryJSON(
    'https://services1.arcgis.com/MdyCMZnX1raZ7TS3/arcgis/rest/services/Recreation_Viewer_Web_Service/FeatureServer/1',
    {
      where: '1=1',
      returnGeometry: false,
      outFields: ['*'],
      // orderByFields: ['Name'],
    }
  );
  return features.map((feature) => feature.attributes);
}

export default getAllParkPoints;
