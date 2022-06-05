import './App.scss';
import ReactGA from 'react-ga';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import MapPage from './Pages/MapPage';
import ListingPage from './Pages/ListingPage';
import { DataProvider } from './Stores/DataContext';

function App() {
  const TRACKING_ID = 'UA-29422512-1';
  ReactGA.initialize(TRACKING_ID, {
    debug: false,
    titleCase: false,
    gaOptions: {},
  });
  return (
    <div className="app">
      <Router>
        <DataProvider>
          <Routes>
            <Route path="/map" element={<MapPage />} />
            <Route path="/listing" element={<ListingPage />} />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
