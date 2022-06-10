import * as query from "@arcgis/core/rest/query"

const url = "https://geo.azmag.gov/arcgis/rest/services/maps/RegionalBoundaries/MapServer/1"

export default async function getMCGeo() {
  const q = {
    where: "NAME = 'MARICOPA'",
    returnGeometry: true,
  }

  const { features } = await query.executeQueryJSON(url, q)
  return features[0].geometry
}
