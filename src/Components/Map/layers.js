import layerConfig from './layersConfig';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

async function addLayers(map, view, store) {
  let layers = [];
  for (let i = 0; i < layerConfig.length; i++) {
    const conf = layerConfig[i];
    let layer = new FeatureLayer({ ...conf });
    layers.push(layer);

    view.whenLayerView(layer).then(function (layerView) {
      store[layer.id + 'LayerView'] = layerView;
    });
  }
  const gfxLayer = new GraphicsLayer({ id: 'gfxLayer' });

  map.add(gfxLayer);
  map.addMany(layers);

  return layers;
}
export default addLayers;
