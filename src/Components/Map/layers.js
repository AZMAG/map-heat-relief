import layerConfig from './layersConfig';
import FeatureLayer from 'esri/layers/FeatureLayer';
import MapImageLayer from 'esri/layers/MapImageLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

async function addLayers(map) {
  let layers = [];
  for (let i = 0; i < layerConfig.length; i++) {
    const conf = layerConfig[i];
    let layer = new FeatureLayer({ ...conf });
    if (conf.layerType === 'image') {
      layer = new MapImageLayer({
        id: conf.id,
        url: conf.url,
        sublayers: [
          {
            id: conf.index,
            visible: true,
            renderer: conf.renderer,
          },
        ],
        visible: conf.visible,
        ...conf,
      });
    } else if (conf.layerType === 'images') {
      layer = new MapImageLayer({
        id: conf.id,
        url: conf.url,
        visible: conf.visible,
        ...conf,
      });
      if (layer.sublayers) {
        layer.sublayers.items.forEach((sublayer) => {
          sublayer.popupTemplate = conf.popupTemplate;
        });
      }
      // console.log(layer);
    }
    layers.push(layer);
  }
  const gfxLayer = new GraphicsLayer({ id: 'gfxLayer' });

  map.add(gfxLayer);
  map.addMany(layers);

  return layers;
}
export default addLayers;
