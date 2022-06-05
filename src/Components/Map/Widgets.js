import Home from '@arcgis/core/widgets/Home';
import Zoom from '@arcgis/core/widgets/Zoom';
import Expand from '@arcgis/core/widgets/Expand';
// import Locate from '@arcgis/core/widgets/Locate';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import { render } from 'react-dom';
import CustomLegend from './CustomLegend';

async function setupWidgets(map, view, store) {
  const homeWidget = new Home({ view });
  view.ui.add(homeWidget, 'top-left');

  const zoom = new Zoom({ view });
  view.ui.add(zoom, 'top-left');

  const basemapToggle = new BasemapToggle({
    view,
    nextBasemap: 'satellite',
    visibleElements: {
      title: true,
    },
  });
  view.ui.add(basemapToggle, 'top-left');

  const legendTocNode = document.createElement('div');

  view.ui.add(legendTocNode, 'top-right');

  const expand = new Expand({
    expanded: true,
    mode: 'floating',
    content: legendTocNode,
  });

  view.ui.add(expand, 'top-right');

  render(<CustomLegend store={store} view={view} />, legendTocNode);
}

export default setupWidgets;
