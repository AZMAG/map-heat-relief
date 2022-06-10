import * as query from '@arcgis/core/rest/query';
import getMCGeo from './getMCGeo';

const url =
  'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/NWS_Watches_Warnings_v1/FeatureServer/6';

const getExcessiveHeatData = async function () {
  const q = {
    where:
      "event in('Excessive Heat Watch','Excessive Heat Warning') AND (Affected like '%Phoenix%' OR Affected like '%Gila Bend%' OR Affected like '%Apache Junction%')",
    returnGeometry: false,
    geometry: await getMCGeo(),
    outFields: ['*'],
  };

  const { features } = await query.executeQueryJSON(url, q);
  return features.map(({ attributes }) => attributes);
};

export default getExcessiveHeatData;
