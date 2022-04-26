import Legend from '@arcgis/core/widgets/Legend';
import Home from '@arcgis/core/widgets/Home';
import Zoom from '@arcgis/core/widgets/Zoom';
import Expand from '@arcgis/core/widgets/Expand';
// import Locate from '@arcgis/core/widgets/Locate';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';

async function setupWidgets({ map, view }) {
  // const locateBtn = new Locate({ view });
  // view.ui.add(locateBtn, 'top-left');

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
  const legend = new Legend({ view });

  const expand = new Expand({
    expanded: true,
    mode: 'floating',
    content: legend,
  });

  view.ui.add(expand, 'top-right');
}

export default setupWidgets;
